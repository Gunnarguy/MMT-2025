import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import {
  formatCurrency,
  formatDuration,
  formatMiles,
  getDayColor,
} from "../utils/formatters";

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds || bounds.length < 1) return;
    map.fitBounds(bounds, {
      paddingTopLeft: [32, 80],
      paddingBottomRight: [32, 32],
    });
  }, [map, bounds]);
  return null;
}

function MapRevalidator() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    // Observe the map container's parent element
    if (map.getContainer()) {
      observer.observe(map.getContainer());
    }
    return () => observer.disconnect();
  }, [map]);
  return null;
}

const TILE_LAYERS = {
  standard: {
    name: "Standard",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attr: "&copy; OpenStreetMap",
  },
  light: {
    name: "Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attr: "&copy; OpenStreetMap &copy; CARTO",
  },
  dark: {
    name: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attr: "&copy; OpenStreetMap &copy; CARTO",
  },
  terrain: {
    name: "Terrain",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr: "Tiles &copy; Esri",
  },
};

export default function MapPanel({
  mapActivities,
  dayRoutes,
  selectedDayId,
  selectedDayBounds,
  tripRouteTotals,
  routesLoading,
  routesError,
  gasPricePerGallon,
  onGasPriceChange,
  vehicleMpg,
  onVehicleMpgChange,
  estimatedFuelCost,
  onResetTrip,
  googleMapsUrl,
  weatherUrl,
}) {
  const MIN_WIDTH = 360;
  const MAX_WIDTH = 720;

  const [mapStyle, setMapStyle] = useState("light");
  const [panelWidth, setPanelWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const mapRef = useRef(null);

  const showExpandedStats = panelWidth >= 600;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      // For right panel, drag left decreases X, so we subtract delta
      const delta = startXRef.current - e.clientX;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, startWidthRef.current + delta)
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

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    requestAnimationFrame(() => {
      map.invalidateSize();
    });
  }, [panelWidth]);

  useEffect(() => {
    if (!panelRef.current || !mapRef.current) return undefined;
    const map = mapRef.current;
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    });
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapActivities || mapActivities.length === 0) return;
    const last = mapActivities[mapActivities.length - 1];
    const coords = last?.coordinates;
    if (!Array.isArray(coords) || coords.length < 2) return;
    const map = mapRef.current;
    requestAnimationFrame(() => {
      map.setView(coords, Math.max(map.getZoom(), 11));
    });
  }, [mapActivities]);

  return (
    <aside
      className="map-panel"
      ref={panelRef}
      style={{
        width: `${panelWidth}px`,
        minWidth: `${MIN_WIDTH}px`,
        maxWidth: `${MAX_WIDTH}px`,
        position: "relative",
      }}
    >
      <div
        className="map-resize-handle"
        onMouseDown={handleResizeStart}
        role="separator"
        aria-label="Resize map panel"
      />
      <div className="map-header">
        <div className="map-title">
          <h3>Trip map</h3>
          {!showExpandedStats ? (
            <div className="map-metrics">
              <span className="map-stat">{mapActivities.length} pins</span>
              <span className="map-stat">
                Trip: {formatMiles(tripRouteTotals.distance_m)} |{" "}
                {formatDuration(tripRouteTotals.duration_s)}
              </span>
              {estimatedTripCost != null && (
                <span className="map-stat">
                  Est: {formatCurrency(estimatedTripCost)}
                </span>
              )}
              {routesLoading && (
                <span className="map-stat">Calculating routes...</span>
              )}
              {routesError && (
                <span className="map-stat error">{routesError}</span>
              )}
            </div>
          ) : (
            <div className="map-metrics-expanded">
              <div className="metric-item">
                <span className="metric-label">Activities</span>
                <span className="metric-value">
                  {mapActivities.length} pins
                </span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Trip Distance</span>
                <span className="metric-value">
                  {formatMiles(tripRouteTotals.distance_m)}
                </span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Drive Time</span>
                <span className="metric-value">
                  {formatDuration(tripRouteTotals.duration_s)}
                </span>
              </div>
              {estimatedFuelCost != null && (
                <div className="metric-item">
                  <span className="metric-label">Est. Fuel Cost</span>
                  <span className="metric-value">
                    {formatCurrency(estimatedFuelCost)}
                  </span>
                </div>
              )}
              {routesLoading && (
                <div className="metric-item status">
                  <span className="metric-value">Calculating routes...</span>
                </div>
              )}
              {routesError && (
                <div className="metric-item status error">
                  <span className="metric-value">{routesError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`map-controls ${showExpandedStats ? "expanded" : ""}`}>
          <select
            className="style-select"
            value={mapStyle}
            onChange={(e) => setMapStyle(e.target.value)}
            aria-label="Map style"
          >
            {Object.entries(TILE_LAYERS).map(([key, layer]) => (
              <option key={key} value={key}>
                {layer.name} Map
              </option>
            ))}
          </select>

          <label className="cost-input">
            {showExpandedStats && (
              <span className="input-label">Price per gallon</span>
            )}
            <div className="input-row">
              <span className="input-prefix">$/gal</span>
              <input
                value={gasPricePerGallon}
                onChange={(e) => onGasPriceChange(e.target.value)}
                inputMode="decimal"
                placeholder="3.50"
                aria-label="Gas price per gallon"
              />
            </div>
          </label>

          <label className="cost-input">
            {showExpandedStats && (
              <span className="input-label">Vehicle MPG</span>
            )}
            <div className="input-row">
              <span className="input-prefix">MPG</span>
              <input
                value={vehicleMpg}
                onChange={(e) => onVehicleMpgChange(e.target.value)}
                inputMode="decimal"
                placeholder="28"
                aria-label="Vehicle miles per gallon"
              />
            </div>
          </label>
          {googleMapsUrl && (
            <a
              className="btn-primary btn-sm"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Navigate Day ↗
            </a>
          )}
          {weatherUrl && (
            <a
              className="ghost-btn"
              href={weatherUrl}
              target="_blank"
              rel="noreferrer"
            >
              Forecast ↗
            </a>
          )}
        </div>
      </div>

      <div className="map-container">
        <MapContainer
          key={`map-${Math.round(panelWidth)}`}
          center={[43.5, -71.5]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(map) => {
            mapRef.current = map;
          }}
        >
          {selectedDayBounds && <FitBounds bounds={selectedDayBounds} />}
          <TileLayer
            url={TILE_LAYERS[mapStyle].url}
            attribution={TILE_LAYERS[mapStyle].attr}
          />

          {Object.values(dayRoutes).map((route) => (
            <Polyline
              key={`route-${route.dayId}`}
              positions={route.line}
              pathOptions={{
                color: getDayColor(route.dayNumber),
                weight: route.dayId === selectedDayId ? 5 : 3,
                opacity: route.dayId === selectedDayId ? 0.9 : 0.35,
              }}
            />
          ))}

          {mapActivities.map((activity, i) => (
            <Marker key={`${activity.id}-${i}`} position={activity.coordinates}>
              <Popup>
                <strong>
                  Day {activity.dayNumber}: {activity.name}
                </strong>
                <br />
                {activity.location}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </aside>
  );
}
