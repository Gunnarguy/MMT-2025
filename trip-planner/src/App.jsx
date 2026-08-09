import "leaflet/dist/leaflet.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/shell.css";
import "./styles/components.css";
import "./styles/itinerary.css";
import "./styles/views.css";
import "./styles/looseends.css";
import "./styles/ride.css";

import { useCallback, useEffect, useMemo, useState } from "react";

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
import StaysView from "./components/StaysView";
import { DAYS, TRIP } from "./data/trip";
import { useLocalState } from "./hooks/useLocalState";
import { daysUntil } from "./lib/format";

const TABS = [
  { id: "overview", label: "Overview", icon: "◆" },
  { id: "loose", label: "Loose ends", icon: "◈" },
  { id: "days", label: "Day by day", icon: "▤" },
  { id: "map", label: "Map", icon: "◎" },
  { id: "stays", label: "Stays", icon: "▮" },
  { id: "ride", label: "Car & flights", icon: "✈" },
  { id: "money", label: "Money", icon: "$" },
  { id: "border", label: "Border", icon: "⚑" },
  { id: "pack", label: "Pack", icon: "✓" },
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
    if (TABS.some((t) => t.id === head)) return { tab: head, dayId: null };
    return { tab: "overview", dayId: null };
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
    window.location.hash = dayId ? `#/day/${dayId}` : `#/${tab}`;
  }, []);

  return [route, go];
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
  const out = useMemo(() => daysUntil(TRIP.start), []);
  const home = useMemo(() => daysUntil(TRIP.end), []);
  const activeDay = route.dayId ? DAYS.find((d) => d.id === route.dayId) : null;
  const totalMiles = useMemo(
    () => DAYS.reduce((n, d) => n + (d.miles || 0), 0),
    [],
  );

  const countdown =
    out > 0
      ? { text: "days out", value: out, live: false }
      : home >= 0
        ? { text: "on the road", value: null, live: true }
        : { text: "home", value: null, live: false };

  return (
    <div className="app">
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
              <span className={`countdown-pill${countdown.live ? " is-live" : ""}`}>
                {countdown.value != null && <b>{countdown.value}</b>}
                {countdown.text}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <nav className="tabrail" aria-label="Sections">
          <div className="tabrail-inner" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={route.tab === t.id}
                className="tab"
                onClick={() => go(t.id)}
              >
                <span className="tab-icon" aria-hidden="true">
                  {t.icon}
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {route.tab === "days" && <DayRail activeId={route.dayId} onGo={go} />}
      </div>

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
                Every segment below is the actual driving route, not a straight line
                between towns. Tap a date in the key to isolate one day.
              </p>
            </div>
            <RouteMap />
          </>
        )}
        {route.tab === "stays" && <StaysView />}
        {route.tab === "ride" && <RideView />}
        {route.tab === "money" && <MoneyView />}
        {route.tab === "border" && <BorderView />}
        {route.tab === "pack" && <PackView />}
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
            <h3>Source</h3>
            <p>
              Built from Mom&rsquo;s <em>Trip to Michigan</em> document, then
              fact-checked against the venues&rsquo; own sites. Where this app and the
              document disagree, the app says so out loud.
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
