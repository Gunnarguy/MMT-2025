import { useState } from "react";
import { WEATHER_LOCATIONS, WEATHER_STOPS } from "../data/weatherLocations";
import { useTripWeather } from "../hooks/useTripWeather";
import { dateAt, WEATHER_STALE_MS } from "../lib/tripWeather";
import "../styles/trip-options.css";

const number = (n, suffix = "", digits = 0) => Number.isFinite(n) ? `${n.toFixed(digits)}${suffix}` : "—";
const stamp = (time, timezone) => time ? new Date(time).toLocaleString("en-US", { timeZone: timezone, month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }) : "not available";
const clock = (time, timezone) => new Date(time).toLocaleTimeString("en-US", { timeZone: timezone, hour: "numeric", minute: "2-digit", timeZoneName: "short" });
const shortClock = (time, timezone) => time ? new Date(time).toLocaleTimeString("en-US", { timeZone: timezone, hour: "numeric", minute: "2-digit" }) : "—";

/** One glyph per Open-Meteo summary (see weatherDescription in lib/tripWeather). */
const GLYPH = { "Clear": "☀️", "Mostly clear": "🌤️", "Partly cloudy": "⛅", "Overcast": "☁️", "Fog": "🌫️", "Drizzle": "🌦️", "Rain": "🌧️", "Rain showers": "🌧️", "Snow": "🌨️", "Thunderstorms": "⛈️" };
const weatherGlyph = (summary) => GLYPH[summary] || "🌡️";

/**
 * The road-view forecast: one tile per place the day passes through, readable
 * at arm's length. The full table with hourly rain, wind and provenance stays
 * on the Weather & pack tab; this only has to answer "coat or no coat".
 * Without a dayId it shows the next trip day that has not passed yet.
 */
export function WeatherStrip({ dayId }) {
  const { data, now, refreshing, error, offline, refresh } = useTripWeather();
  const today = dateAt(now, "America/Detroit");
  let rows = WEATHER_STOPS.filter((stop) => stop.dayId === dayId);
  if (!dayId) {
    const upcoming = WEATHER_STOPS.filter((stop) => stop.date >= today);
    rows = upcoming.filter((stop) => stop.date === upcoming[0]?.date);
  }
  const stale = offline || error || !data.checkedAt || now - data.checkedAt > WEATHER_STALE_MS;
  const weekday = rows[0] ? new Date(`${rows[0].date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" }) : "";
  const status = offline ? "Offline · saved forecast"
    : refreshing ? "Refreshing…"
    : stale ? "Saved forecast · refresh when you have signal"
    : `Forecast · updated ${shortClock(data.checkedAt, "America/Detroit")}`;
  return (
    <section className="wx" aria-label="Weather along the route">
      <div className="wx-head">
        <div>
          <div className="eyebrow">{status}</div>
          <h2>{rows.length ? `${weekday}'s weather, stop by stop` : "Weather"}</h2>
        </div>
        <button type="button" className="action wx-refresh" disabled={refreshing || offline} onClick={() => refresh(true)} aria-label="Refresh weather" title="Refresh weather">
          <span aria-hidden="true">↻</span>
        </button>
      </div>
      {rows.length ? (
        <div className="wx-strip scroll-x">
          {rows.map((row) => {
            const place = WEATHER_LOCATIONS.find((p) => p.id === row.locationId);
            const day = data.locations[row.locationId]?.daily?.[row.date];
            return (
              <div className="wx-tile" key={row.locationId}>
                <div className="wx-place">{place.name}{row.locationId === "skybridge" && <small>route option</small>}</div>
                <div className="wx-glyph" aria-hidden="true">{day ? weatherGlyph(day.summary) : "…"}</div>
                <div className="wx-summary">{day?.summary || "No forecast yet"}</div>
                <div className="wx-temps"><b>{number(day?.high, "°")}</b> / {number(day?.low, "°")}</div>
                <div className="wx-rain">☔ {number(day?.peakRainChance, "%")} · 💨 {number(day?.wind)} mph</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="wx-foot">The trip is over; every day&rsquo;s saved forecast is on the Weather &amp; pack tab.</p>
      )}
      <p className="wx-foot">
        {error ? `${error} ` : ""}Highest hourly rain chance and peak wind for the day, from weather models rather than radar.{" "}
        <a href="#/pack">Hourly detail and every stop &rarr;</a>
      </p>
    </section>
  );
}

export function LocationWeather({ locationId }) {
  const { data, now, error, offline } = useTripWeather();
  const place = WEATHER_LOCATIONS.find((p) => p.id === locationId);
  const saved = data.locations[locationId];
  if (!saved) return <p>Weather unavailable. <a href="#/pack">Open weather</a></p>;
  const current = saved.current;
  const stale = offline || error || now - saved.fetchedAt > WEATHER_STALE_MS || Math.abs(now - current.time) > WEATHER_STALE_MS;
  return <div className="location-weather">
    <b>{stale ? "Saved conditions" : "Current conditions · model estimate"}</b>
    <p>{number(current.temperature, "°F")} · {current.summary}<br />Wind {number(current.wind, " mph")} · gusts {number(current.gusts, " mph")}</p>
    <small>Valid {stamp(current.time, place.timezone)}<br />Fetched {stamp(saved.fetchedAt, place.timezone)}</small>
    <p><a href="#/pack">Forecast and hourly rain →</a></p>
  </div>;
}

/** Hourly rain, temperature and wind for one place and date, as a bar strip. */
function HourStrip({ saved, date, place, now }) {
  const hours = (saved?.hourly || []).filter((h) => h.date === date);
  if (!hours.length) return <p className="wx-foot">Hourly detail for {place.name} arrives once the provider publishes this date.</p>;
  return (
    <div className="wxh" role="img" aria-label={`Hourly rain chance and temperature for ${place.name}`}>
      <div className="wxh-bars">
        {hours.map((h) => {
          const past = h.time + 3600000 < now;
          const pct = Number.isFinite(h.rainChance) ? h.rainChance : 0;
          const hour = new Date(h.time).toLocaleTimeString("en-US", { timeZone: place.timezone, hour: "numeric" }).replace(" ", "").toLowerCase();
          return (
            <div className={`wxh-col${past ? " is-past" : ""}`} key={h.time} title={`${clock(h.time, place.timezone)} · ${h.summary} · ${number(h.temperature, "°")} · ${pct}% rain · ${number(h.wind)} mph`}>
              <span className="wxh-temp">{number(h.temperature, "°")}</span>
              <span className="wxh-bar"><i style={{ height: `${Math.max(4, pct)}%` }} data-heavy={pct >= 60 ? "true" : undefined} /></span>
              <span className="wxh-pct">{pct}%</span>
              <span className="wxh-hour">{hour}</span>
            </div>
          );
        })}
      </div>
      <div className="wxh-key"><span>Bars are the hourly rain chance, numbers are temperature, times are local to {place.name}. Dimmed hours have passed.</span></div>
    </div>
  );
}

/** Live conditions tile for one place. */
function NowTile({ locationId }) {
  const { data, now, error, offline } = useTripWeather();
  const place = WEATHER_LOCATIONS.find((p) => p.id === locationId);
  const saved = data.locations[locationId];
  if (!saved) return null;
  const c = saved.current;
  const stale = offline || error || now - saved.fetchedAt > WEATHER_STALE_MS || Math.abs(now - c.time) > WEATHER_STALE_MS;
  return (
    <div className="wxn-tile">
      <div className="wx-place">{place.name}</div>
      <div className="wxn-main"><span className="wx-glyph" aria-hidden="true">{weatherGlyph(c.summary)}</span><b>{number(c.temperature, "°")}</b></div>
      <div className="wx-summary">{c.summary}</div>
      <div className="wx-rain">💨 {number(c.wind)} mph · gusts {number(c.gusts)}</div>
      <small className="wxn-stamp">{stale ? "Saved" : "Model estimate"} · valid {shortClock(c.time, place.timezone)}</small>
    </div>
  );
}

export default function TripForecast({ dayId, compact = false }) {
  if (compact) return <WeatherStrip dayId={dayId} />;
  return <ForecastTable dayId={dayId} />;
}

function ForecastTable({ dayId }) {
  const { data, now, refreshing, error, offline, refresh } = useTripWeather();
  const [includePast, setIncludePast] = useState(false);
  const [picked, setPicked] = useState(null);
  const today = dateAt(now, "America/Detroit");
  const matching = WEATHER_STOPS.filter((stop) => !dayId || stop.dayId === dayId);
  const pastCount = matching.filter((stop) => stop.date < today).length;
  const rows = matching.filter((stop) => dayId || includePast || stop.date >= today);
  const stale = !data.checkedAt || now - data.checkedAt > WEATHER_STALE_MS;
  const days = [...new Set(rows.map((r) => r.date))].sort();
  const nowIds = [...new Set(matching.filter((s) => s.date === today || (!matching.some((x) => x.date === today) && s.date === days[0])).map((s) => s.locationId))];
  const dayLabel = (date) => new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  return (
    <section className="trip-forecast wxb" aria-label="Automatically updating trip weather">
      <div className="weather-heading">
        <div><div className="eyebrow">{offline ? "Offline · saved weather" : refreshing ? "Refreshing…" : error ? "Refresh incomplete · check timestamps" : stale ? "Saved weather · refresh when you have signal" : `Updates automatically · last ${shortClock(data.checkedAt, "America/Detroit")}`}</div>
          <h2>{dayId ? "Weather along this day" : "Weather, the whole trip"}</h2></div>
        <button type="button" className="action wx-refresh" disabled={refreshing || offline} onClick={() => refresh(true)} aria-label="Refresh weather" title="Refresh weather"><span aria-hidden="true">↻</span></button>
      </div>
      {(offline || error) && <p className="trip-forecast-stale" role="status">{offline ? "You're offline. Saved weather remains available; check the timestamps before using it." : error}</p>}

      {nowIds.length > 0 && (
        <div className="wxb-now">
          <div className="eyebrow">Right now</div>
          <div className="wxn-strip scroll-x">{nowIds.map((id) => <NowTile key={id} locationId={id} />)}</div>
        </div>
      )}

      {!dayId && pastCount > 0 && <label className="weather-past-toggle"><input type="checkbox" checked={includePast} onChange={(e) => setIncludePast(e.target.checked)} /> Show days already driven (saved forecasts)</label>}
      {!rows.length && <p className="wx-foot">All trip days have passed. Show completed days to review saved forecasts.</p>}

      {days.map((date) => {
        const stops = rows.filter((r) => r.date === date);
        const past = date < today;
        const sel = picked && picked.date === date ? picked : null;
        const selPlace = sel ? WEATHER_LOCATIONS.find((p) => p.id === sel.locationId) : null;
        return (
          <div className={`wxb-day${past ? " is-past" : ""}${date === today ? " is-today" : ""}`} key={date}>
            <div className="wxb-day-head">
              <h3>{dayLabel(date)}</h3>
              <span>{date === today ? "Today" : past ? "Driven · saved forecast" : `Day ${Number(date.slice(-2)) - 14}`}</span>
            </div>
            <div className="wx-strip scroll-x">
              {stops.map((row) => {
                const place = WEATHER_LOCATIONS.find((p) => p.id === row.locationId);
                const day = data.locations[row.locationId]?.daily?.[row.date];
                const on = sel && sel.locationId === row.locationId;
                return (
                  <button type="button" className={`wx-tile wx-tile--btn${on ? " is-on" : ""}`} key={row.locationId} aria-pressed={!!on} onClick={() => setPicked(on ? null : { date, locationId: row.locationId })}>
                    <div className="wx-place">{place.name}{row.locationId === "skybridge" && <small>route option</small>}</div>
                    <div className="wx-glyph" aria-hidden="true">{day ? weatherGlyph(day.summary) : "…"}</div>
                    <div className="wx-summary">{day?.summary || (past ? "No saved forecast" : "Not yet published")}</div>
                    <div className="wx-temps"><b>{number(day?.high, "°")}</b> / {number(day?.low, "°")}</div>
                    <div className="wx-rain">☔ {number(day?.peakRainChance, "%")} · {number(day?.precipitation, "″", 2)} · 💨 {number(day?.wind)} mph</div>
                    <small className="wx-tap">{on ? "Hide hours" : "Tap for hours"}</small>
                  </button>
                );
              })}
            </div>
            {sel && <HourStrip saved={data.locations[sel.locationId]} date={date} place={selPlace} now={now} />}
          </div>
        );
      })}

      <p className="trip-options-note">Peak rain chance is the highest hourly probability, not the share of the day spent raining. Source: <a href="https://open-meteo.com/en/docs" target="_blank" rel="noreferrer">Open-Meteo forecast models</a>; the fetch time is when this device received data. No forecast guarantees ferry or SkyBridge operation.</p>
    </section>
  );
}
