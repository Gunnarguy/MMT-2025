import { useEffect, useMemo, useRef, useState } from "react";
import { categories, regions } from "../data/catalog";
import { formatHours } from "../utils/formatters";
import { buildViewboxFromStates } from "../utils/usStates";

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

// Map OSM types to icons and categories
function getPlaceTypeInfo(props) {
  const osmKey = String(props?.osm_key || "").toLowerCase();
  const osmValue = String(props?.osm_value || "").toLowerCase();
  const type = props?.type || "";

  // Restaurants & Food
  if (
    osmValue === "restaurant" ||
    osmValue === "fast_food" ||
    osmValue === "food_court"
  ) {
    return { icon: "🍽️", label: "Restaurant", category: "food" };
  }
  if (osmValue === "cafe" || osmValue === "coffee") {
    return { icon: "☕", label: "Café", category: "food" };
  }
  if (osmValue === "bar" || osmValue === "pub" || osmValue === "brewery") {
    return { icon: "🍺", label: "Bar", category: "food" };
  }
  if (osmValue === "bakery") {
    return { icon: "🥐", label: "Bakery", category: "food" };
  }
  if (osmValue === "ice_cream") {
    return { icon: "🍦", label: "Ice Cream", category: "food" };
  }
  if (osmKey === "amenity" && osmValue === "food") {
    return { icon: "🍽️", label: "Food", category: "food" };
  }

  // Attractions & Tourism
  if (osmValue === "museum" || osmValue === "gallery") {
    return { icon: "🏛️", label: "Museum", category: "attraction" };
  }
  if (osmValue === "attraction" || osmValue === "viewpoint") {
    return { icon: "📸", label: "Attraction", category: "attraction" };
  }
  if (osmValue === "theme_park" || osmValue === "amusement_arcade") {
    return { icon: "🎢", label: "Theme Park", category: "attraction" };
  }
  if (osmValue === "zoo" || osmValue === "aquarium") {
    return { icon: "🦁", label: "Zoo/Aquarium", category: "attraction" };
  }
  if (osmValue === "beach") {
    return { icon: "🏖️", label: "Beach", category: "attraction" };
  }
  if (osmKey === "natural" || osmValue === "park" || osmValue === "nature_reserve") {
    return { icon: "🌲", label: "Nature", category: "attraction" };
  }
  if (osmValue === "national_park" || osmValue === "state_park") {
    return { icon: "🏞️", label: "Park", category: "attraction" };
  }

  // Lodging
  if (
    osmValue === "hotel" ||
    osmValue === "motel" ||
    osmValue === "hostel" ||
    osmValue === "guest_house"
  ) {
    return { icon: "🏨", label: "Hotel", category: "lodging" };
  }
  if (osmValue === "camp_site" || osmValue === "caravan_site") {
    return { icon: "⛺", label: "Camping", category: "lodging" };
  }

  // Shopping
  if (osmKey === "shop" || osmValue === "mall" || osmValue === "marketplace") {
    return { icon: "🛍️", label: "Shopping", category: "shopping" };
  }

  // Transport
  if (osmValue === "airport" || osmValue === "aerodrome") {
    return { icon: "✈️", label: "Airport", category: "transport" };
  }
  if (osmValue === "station" || osmValue === "bus_station") {
    return { icon: "🚉", label: "Station", category: "transport" };
  }
  if (osmValue === "fuel" || osmValue === "gas_station") {
    return { icon: "⛽", label: "Gas Station", category: "transport" };
  }

  // Places/Cities
  if (type === "city" || osmValue === "city") {
    return { icon: "🏙️", label: "City", category: "city" };
  }
  if (type === "town" || osmValue === "town") {
    return { icon: "🏘️", label: "Town", category: "city" };
  }
  if (type === "village" || osmValue === "village") {
    return { icon: "🏡", label: "Village", category: "city" };
  }
  if (type === "locality" || type === "neighbourhood") {
    return { icon: "📍", label: "Area", category: "city" };
  }

  // Default
  return { icon: "📍", label: "Place", category: "custom" };
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

  // Also handle Canadian provinces
  const caIsoState = maybeIso.startsWith("CA-") ? maybeIso.slice(3) : "";
  if (caIsoState) return caIsoState;

  const displayUpper = String(hit?.display_name || "").toUpperCase();
  const displayMatch = displayUpper.match(/,\s*([A-Z]{2})\s*(,|$)/);
  return displayMatch?.[1] || "";
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

        // Build bounding box from detected trip states for location bias
        const viewbox = buildViewboxFromStates(allowed);

        // Use Photon geocoding API (faster, more reliable than Nominatim)
        // Photon uses bbox format: minLon,minLat,maxLon,maxLat
        const bboxParam = viewbox
          ? `&bbox=${viewbox.left},${viewbox.bottom},${viewbox.right},${viewbox.top}`
          : "";

        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
          q
        )}&limit=20${bboxParam}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          setPlaceResults([]);
          return;
        }
        const data = await res.json();

        const normalized = Array.isArray(data?.features)
          ? data.features
              .map((feature) => {
                const coords = feature?.geometry?.coordinates;
                if (!Array.isArray(coords) || coords.length < 2) return null;
                const lon = Number(coords[0]);
                const lat = Number(coords[1]);
                if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

                const props = feature?.properties || {};
                const countryCode = String(props.countrycode || "")
                  .toLowerCase()
                  .trim();

                // Filter by country - US always allowed, Canada if trip is near border
                if (countryCode) {
                  if (countryCode === "us") {
                    // ok
                  } else if (allowCanadaPlaces && countryCode === "ca") {
                    // ok
                  } else {
                    return null;
                  }
                }

                // Get place type info for icon and category
                const typeInfo = getPlaceTypeInfo(props);

                // Build display name from Photon properties
                const nameParts = [props.name];
                if (props.city && props.city !== props.name)
                  nameParts.push(props.city);
                if (props.county) nameParts.push(props.county);
                if (props.state) nameParts.push(props.state);
                if (props.country) nameParts.push(props.country);
                const displayName = nameParts.filter(Boolean).join(", ");

                const stateAbbr = String(props.state || "")
                  .toUpperCase()
                  .trim();
                // Try to get 2-letter abbreviation from state name
                const resolvedState = stateAbbr.length === 2 ? stateAbbr : "";

                return {
                  id: String(props.osm_id || `${lat},${lon}`),
                  displayName,
                  name: props.name || "",
                  coordinates: [lat, lon],
                  stateAbbr: resolvedState,
                  typeInfo,
                  city: props.city || "",
                  state: props.state || "",
                  street: props.street || "",
                  housenumber: props.housenumber || "",
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
            // Prioritize POIs (restaurants, attractions) over generic places/cities
            const isPOI = r.typeInfo?.category !== "city";
            return {
              ...r,
              _idx: idx,
              _inAllowed: inAllowed,
              _distKm: distKm,
              _isPOI: isPOI,
            };
          })
          .sort((a, b) => {
            // 1) Prefer POIs (restaurants, attractions) over cities
            if (a._isPOI !== b._isPOI) return a._isPOI ? -1 : 1;
            // 2) Prefer inferred trip states first
            if (a._inAllowed !== b._inAllowed) return a._inAllowed ? -1 : 1;
            // 3) Then prefer nearer to the selected day / trip area
            const ad = a._distKm;
            const bd = b._distKm;
            if (ad != null && bd != null && ad !== bd) return ad - bd;
            if (ad != null && bd == null) return -1;
            if (ad == null && bd != null) return 1;
            // 4) Fall back to original order
            return a._idx - b._idx;
          });

        setPlaceResults(ranked.slice(0, 10));
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
  }, [placeQuery, allowedStateAbbrs, allowCanadaPlaces, placeSearchCenter]);

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
                {/* Compact header row */}
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
                  <button
                    className="add-btn-compact"
                    onClick={() => onAddActivity(selectedDay?.id, activity.id)}
                    title={`Add to Day ${selectedDay?.dayNumber}`}
                    type="button"
                  >
                    +
                  </button>
                </div>

                {/* Always show quick stats row */}
                <div className="item-stats-row">
                  {activity.rating && (
                    <span
                      className="stat-badge rating"
                      title={`${
                        activity.reviewCount
                          ? activity.reviewCount.toLocaleString() + " reviews"
                          : "Rating"
                      }`}
                    >
                      ★ {activity.rating}
                    </span>
                  )}
                  {activity.price && (
                    <span
                      className="stat-badge price"
                      title={activity.priceRange || "Price level"}
                    >
                      {activity.price}
                    </span>
                  )}
                  {activity.duration && (
                    <span className="stat-badge time">
                      ⏱ {formatHours(activity.duration)}
                    </span>
                  )}
                  {activity.waitTime && (
                    <span className="stat-badge wait" title="Typical wait">
                      ⏳ {activity.waitTime}
                    </span>
                  )}
                </div>

                {/* Expanded details */}
                {showExpandedDetails && (
                  <div className="item-expanded">
                    {/* Description */}
                    {activity.description && (
                      <p className="exp-description">{activity.description}</p>
                    )}

                    {/* Contact & Practical Info Grid */}
                    <div className="exp-info-grid">
                      {activity.address && !activity.private && (
                        <a
                          className="exp-info-link"
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            activity.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open in Google Maps"
                        >
                          <span className="exp-icon">📍</span>
                          <span className="exp-text">
                            {activity.address.split(",")[0]}
                          </span>
                        </a>
                      )}
                      {activity.phone && !activity.private && (
                        <a
                          className="exp-info-link"
                          href={`tel:${activity.phone}`}
                        >
                          <span className="exp-icon">📞</span>
                          <span className="exp-text">{activity.phone}</span>
                        </a>
                      )}
                      {activity.hours && (
                        <div className="exp-info-item">
                          <span className="exp-icon">🕐</span>
                          <span className="exp-text">{activity.hours}</span>
                        </div>
                      )}
                      {activity.parking && (
                        <div className="exp-info-item">
                          <span className="exp-icon">🅿️</span>
                          <span className="exp-text">{activity.parking}</span>
                        </div>
                      )}
                    </div>

                    {/* Payment/special notes */}
                    {activity.paymentNote && (
                      <div className="exp-note">{activity.paymentNote}</div>
                    )}

                    {/* Must try */}
                    {activity.mustTry && (
                      <div className="exp-callout must-try">
                        <strong>🍽 Try:</strong> {activity.mustTry}
                      </div>
                    )}

                    {/* Highlights (compact) */}
                    {activity.highlights && activity.highlights.length > 0 && (
                      <div className="exp-highlights">
                        {activity.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="highlight-chip">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pro tip */}
                    {activity.tip && (
                      <div className="exp-callout tip">
                        <strong>💡</strong> {activity.tip}
                      </div>
                    )}

                    {/* Mom quote */}
                    {activity.momQuote && (
                      <div className="exp-mom-quote">
                        ❤️ "{activity.momQuote}"
                      </div>
                    )}

                    {/* External links row */}
                    <div className="exp-links-row">
                      {activity.website && (
                        <a
                          href={activity.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-link"
                        >
                          🌐 Website
                        </a>
                      )}
                      {activity.coordinates && !activity.private && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${activity.coordinates[0]},${activity.coordinates[1]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-link"
                        >
                          🗺 Directions
                        </a>
                      )}
                      {activity.yelpRating && !activity.private && (
                        <a
                          href={`https://www.yelp.com/search?find_desc=${encodeURIComponent(
                            activity.name
                          )}&find_loc=${encodeURIComponent(activity.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-link yelp"
                          title={`Yelp: ${activity.yelpRating}/5`}
                        >
                          <span style={{ color: "#d32323" }}>●</span> Yelp{" "}
                          {activity.yelpRating}
                        </a>
                      )}
                      {activity.googleRating && !activity.private && (
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(
                            activity.name + " " + activity.location
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-link google"
                          title={`Google: ${activity.googleRating}/5`}
                        >
                          <span style={{ color: "#4285f4" }}>●</span> Google{" "}
                          {activity.googleRating}
                        </a>
                      )}
                    </div>

                    {/* Tags row */}
                    {activity.tags && activity.tags.length > 0 && (
                      <div className="exp-tags">
                        {activity.tags.map((tag) => (
                          <span key={tag} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Photo spot */}
                    {activity.photoSpot && (
                      <div className="exp-photo-spot">
                        📸 Best shot: {activity.photoSpot}
                      </div>
                    )}
                  </div>
                )}

                {/* Collapsed state: show details button */}
                {!showExpandedDetails && (
                  <div className="item-collapsed-actions">
                    {activity.mustTry && (
                      <span className="collapsed-hint">
                        🍽 {activity.mustTry.substring(0, 30)}...
                      </span>
                    )}
                    <button
                      type="button"
                      className="ghost-btn-sm"
                      onClick={() => onOpenDetails(activity)}
                    >
                      Details →
                    </button>
                  </div>
                )}
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
            <h4>Search places</h4>
            <p className="place-search-hint">
              Find restaurants, attractions, hotels, or any place
            </p>
            <input
              type="text"
              className="search-input place-search-input"
              placeholder="Try: pizza, coffee shop, museum, hotel..."
              value={placeQuery}
              onChange={(e) => setPlaceQuery(e.target.value)}
            />
            {placeLoading && <p className="place-loading">🔍 Searching…</p>}
            {!placeLoading &&
              placeQuery.trim() &&
              placeResults.length === 0 && (
                <p className="no-results">
                  No results found. Try a different search.
                </p>
              )}
            {placeResults.length > 0 && (
              <div className="place-results-list">
                {placeResults.map((hit) => {
                  const placeName =
                    hit.name ||
                    normalizePlaceLabel(hit.displayName) ||
                    placeQuery.trim();
                  const placeAddr = [hit.street, hit.housenumber]
                    .filter(Boolean)
                    .join(" ");
                  const placeCity = [hit.city, hit.state]
                    .filter(Boolean)
                    .join(", ");
                  const subline =
                    [placeAddr, placeCity].filter(Boolean).join(" · ") ||
                    normalizePlaceLocation(hit.displayName);

                  return (
                    <button
                      key={hit.id}
                      type="button"
                      className="place-result-item"
                      disabled={!canQuickAdd}
                      onClick={() => {
                        if (!canQuickAdd) return;
                        onQuickAddCustomPlace({
                          dayId: selectedDay?.id,
                          name: placeName,
                          location:
                            placeCity ||
                            normalizePlaceLocation(hit.displayName),
                          coordinates: hit.coordinates,
                          category: hit.typeInfo?.category || "custom",
                        });
                        resetPlaceSearch();
                      }}
                    >
                      <span className="place-icon">
                        {hit.typeInfo?.icon || "📍"}
                      </span>
                      <div className="place-info">
                        <strong className="place-name">{placeName}</strong>
                        <span className="place-type-badge">
                          {hit.typeInfo?.label || "Place"}
                        </span>
                        <small className="place-subline">{subline}</small>
                      </div>
                      <span className="place-add-indicator">+</span>
                    </button>
                  );
                })}
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
