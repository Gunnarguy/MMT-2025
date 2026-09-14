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

function Hourly({ saved, date, place, now }) {
  const hours = saved?.hourly?.filter((hour) => hour.date === date) || [];
  const today = dateAt(now, place.timezone);
  return <details className="weather-hourly">
    <summary>Hourly rain &amp; wind</summary>
    <p className="trip-options-note">{today === date ? "Earlier hours today are retained model values. " : ""}Times local to {place.name}. Amounts are inches per hour; a daily rain symbol can come from a short or overnight shower.</p>
    {hours.length ? <div className="trip-table-scroll" tabIndex={0} role="region" aria-label={`Hourly weather for ${place.name}`}>
      <table className="trip-comparison"><thead><tr><th>Time</th><th>Conditions</th><th>Temp</th><th>Rain chance</th><th>Amount</th><th>Wind / gusts</th></tr></thead>
        <tbody>{hours.map((h) => <tr key={h.time} className={h.time + 3600000 < now ? "weather-hour-past" : ""}>
          <th scope="row">{clock(h.time, place.timezone)}</th><td>{h.summary}</td><td>{number(h.temperature, "°F")}</td><td>{number(h.rainChance, "%")}</td><td>{number(h.precipitation, "″", 2)}</td><td>{number(h.wind)} / {number(h.gusts)} mph</td>
        </tr>)}</tbody></table>
    </div> : <p>Hourly detail is outside the returned forecast window or unavailable. It will appear when the provider supplies it.</p>}
  </details>;
}

export default function TripForecast({ dayId, compact = false }) {
  if (compact) return <WeatherStrip dayId={dayId} />;
  return <ForecastTable dayId={dayId} />;
}

function ForecastTable({ dayId }) {
  const { data, now, refreshing, error, offline, refresh } = useTripWeather();
  const [includePast, setIncludePast] = useState(false);
  const matching = WEATHER_STOPS.filter((stop) => !dayId || stop.dayId === dayId);
  const pastCount = matching.filter((stop) => stop.date < dateAt(now, WEATHER_LOCATIONS.find((p) => p.id === stop.locationId).timezone)).length;
  const rows = matching.filter((stop) => dayId || includePast || stop.date >= dateAt(now, WEATHER_LOCATIONS.find((p) => p.id === stop.locationId).timezone));
  const stale = !data.checkedAt || now - data.checkedAt > WEATHER_STALE_MS;
  return (
    <section className="trip-forecast" aria-label="Automatically updating trip weather">
      <div className="weather-heading">
        <div><div className="eyebrow">{offline ? "Offline · saved weather" : refreshing ? "Refreshing weather…" : error ? "Refresh incomplete · check timestamps" : stale ? "Saved weather · refresh needed" : "Weather updates automatically"}</div>
          <h2>{dayId ? "Weather for this day's route" : "Weather for the whole trip"}</h2></div>
        <button type="button" className="action" disabled={refreshing || offline} onClick={() => refresh(true)}>{refreshing ? "Refreshing…" : "Refresh weather"}</button>
      </div>
      <p className="trip-options-note">Last successful fetch: {stamp(data.checkedAt, "America/Detroit")}. Refreshes every 15 minutes while open, when you return, and when service comes back. Conditions below are weather-model estimates, not a live radar or station reading.</p>
      {(offline || error || stale) && <p className="trip-forecast-stale" role="status">{offline ? "You're offline. Saved weather remains available; check the timestamps before using it." : error || "The saved forecast is over an hour old or unavailable. Try refreshing before making weather-sensitive plans."}</p>}
      {!dayId && <p>U.S. and Ontario stops, including both Thursday routes and the drive back to O&rsquo;Hare. Forecasts change as each trip day approaches; longer-range days are less certain.</p>}
      <>
        {!dayId && pastCount > 0 && <label className="weather-past-toggle"><input type="checkbox" checked={includePast} onChange={(e) => setIncludePast(e.target.checked)} /> Show completed trip days (saved forecasts)</label>}
        {!rows.length && <p>All trip days have passed. Show completed days to review saved forecasts.</p>}
        <div className="trip-table-scroll" role="region" aria-label="Forecast by trip stop" tabIndex={0}>
          <table className="trip-comparison trip-weather-table">
            <caption>Daily summaries cover the full local calendar day. “Peak rain chance” is the highest hourly precipitation probability, not a percentage of the day spent raining.</caption>
            <thead><tr><th scope="col">Trip day / location</th><th scope="col">Trip-day forecast</th><th scope="col">High / low · rain</th><th scope="col">Wind / gusts</th></tr></thead>
            <tbody>{rows.map((row) => {
              const place = WEATHER_LOCATIONS.find((p) => p.id === row.locationId);
              const saved = data.locations[row.locationId];
              const day = saved?.daily[row.date];
              const past = row.date < dateAt(now, place.timezone);
              const old = !day || now - day.fetchedAt > WEATHER_STALE_MS;
              return <tr key={`${row.dayId}-${row.locationId}`}>
                <th scope="row"><small>{new Date(`${row.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}{row.locationId === "skybridge" ? " · route option" : ""}</small>{place.name}
                  <small>{past ? "Past trip day · saved forecast" : old ? "Saved / unavailable" : "Updated"} · {stamp(day?.fetchedAt, place.timezone)}</small></th>
                <td>{day?.summary || (past ? "No saved forecast for this past day" : "Not yet available from the provider")}
                  {day && !past && <Hourly saved={saved} date={row.date} place={place} now={now} />}
                  <details className="weather-hourly"><summary>Conditions now in {place.name}</summary><LocationWeather locationId={place.id} /></details>
                </td>
                <td>{number(day?.high, "°")} / {number(day?.low, "°F")}<small>{number(day?.peakRainChance, "%")} peak rain chance</small><small>{number(day?.precipitation, "″", 2)} total precipitation</small></td>
                <td>{number(day?.wind)} / {number(day?.gusts)} mph<small>Daily maximum</small></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      </>
      <p className="trip-options-note">Source: <a href="https://open-meteo.com/en/docs" target="_blank" rel="noreferrer">Open-Meteo forecast models</a>. The fetch time is when this device received data, not the model&rsquo;s issue time. No forecast guarantees ferry or SkyBridge operation.</p>
    </section>
  );
}
