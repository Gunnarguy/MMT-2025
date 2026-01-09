import { useEffect, useMemo, useRef, useState } from "react";
import { categories, regions } from "../data/catalog";
import { formatHours } from "../utils/formatters";

function normalizePlaceLabel(displayName) {
  if (!displayName) return "";
  return String(displayName).split(",")[0].trim();
}

function normalizePlaceLocation(displayName) {
  if (!displayName) return "";
  const parts = String(displayName)
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length <= 1) return "";
  return parts.slice(1).join(", ");
}

function resolveHitStateAbbr(hit) {
  const stateCode = String(hit?.address?.state_code || "")
    .toUpperCase()
    .trim();
  if (stateCode) return stateCode;

  const maybeIso = String(hit?.address?.ISO3166_2_lvl4 || "")
    .toUpperCase()
    .trim();
  const isoState = maybeIso.startsWith("US-") ? maybeIso.slice(3) : "";
  if (isoState) return isoState;

  const displayUpper = String(hit?.display_name || "").toUpperCase();
  const displayMatch = displayUpper.match(/,\s*([A-Z]{2})\s*(,|$)/);
  return displayMatch?.[1] || "";
}

function buildNortheastViewbox(allowedStatesUpper) {
  const allowed = Array.isArray(allowedStatesUpper) ? allowedStatesUpper : [];
  const set = new Set(allowed);
  const NE = ["ME", "NH", "VT", "MA", "CT", "RI", "NY"]; // bias toward trip area
  const hasNE = NE.some((abbr) => set.has(abbr));
  if (!hasNE) return null;

  // lon_left, lat_top, lon_right, lat_bottom
  return {
    left: -73.8,
    top: 47.6,
    right: -66.8,
    bottom: 40.9,
  };
}

function haversineKm(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return null;
  const lat1 = Number(a[0]);
  const lon1 = Number(a[1]);
  const lat2 = Number(b[0]);
  const lon2 = Number(b[1]);
  if (
    !Number.isFinite(lat1) ||
    !Number.isFinite(lon1) ||
    !Number.isFinite(lat2) ||
    !Number.isFinite(lon2)
  ) {
    return null;
  }
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLon / 2);
  const c1 = Math.cos(toRad(lat1));
  const c2 = Math.cos(toRad(lat2));
  const h = s1 * s1 + c1 * c2 * s2 * s2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export default function CatalogPanel({
  searchMode,
  onModeChange,
  searchQuery,
  onSearchChange,
  catalogFilter,
  onFilterChange,
  regionFilter,
  onRegionFilterChange,
  showMomOnly,
  onToggleMomOnly,
  filteredCatalog,
  selectedDay,
  onAddActivity,
  onOpenDetails,
  customActivities,
  onQuickAddCustomPlace,
  allowedStateAbbrs,
  allowCanadaPlaces,
  placeSearchCenter,
  onDeleteCustom,
}) {
  const customList = Object.values(customActivities || {});

  const [placeQuery, setPlaceQuery] = useState("");
  const [placeResults, setPlaceResults] = useState([]);
  const [placeLoading, setPlaceLoading] = useState(false);
  const placeAbortRef = useRef(null);

  const [panelWidth, setPanelWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const showExpandedDetails = panelWidth >= 500;

  const canQuickAdd = useMemo(() => {
    return Boolean(selectedDay?.id) && Boolean(onQuickAddCustomPlace);
  }, [selectedDay?.id, onQuickAddCustomPlace]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const delta = e.clientX - startXRef.current;
      const newWidth = Math.max(
        260,
        Math.min(800, startWidthRef.current + delta)
      );
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
  };

  const resetPlaceSearch = () => {
    if (placeAbortRef.current) {
      placeAbortRef.current.abort();
      placeAbortRef.current = null;
    }
    setPlaceQuery("");
    setPlaceResults([]);
    setPlaceLoading(false);
  };

  useEffect(() => {
    if (placeAbortRef.current) {
      placeAbortRef.current.abort();
      placeAbortRef.current = null;
    }

    const q = placeQuery.trim();
    if (!q) {
      setPlaceResults([]);
      setPlaceLoading(false);
      return;
    }

    const controller = new AbortController();
    placeAbortRef.current = controller;
    setPlaceLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const allowed = Array.isArray(allowedStateAbbrs)
          ? allowedStateAbbrs
              .map((s) =>
                String(s || "")
                  .toUpperCase()
                  .trim()
              )
              .filter(Boolean)
          : [];
        const allowedSet = new Set(allowed);

        const viewbox = buildNortheastViewbox(allowed);
        const viewboxParam = viewbox
          ? `&viewbox=${encodeURIComponent(
              `${viewbox.left},${viewbox.top},${viewbox.right},${viewbox.bottom}`
            )}`
          : "";

        const countryCodes = allowCanadaPlaces ? "us,ca" : "us";

        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=${encodeURIComponent(
          countryCodes
        )}&limit=10${viewboxParam}&q=${encodeURIComponent(
          q
        )}&email=${encodeURIComponent("mmt-trip-planner@example.com")}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          setPlaceResults([]);
          return;
        }
        const data = await res.json();

        const normalized = Array.isArray(data)
          ? data
              .map((hit) => {
                const lat = Number(hit?.lat);
                const lon = Number(hit?.lon);
                if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

                // US-only is usually requested; allow CA only when enabled.
                const countryCode = String(hit?.address?.country_code || "")
                  .toLowerCase()
                  .trim();
                if (countryCode) {
                  if (countryCode === "us") {
                    // ok
                  } else if (allowCanadaPlaces && countryCode === "ca") {
                    // ok
                  } else {
                    return null;
                  }
                }

                const resolvedState = resolveHitStateAbbr(hit);

                return {
                  id: String(hit?.place_id || `${lat},${lon}`),
                  displayName: String(hit?.display_name || ""),
                  coordinates: [lat, lon],
                  stateAbbr: resolvedState,
                };
              })
              .filter(Boolean)
          : [];

        const ranked = [...normalized]
          .map((r, idx) => {
            const inAllowed =
              allowedSet.size > 0 && r.stateAbbr
                ? allowedSet.has(r.stateAbbr)
                : false;
            const distKm = placeSearchCenter
              ? haversineKm(placeSearchCenter, r.coordinates)
              : null;
            return { ...r, _idx: idx, _inAllowed: inAllowed, _distKm: distKm };
          })
          .sort((a, b) => {
            // 1) Prefer inferred trip states first
            if (a._inAllowed !== b._inAllowed) return a._inAllowed ? -1 : 1;
            // 2) Then prefer nearer to the selected day / trip area
            const ad = a._distKm;
            const bd = b._distKm;
            if (ad != null && bd != null && ad !== bd) return ad - bd;
            if (ad != null && bd == null) return -1;
            if (ad == null && bd != null) return 1;
            // 3) Fall back to original order
            return a._idx - b._idx;
          });

        setPlaceResults(ranked.slice(0, 6));
      } catch (e) {
        if (e?.name !== "AbortError") {
          setPlaceResults([]);
        }
      } finally {
        setPlaceLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [placeQuery, allowedStateAbbrs]);

  return (
    <aside
      className="catalog"
      ref={panelRef}
      style={{
        width: `${panelWidth}px`,
        minWidth: "260px",
        maxWidth: "800px",
        position: "relative",
      }}
    >
      <div
        className="catalog-resize-handle"
        onMouseDown={handleResizeStart}
        role="separator"
        aria-label="Resize catalog panel"
      />
      <div className="catalog-header">
        <h2>{searchMode === "catalog" ? "Activities" : "Your Places"}</h2>
        <div className="search-mode-toggle">
          <button
            className={`mode-btn ${searchMode === "catalog" ? "active" : ""}`}
            onClick={() => onModeChange("catalog")}
            type="button"
          >
            Catalog
          </button>
          <button
            className={`mode-btn ${searchMode === "custom" ? "active" : ""}`}
            onClick={() => onModeChange("custom")}
            type="button"
          >
            Custom
          </button>
        </div>
      </div>

      {searchMode === "catalog" ? (
        <>
          <div className="catalog-search">
            <input
              type="text"
              placeholder="Search activities, tags, or locations"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="catalog-filters">
            <button
              className={`filter-btn ${
                catalogFilter === "all" ? "active" : ""
              }`}
              onClick={() => onFilterChange("all")}
              type="button"
            >
              All
            </button>
            {Object.values(categories)
              .filter(
                (cat) =>
                  cat.id !== "city" &&
                  cat.id !== "custom" &&
                  cat.id !== "lodging"
              )
              .map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-btn ${
                    catalogFilter === cat.id ? "active" : ""
                  }`}
                  onClick={() => onFilterChange(cat.id)}
                  type="button"
                >
                  {cat.icon}
                </button>
              ))}
            <label className="mom-filter">
              <input
                type="checkbox"
                checked={showMomOnly}
                onChange={(e) => onToggleMomOnly(e.target.checked)}
              />
              Mom&#39;s picks
            </label>
          </div>

          <div className="catalog-region">
            <label>
              Region focus
              <select
                value={regionFilter}
                onChange={(e) => onRegionFilterChange(e.target.value)}
              >
                <option value="all">All regions</option>
                {Object.values(regions).map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="catalog-list">
            {filteredCatalog.map((activity) => (
              <div
                key={activity.id}
                className={`catalog-item ${
                  showExpandedDetails ? "expanded" : ""
                }`}
              >
                <div className="item-header">
                  <span className="item-icon">
                    {categories[activity.category]?.icon}
                  </span>
                  <div className="item-info">
                    <strong>
                      {activity.name}
                      {activity.momMentioned && (
                        <span className="icon-mom" title="Mom Mentioned This!">
                          {" "}
                          ❤️
                        </span>
                      )}
                    </strong>
                    <small>{activity.location}</small>
                  </div>
                  {/* Quick meta badges - always visible */}
                  <div className="item-quick-meta">
                    {activity.rating && (
                      <span className="meta-badge rating">★ {activity.rating}</span>
                    )}
                    {activity.price && (
                      <span className="meta-badge price">{activity.price}</span>
                    )}
                  </div>
                </div>

                {showExpandedDetails && (
                  <div className="item-rich-details">
                    {activity.description && (
                      <p className="item-description">{activity.description}</p>
                    )}

                    {/* Key info row */}
                    <div className="item-meta-row">
                      {activity.duration && (
                        <span className="meta-chip">
                          <span className="meta-icon">⏱</span>
                          {formatHours(activity.duration)}
                        </span>
                      )}
                      {activity.waitTime && (
                        <span className="meta-chip wait">
                          <span className="meta-icon">⏳</span>
                          {activity.waitTime}
                        </span>
                      )}
                    </div>

                    {/* Must try callout */}
                    {activity.mustTry && (
                      <div className="item-callout must-try">
                        <span className="callout-label">🍽 Must Try:</span>
                        <span>{activity.mustTry}</span>
                      </div>
                    )}

                    {/* Highlights */}
                    {activity.highlights && activity.highlights.length > 0 && (
                      <div className="item-highlights">
                        <span className="highlights-label">✨ Highlights:</span>
                        <ul>
                          {activity.highlights.slice(0, 3).map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pro tip */}
                    {activity.tip && (
                      <div className="item-callout tip">
                        <span className="callout-label">💡 Tip:</span>
                        <span>{activity.tip}</span>
                      </div>
                    )}

                    {/* Mom quote */}
                    {activity.momQuote && (
                      <blockquote className="item-mom-quote">
                        "{activity.momQuote}"
                      </blockquote>
                    )}

                    {/* Photo spot */}
                    {activity.photoSpot && (
                      <div className="item-photo-spot">
                        <span className="meta-icon">📸</span>
                        <span>{activity.photoSpot}</span>
                      </div>
                    )}

                    {/* Tags */}
                    {activity.tags && activity.tags.length > 0 && (
                      <div className="item-tags-row">
                        {activity.tags.map((tag) => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="item-actions">
                  <button
                    className="add-btn"
                    onClick={() => onAddActivity(selectedDay?.id, activity.id)}
                    title={`Add to Day ${selectedDay?.dayNumber}`}
                    type="button"
                  >
                    + Add
                  </button>
                  {!showExpandedDetails && (
                    <button
                      type="button"
                      className="ghost-btn"
                      onClick={() => onOpenDetails(activity)}
                    >
                      Details
                    </button>
                  )}
                </div>
              </div>
            ))}

            {searchQuery.trim() && (
              <div className="web-search-promo">
                <p>
                  {filteredCatalog.length === 0
                    ? "No local matches."
                    : "Not seeing it?"}
                </p>
                <p className="no-results">
                  Use the Custom tab to search places and add one.
                </p>
              </div>
            )}

            {!searchQuery.trim() && filteredCatalog.length === 0 && (
              <p className="no-results">No activities match your filters.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="custom-place-form">
            <h4>Add a place</h4>
            <p>Type a place name and pick a result.</p>
            <input
              type="text"
              className="search-input"
              placeholder="Search places (e.g., Mike's Pastry Boston)"
              value={placeQuery}
              onChange={(e) => setPlaceQuery(e.target.value)}
            />
            {placeLoading && <p className="no-results">Searching…</p>}
            {!placeLoading &&
              placeQuery.trim() &&
              placeResults.length === 0 && (
                <p className="no-results">No results.</p>
              )}
            {placeResults.length > 0 && (
              <div className="catalog-list">
                {placeResults.map((hit) => (
                  <div key={hit.id} className="catalog-item custom-item">
                    <button
                      type="button"
                      className="item-main"
                      onClick={() => {
                        if (!canQuickAdd) return;
                        onQuickAddCustomPlace({
                          dayId: selectedDay?.id,
                          name:
                            normalizePlaceLabel(hit.displayName) ||
                            placeQuery.trim(),
                          location: normalizePlaceLocation(hit.displayName),
                          coordinates: hit.coordinates,
                        });
                        resetPlaceSearch();
                      }}
                    >
                      <span className="item-icon">
                        {categories.custom?.icon || "*"}
                      </span>
                      <div className="item-info">
                        <strong>
                          {normalizePlaceLabel(hit.displayName) ||
                            placeQuery.trim()}
                        </strong>
                        <small>{hit.displayName}</small>
                      </div>
                    </button>
                    <div className="item-actions">
                      <button
                        className="add-btn"
                        type="button"
                        disabled={!canQuickAdd}
                        onClick={() => {
                          if (!canQuickAdd) return;
                          onQuickAddCustomPlace({
                            dayId: selectedDay?.id,
                            name:
                              normalizePlaceLabel(hit.displayName) ||
                              placeQuery.trim(),
                            location: normalizePlaceLocation(hit.displayName),
                            coordinates: hit.coordinates,
                          });
                          resetPlaceSearch();
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="custom-activities-list">
            <h5>Your custom library</h5>
            {customList.length === 0 && (
              <p className="no-results">No custom places yet.</p>
            )}
            {customList.map((place) => (
              <div key={place.id} className="catalog-item custom-item">
                <button
                  type="button"
                  className="item-main"
                  onClick={() => onOpenDetails(place)}
                >
                  <span className="item-icon">
                    {categories[place.category]?.icon || "*"}
                  </span>
                  <div className="item-info">
                    <strong>{place.name}</strong>
                    <small>{place.location}</small>
                  </div>
                </button>
                <div className="item-actions">
                  <button
                    className="add-btn"
                    onClick={() => onAddActivity(selectedDay?.id, place.id)}
                    type="button"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => onOpenDetails(place)}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => onDeleteCustom(place)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
