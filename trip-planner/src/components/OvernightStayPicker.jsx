import { useEffect, useRef, useState } from "react";
import { buildViewboxFromStates, stateNameToAbbr } from "../utils/usStates";

/**
 * OvernightStayPicker - A search-and-select component for overnight stays.
 * Works like the catalog place search but specifically for lodging/accommodation.
 */
export default function OvernightStayPicker({
  value,
  onChange,
  allowedStateAbbrs,
  allowCanadaPlaces,
  placeholder = "Search for hotel, Airbnb, or address...",
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const abortRef = useRef(null);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search for places when query changes
  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

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

        // Build bounding box from detected trip states
        const viewbox = buildViewboxFromStates(allowed);
        const bboxParam = viewbox
          ? `&bbox=${viewbox.left},${viewbox.bottom},${viewbox.right},${viewbox.top}`
          : "";

        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
          q
        )}&limit=15${bboxParam}`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          setResults([]);
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

                // Filter by country
                if (countryCode) {
                  if (countryCode === "us") {
                    // ok
                  } else if (allowCanadaPlaces && countryCode === "ca") {
                    // ok
                  } else {
                    return null;
                  }
                }

                // Build display name from Photon properties
                const nameParts = [props.name];
                if (props.city && props.city !== props.name)
                  nameParts.push(props.city);
                if (props.state) nameParts.push(props.state);
                const displayName = nameParts.filter(Boolean).join(", ");

                // Resolve state abbreviation
                const rawState = String(props.state || "").trim();
                let resolvedState = "";
                if (rawState.length === 2) {
                  resolvedState = rawState.toUpperCase();
                } else if (rawState) {
                  resolvedState = stateNameToAbbr(rawState) || "";
                }

                // Determine icon based on place type
                const osmValue = String(props?.osm_value || "").toLowerCase();
                let icon = "📍";
                if (
                  ["hotel", "motel", "hostel", "guest_house"].includes(osmValue)
                ) {
                  icon = "🏨";
                } else if (["camp_site", "caravan_site"].includes(osmValue)) {
                  icon = "⛺";
                } else if (props.type === "city" || osmValue === "city") {
                  icon = "🏙️";
                } else if (props.type === "town" || osmValue === "town") {
                  icon = "🏘️";
                } else if (
                  ["house", "apartment", "residential"].includes(osmValue)
                ) {
                  icon = "🏠";
                }

                return {
                  id: String(props.osm_id || `${lat},${lon}`),
                  displayName,
                  name: props.name || "",
                  coordinates: [lat, lon],
                  stateAbbr: resolvedState,
                  city: props.city || "",
                  state: props.state || "",
                  street: props.street || "",
                  housenumber: props.housenumber || "",
                  icon,
                };
              })
              .filter(Boolean)
          : [];

        // Prefer lodging results, then cities
        const sorted = [...normalized].sort((a, b) => {
          const aIsLodging =
            a.icon === "🏨" || a.icon === "⛺" || a.icon === "🏠";
          const bIsLodging =
            b.icon === "🏨" || b.icon === "⛺" || b.icon === "🏠";
          if (aIsLodging !== bIsLodging) return aIsLodging ? -1 : 1;
          return 0;
        });

        setResults(sorted.slice(0, 8));
      } catch (e) {
        if (e?.name !== "AbortError") {
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, allowedStateAbbrs, allowCanadaPlaces]);

  const handleSelect = (result) => {
    // Store as object with name and coordinates
    onChange({
      name: result.displayName,
      coordinates: result.coordinates,
    });
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange({ name: "", coordinates: null });
    setQuery("");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // Parse value - can be string (legacy) or object with name/coordinates
  const displayValue =
    typeof value === "object" ? value?.name || "" : value || "";
  const hasValue = Boolean(displayValue);

  return (
    <div className="overnight-stay-picker" ref={containerRef}>
      {hasValue ? (
        <div className="selected-stay">
          <span className="stay-icon">🏨</span>
          <span className="stay-name">{displayValue}</span>
          <button
            type="button"
            className="clear-stay-btn"
            onClick={handleClear}
            title="Clear overnight stay"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="stay-search">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="stay-search-input"
          />
          {loading && <span className="stay-loading">...</span>}
        </div>
      )}

      {isOpen && results.length > 0 && !hasValue && (
        <div className="stay-results-dropdown">
          {results.map((result) => {
            const address = [result.street, result.housenumber]
              .filter(Boolean)
              .join(" ");
            const location = [result.city, result.state]
              .filter(Boolean)
              .join(", ");
            const subline = [address, location].filter(Boolean).join(" · ");

            return (
              <button
                key={result.id}
                type="button"
                className="stay-result-item"
                onClick={() => handleSelect(result)}
              >
                <span className="result-icon">{result.icon}</span>
                <div className="result-info">
                  <strong>{result.name || result.displayName}</strong>
                  {subline && <small>{subline}</small>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
