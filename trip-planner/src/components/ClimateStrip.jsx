/**
 * Twelve months of a town's weather from its nearest NOAA GHCN-Daily station,
 * computed from 2010–2024 daily observations (not scraped averages). Snow and
 * rain as bars, the high/low band as a ribbon, and the counts that decide
 * whether a winter is livable underneath. `sf` is San Francisco run through
 * the same math so every chart has a baseline the reader already knows.
 */
export default function ClimateStrip({ climate, sf, baselineName = "SF", color }) {
  if (!climate?.months?.length) return null;
  const { months, annual } = climate;
  const maxSnow = Math.max(1, ...months.map((x) => x.snow));
  const maxRain = Math.max(1, ...months.map((x) => x.rain), ...(sf?.months || []).map((x) => x.rain));
  const tMin = Math.min(...months.map((x) => x.lo)) - 5;
  const tMax = Math.max(...months.map((x) => x.hi)) + 5;
  const pct = (t) => ((t - tMin) / (tMax - tMin)) * 100;
  return (
    <div className="climate" style={{ "--tc": color }}>
      <div className="climate-head">
        <span>🌨️ <b>{annual.snow}″</b> snow · 🌧️ <b>{annual.rain}″</b> rain a year</span>
        <span className="muted">
          NOAA station data {climate.years}: {climate.station} ({climate.stationMi} mi)
          {climate.snowStation && climate.snowStation.toLowerCase() !== climate.station.toLowerCase()
            ? `; snow from ${climate.snowStation} (${climate.snowStationMi} mi)`
            : ""}
        </span>
      </div>
      <div className="climate-grid" role="img" aria-label={`Monthly snow, rain, and temperatures. Snowiest ${annual.snowiest}, wettest ${annual.wettest}, coldest ${annual.coldest}, hottest ${annual.hottest}.`}>
        {months.map((x) => (
          <div key={x.m} className="climate-col" title={`${x.m}: ${x.snow}″ snow · ${x.rain}″ rain · ${Math.round(x.hi)}° / ${Math.round(x.lo)}°`}>
            <div className="climate-temp">
              <i style={{ top: `${100 - pct(x.hi)}%`, bottom: `${pct(x.lo)}%` }} />
            </div>
            <div className="climate-bars">
              <i className="snow" style={{ height: `${(x.snow / maxSnow) * 100}%` }} />
              <i className="rain" style={{ height: `${(x.rain / maxRain) * 100}%` }} />
            </div>
            <span className="climate-m">{x.m[0]}</span>
          </div>
        ))}
      </div>
      <div className="climate-stats">
        <span><b>{Math.round(annual.snowDays)}</b> days of fresh snow (≥1″)</span>
        <span><b>{Math.round(annual.snowCover)}</b> days with snow on the ground</span>
        <span><b>{Math.round(annual.below0)}</b> nights below 0°F</span>
        <span><b>{Math.round(annual.frost)}</b> frost nights</span>
        <span><b>{Math.round(annual.above90)}</b> days at 90°F+</span>
        <span><b>{Math.round(annual.wetDays)}</b> wet days</span>
        <span>Snow season <b>{annual.snowSeason}</b> · snowiest <b>{annual.snowiest}</b></span>
        <span>Extremes <b>{Math.round(annual.recordLow)}°</b> to <b>{Math.round(annual.recordHigh)}°</b> · biggest day <b>{annual.maxSnowDay}″</b></span>
        {climate.snowNote && <span className="climate-sf">⚠ {climate.snowNote}</span>}
        <span className="climate-sf">
          Recent winters ran lighter than the 30-year normal almost everywhere on this list — the card's
          "snow per year" is the 1991–2020 normal; these bars are what the station actually measured 2010–2024.
        </span>
        {sf && (
          <span className="climate-sf">
            {baselineName}, same math: <b>{sf.annual.rain}″</b> rain, <b>{sf.annual.snow}″</b> snow, <b>{Math.round(sf.annual.frost)}</b> frost nights, <b>{Math.round(sf.annual.above90)}</b> days at 90°F+
          </span>
        )}
      </div>
    </div>
  );
}
