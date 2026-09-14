import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { attachWeatherRefresh, createWeatherStore, dateAt, normalizeWeather, WEATHER_REFRESH_MS, WEATHER_STORAGE_KEY } from '../src/lib/tripWeather.js';
import { WEATHER_LOCATIONS, WEATHER_STOPS } from '../src/data/weatherLocations.js';

const place = WEATHER_LOCATIONS.find(p => p.id === 'skybridge');
const second = WEATHER_LOCATIONS.find(p => p.id === 'sarnia');
const dayTime = Date.parse('2026-09-17T04:00:00Z') / 1000;
const rawFor = p => ({
  latitude:p.latitude, longitude:p.longitude, timezone:p.timezone,
  daily_units:{temperature_2m_max:'°F'},
  daily:{time:[dayTime],temperature_2m_max:[73],temperature_2m_min:[51],precipitation_probability_max:[23],weather_code:[2]},
  hourly:{time:[dayTime,dayTime+3600],temperature_2m:[null,53],precipitation_probability:[null,0],precipitation:[null,0],weather_code:[2,3]},
  current:{time:dayTime,temperature_2m:53,weather_code:2,wind_speed_10m:5,wind_gusts_10m:9},
});
const response = data => ({ok:true,json:async()=>data});
const seedAt = (time=1) => ({version:2,checkedAt:time,locations:{[place.id]:normalizeWeather(rawFor(place),place,time)}});

test('dates use the stop timezone at midnight; missing values are not dry/zero',()=>{
  const instant=Date.parse('2026-09-17T04:30:00Z');
  assert.equal(dateAt(instant,'America/Chicago'),'2026-09-16');
  assert.equal(dateAt(instant,'America/Detroit'),'2026-09-17');
  const n=normalizeWeather(rawFor(place),place,10);
  assert.equal(n.hourly[0].rainChance,null);
  assert.equal(n.hourly[1].rainChance,0);
  assert.equal(n.daily['2026-09-17'].peakRainChance,23);
});

test('single in-flight fetch is shared and successful data persists with actual fetch time',async()=>{
  let count=0,release,persisted;
  const gate=new Promise(resolve=>release=resolve);
  const store=createWeatherStore({locations:[place],now:()=>1000,storage:{getItem:()=>null,setItem:(key,value)=>{assert.equal(key,WEATHER_STORAGE_KEY);persisted=JSON.parse(value);}},fetchImpl:async(url,options)=>{count++;assert.equal(options.cache,'no-store');assert(url.includes('forecast_days=16'));await gate;return response(rawFor(place));}});
  const a=store.refresh(true),b=store.refresh(true);release();await Promise.all([a,b]);
  assert.equal(count,1);assert.equal(persisted.checkedAt,1000);assert.equal(store.getSnapshot().refreshing,false);
});

test('network and synchronous errors preserve cached forecast and permit a later retry',async()=>{
  let fail=true,time=1000;
  const store=createWeatherStore({locations:[place],seed:seedAt(10),now:()=>time,fetchImpl:()=>{if(fail)throw new Error('offline');return Promise.resolve(response(rawFor(place)));}});
  await store.refresh(true);assert.equal(store.getSnapshot().data.checkedAt,10);assert.match(store.getSnapshot().error,/Could not refresh/);
  fail=false;time=2000;await store.refresh(true);assert.equal(store.getSnapshot().data.checkedAt,2000);assert.equal(store.getSnapshot().error,null);
});

test('a failed location retains its old timestamp while other locations update',async()=>{
  const seed=seedAt(10);seed.locations[second.id]=normalizeWeather(rawFor(second),second,10);
  const store=createWeatherStore({locations:[place,second],seed,now:()=>1000,fetchImpl:async()=>response([rawFor(place),{...rawFor(second),latitude:0}])});
  await store.refresh();const result=store.getSnapshot();
  assert.equal(result.data.locations[place.id].fetchedAt,1000);assert.equal(result.data.locations[second.id].fetchedAt,10);assert.match(result.error,/1 location/);
});

test('corrupt/blocked storage and a partial response never replace the offline seed',async()=>{
  const store=createWeatherStore({seed:seedAt(10),locations:[place,second],storage:{getItem:()=>'{bad',setItem:()=>{throw new Error('quota');}},fetchImpl:async()=>response([rawFor(place)])});
  await store.refresh();assert.equal(store.getSnapshot().data.checkedAt,10);
  const working=createWeatherStore({locations:[place],storage:{getItem:()=>null,setItem:()=>{throw new Error('quota');}},fetchImpl:async()=>response(rawFor(place))});
  await working.refresh();assert.equal(working.getSnapshot().error,null);
});

test('refresh lifecycle covers opening, 15-minute timer, resume, reconnect and cleanup',()=>{
  const win=new EventTarget(),doc=new EventTarget(),timers=new Map();let calls=0,ticks=0,online;
  win.navigator={onLine:true};doc.hidden=false;
  win.setInterval=(fn,ms)=>{timers.set(ms,fn);return ms;};win.clearInterval=id=>timers.delete(id);
  const cleanup=attachWeatherRefresh({refresh:()=>calls++,tick:()=>ticks++,setOffline:value=>online=!value},win,doc);
  assert.equal(calls,1);timers.get(WEATHER_REFRESH_MS)();assert.equal(calls,2);
  doc.hidden=true;timers.get(WEATHER_REFRESH_MS)();assert.equal(calls,2);
  doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));assert.equal(calls,3);
  win.dispatchEvent(new Event('focus'));assert.equal(calls,4);
  win.navigator.onLine=false;win.dispatchEvent(new Event('offline'));assert.equal(online,false);
  win.navigator.onLine=true;win.dispatchEvent(new Event('online'));assert.equal(calls,5);
  timers.get(60000)();assert.equal(ticks,1);cleanup();assert.equal(timers.size,0);
  win.dispatchEvent(new Event('focus'));assert.equal(calls,5);
});

test('service worker never intercepts weather or no-store requests',()=>{
  const handlers={};vm.runInNewContext(readFileSync(new URL('../public/sw.js',import.meta.url),'utf8'),{self:{addEventListener:(name,fn)=>handlers[name]=fn},URL});
  for(const [url,cache] of [['https://api.open-meteo.com/v1/forecast','default'],['https://api.weather.gov/points/1,1','default'],['https://example.com/weather','no-store']]){
    let intercepted=false;handlers.fetch({request:{method:'GET',url,cache},respondWith:()=>intercepted=true});assert.equal(intercepted,false);
  }
});

test('bundled seed covers all 19 locations and every trip date, including Canada and return Monday',()=>{
  const seed=JSON.parse(readFileSync(new URL('../src/data/tripForecast.json',import.meta.url),'utf8'));
  assert.equal(Object.keys(seed.locations).length,19);
  for(const stop of WEATHER_STOPS)assert(seed.locations[stop.locationId].daily[stop.date],`${stop.locationId} ${stop.date}`);
  assert(WEATHER_LOCATIONS.some(p=>p.id==='sarnia'));assert(WEATHER_LOCATIONS.some(p=>p.id==='windsor'));
});
