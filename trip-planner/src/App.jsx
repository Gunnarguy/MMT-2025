import "leaflet/dist/leaflet.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/shell.css";
import "./styles/components.css";
import "./styles/itinerary.css";
import "./styles/views.css";
import "./styles/looseends.css";
import "./styles/ride.css";
import "./styles/visuals.css";
import "./styles/mobile.css";
import "./styles/flight.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import OfflineAccess from "./components/OfflineAccess";
import BorderView from "./components/BorderView";
import DayPanel from "./components/DayPanel";
import DayRail from "./components/DayRail";
import ItineraryView from "./components/ItineraryView";
import LooseEndsView from "./components/LooseEndsView";
import MoneyView from "./components/MoneyView";
import OverviewView from "./components/OverviewView";
import PackView from "./components/PackView";
import RideView from "./components/RideView";
import RouteMap from "./components/RouteMap";
import ScoutView from "./components/ScoutView";
import StaysView from "./components/StaysView";
import TodayView from "./components/TodayView";
import EmergencyDrawer from "./components/visuals/EmergencyDrawer";
import { DAYS, TRIP } from "./data/trip";
import { useLocalState } from "./hooks/useLocalState";
import { daysUntil } from "./lib/format";
import { dateAt } from "./lib/tripWeather";
import { WeatherRefresh, useTripWeather } from "./hooks/useTripWeather";

/**
 * Section order is the order a phone shows them: only the first four fit on a
 * 375px screen, so those four are the ones a driver reaches for on the road.
 * Planning surfaces follow.
 */
const TABS = [
  { id: "today", label: "Today" },
  { id: "days", label: "Day by day" },
  { id: "map", label: "Map" },
  { id: "stays", label: "Stays" },
  { id: "border", label: "Border" },
  { id: "loose", label: "Checklist" },
  { id: "overview", label: "Overview" },
  { id: "ride", label: "Car & flights" },
  { id: "money", label: "Money" },
  { id: "pack", label: "Weather & pack" },
  { id: "scout", label: "Scout" },
];

/**
 * Hash routing, hand-rolled.
 *
 * `#/days`, `#/day/d4`, `#/money`. A router library would be four times the
 * code of this function for a seven-tab static site, and GitHub Pages serves
 * the same index.html for every path anyway.
 */
function useHashRoute() {
  const read = () => {
    const raw = window.location.hash.replace(/^#\/?/, "");
    const [head, param] = raw.split("/");
    if (head === "day" && param) return { tab: "days", dayId: param };
    if (head === "today") return { tab: "today", dayId: param || null };
    if (TABS.some((t) => t.id === head)) return { tab: head, dayId: null };
    // Bare "#/" lands on Today while the trip is ahead or running, because that
    // is the only tab that answers "what now". Once it is over, Today is a dead
    // end and Overview is the better front door.
    return { tab: daysUntil(TRIP.end) >= 0 ? "today" : "overview", dayId: null };
  };

  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const go = useCallback((tab, dayId) => {
    if (tab === "today") window.location.hash = dayId ? `#/today/${dayId}` : "#/today";
    else window.location.hash = dayId ? `#/day/${dayId}` : `#/${tab}`;
  }, []);

  return [route, go];
}

/**
 * Where the trip is right now, and the shortcut back to Today from anywhere.
 *
 * A leaf component on purpose: it subscribes to the weather store's clock,
 * which ticks once a minute, and nothing above it (the map, every day page)
 * should re-render on that tick.
 */
function TripPill({ onGo }) {
  const { now } = useTripWeather();
  const out = daysUntil(TRIP.start);
  const home = daysUntil(TRIP.end);
  const liveDay = DAYS.find((d) => d.date === dateAt(now, "America/Detroit"));
  const pill =
    out > 0
      ? { text: "days out", value: out, live: false }
      : liveDay
        ? { text: liveDay.index === 0 ? "Arrival night" : `Day ${liveDay.index} of 7`, value: null, live: true }
        : home >= 0
          ? { text: "on the road", value: null, live: true }
          : { text: "home", value: null, live: false };
  return (
    <button
      type="button"
      className={`countdown-pill${pill.live ? " is-live" : ""}`}
      onClick={() => onGo("today")}
      title="Open Today"
    >
      {pill.value != null && <b>{pill.value}</b>}
      {pill.text}
    </button>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useLocalState("mi26.theme", "auto");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  const next = { auto: "light", light: "dark", dark: "auto" }[theme];
  const icon = { auto: "◐", light: "☀", dark: "☾" }[theme];

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(next)}
      title={`Theme: ${theme} — switch to ${next}`}
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
    >
      {icon}
    </button>
  );
}

export default function App() {
  const [route, go] = useHashRoute();
  const tabrailRef = useRef(null);
  useEffect(() => {
    const rail = tabrailRef.current;
    const active = rail?.querySelector('[aria-selected="true"]');
    if (active) rail.scrollTo({ left: active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2 });
  }, [route.tab]);
  // The rail scrolls sideways on a phone. Fades at whichever edge still has
  // tabs hidden behind it are the only hint that more sections exist.
  useEffect(() => {
    const rail = tabrailRef.current;
    if (!rail) return undefined;
    const edges = () => {
      const wrap = rail.parentElement;
      wrap.dataset.atStart = rail.scrollLeft <= 2 ? "true" : "false";
      wrap.dataset.atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 ? "true" : "false";
    };
    edges();
    rail.addEventListener("scroll", edges, { passive: true });
    const sized = new ResizeObserver(edges);
    sized.observe(rail);
    return () => {
      rail.removeEventListener("scroll", edges);
      sized.disconnect();
    };
  }, []);
  const activeDay = route.dayId ? DAYS.find((d) => d.id === route.dayId) : null;
  const totalMiles = useMemo(
    () => DAYS.reduce((n, d) => n + (d.miles || 0), 0),
    [],
  );

  return (
    <div className="app">
      <WeatherRefresh />
      {/* Top bar, section tabs and (in the Days section) the date strip travel
          together as one sticky unit, so navigation never scrolls out of
          reach on a long day page. */}
      <div className="chrome">
        <header className="topbar">
          <div className="topbar-inner">
            <button className="wordmark" type="button" onClick={() => go("overview")}>
              <span>Michigan</span>
              <span>&rsquo;26</span>
            </button>
            <div className="topbar-spacer" />
            <div className="topbar-actions">
              <TripPill onGo={go} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <nav className="tabrail" aria-label="Sections">
          <div className="tabrail-inner" role="tablist" ref={tabrailRef}>
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={route.tab === t.id}
                className="tab"
                onClick={() => go(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {route.tab === "days" && <DayRail activeId={route.dayId} onGo={go} />}
      </div>

      <OfflineAccess />
      <main className="page">
        {route.tab === "overview" && <OverviewView onGo={go} />}
        {route.tab === "loose" && <LooseEndsView />}
        {route.tab === "days" &&
          (activeDay ? <DayPanel day={activeDay} /> : <ItineraryView onGo={go} />)}
        {route.tab === "map" && (
          <>
            <div className="page-head">
              <div className="eyebrow">The whole line</div>
              <h1>{totalMiles.toLocaleString()} miles, drawn to the road</h1>
              <p>
                Every segment is the actual driving route, not a straight line between
                towns. Pick a day to isolate it, tap a group to open its places, or
                search for any stop, hotel or gas station.
              </p>
            </div>
            <RouteMap />
          </>
        )}
        {route.tab === "today" && <TodayView forcedDayId={route.dayId} />}
        {route.tab === "stays" && <StaysView />}
        {route.tab === "ride" && <RideView />}
        {route.tab === "money" && <MoneyView />}
        {route.tab === "border" && <BorderView />}
        {route.tab === "pack" && <PackView />}
        {route.tab === "scout" && <ScoutView />}

        <EmergencyDrawer />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h3>The trip</h3>
            <p>
              {TRIP.subtitle}
              <br />
              September 14&ndash;21, 2026.
            </p>
          </div>
          <div>
            <h3>Guide</h3>
            <p>
              Save the guide on this device for offline trip details, routes, and map points. Live weather and new map imagery need a connection.
            </p>
          </div>
          <div>
            <h3>Jump</h3>
            <ul>
              {TABS.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#/${t.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(t.id);
                    }}
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
