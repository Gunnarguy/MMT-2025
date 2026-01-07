import { useEffect, useMemo, useRef, useState } from "react";
import { categories, regions } from "../data/catalog";

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
  onDeleteCustom,
}) {
  const customList = Object.values(customActivities || {});

  const [placeQuery, setPlaceQuery] = useState("");
  const [placeResults, setPlaceResults] = useState([]);
  const [placeLoading, setPlaceLoading] = useState(false);
  const placeAbortRef = useRef(null);

  const canQuickAdd = useMemo(() => {
    return Boolean(selectedDay?.id) && Boolean(onQuickAddCustomPlace);
  }, [selectedDay?.id, onQuickAddCustomPlace]);

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
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=us&limit=10&q=${encodeURIComponent(
          q
        )}&email=${encodeURIComponent("mmt-trip-planner@example.com")}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          setPlaceResults([]);
          return;
        }
        const data = await res.json();

        const allowed = Array.isArray(allowedStateAbbrs)
          ? allowedStateAbbrs
              .map((s) => String(s || "").toUpperCase().trim())
              .filter(Boolean)
          : [];
        const allowedSet = new Set(allowed);

        const normalized = Array.isArray(data)
          ? data
              .map((hit) => {
                const lat = Number(hit?.lat);
                const lon = Number(hit?.lon);
                if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

                // US-only is already requested, but keep a defensive check.
                const countryCode = String(hit?.address?.country_code || "")
                  .toLowerCase()
                  .trim();
                if (countryCode && countryCode !== "us") return null;

                // If we have allowed states, filter by address.state_code/state.
                if (allowedSet.size > 0) {
                  const stateCode = String(hit?.address?.state_code || "")
                    .toUpperCase()
                    .trim();
                  const maybeIso = String(hit?.address?.ISO3166_2_lvl4 || "")
                    .toUpperCase()
                    .trim();
                  const isoState = maybeIso.startsWith("US-")
                    ? maybeIso.slice(3)
                    : "";

                  const displayUpper = String(hit?.display_name || "").toUpperCase();
                  const displayMatch = displayUpper.match(
                    /,\s*([A-Z]{2})\s*(,|$)/
                  );
                  const displayState = displayMatch?.[1] || "";

                  const resolvedState = stateCode || isoState || displayState;
                  if (!resolvedState || !allowedSet.has(resolvedState)) return null;
                }

                return {
                  id: String(hit?.place_id || `${lat},${lon}`),
                  displayName: String(hit?.display_name || ""),
                  coordinates: [lat, lon],
                };
              })
              .filter(Boolean)
          : [];

        setPlaceResults(normalized.slice(0, 6));
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
    <aside className="catalog">
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
              .filter((cat) => cat.id !== "city" && cat.id !== "custom")
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
              <div key={activity.id} className="catalog-item">
                <button
                  type="button"
                  className="item-main"
                  onClick={() => onOpenDetails(activity)}
                >
                  <span className="item-icon">
                    {categories[activity.category]?.icon}
                  </span>
                  <div className="item-info">
                    <strong>
                      {activity.name}
                      {activity.momMentioned && (
                        <span className="icon-mom" title="Mom Approved">
                          {" "}
                          ❤️
                        </span>
                      )}
                    </strong>
                    <small>{activity.location}</small>
                  </div>
                </button>
                <div className="item-actions">
                  <button
                    className="add-btn"
                    onClick={() => onAddActivity(selectedDay?.id, activity.id)}
                    title={`Add to Day ${selectedDay?.dayNumber}`}
                    type="button"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => onOpenDetails(activity)}
                  >
                    Details
                  </button>
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
                        setPlaceQuery("");
                        setPlaceResults([]);
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
                          setPlaceQuery("");
                          setPlaceResults([]);
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
