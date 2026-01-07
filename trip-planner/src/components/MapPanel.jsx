import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { formatCurrency, formatDuration, formatMiles, getDayColor } from '../utils/formatters';

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds || bounds.length < 1) return;
    map.fitBounds(bounds, { padding: [24, 24] });
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
    name: 'Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr: '&copy; OpenStreetMap'
  },
  light: {
    name: 'Light',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attr: '&copy; OpenStreetMap &copy; CARTO'
  },
  dark: {
    name: 'Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attr: '&copy; OpenStreetMap &copy; CARTO'
  },
  terrain: {
    name: 'Terrain',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attr: 'Tiles &copy; Esri'
  }
};

export default function MapPanel({
  mapActivities,
  dayRoutes,
  selectedDayId,
  selectedDayBounds,
  tripRouteTotals,
  routesLoading,
  routesError,
  costPerMile,
  onCostChange,
  estimatedTripCost,
  onResetTrip,
  googleMapsUrl,
  weatherUrl
}) {
  const [mapStyle, setMapStyle] = useState('light');

  return (
    <aside className="map-panel">
      <div className="map-header">
        <div className="map-title">
          <h3>Trip map</h3>
          <div className="map-metrics">
            <span className="map-stat">{mapActivities.length} pins</span>
            <span className="map-stat">
              Trip: {formatMiles(tripRouteTotals.distance_m)} | {formatDuration(tripRouteTotals.duration_s)}
            </span>
            {estimatedTripCost != null && (
              <span className="map-stat">Est: {formatCurrency(estimatedTripCost)}</span>
            )}
            {routesLoading && <span className="map-stat">Calculating routes...</span>}
            {routesError && <span className="map-stat error">{routesError}</span>}
          </div>
        </div>

        <div className="map-controls">
          <select 
            className="style-select" 
            value={mapStyle} 
            onChange={(e) => setMapStyle(e.target.value)}
            aria-label="Map style"
          >
            {Object.entries(TILE_LAYERS).map(([key, layer]) => (
              <option key={key} value={key}>{layer.name} Map</option>
            ))}
          </select>
          
          <label className="cost-input">
            $/mi
            <input
              value={costPerMile}
              onChange={(e) => onCostChange(e.target.value)}
              inputMode="decimal"
              placeholder="0.00"
            />
          </label>
          {googleMapsUrl && (
            <a className="btn-primary btn-sm" href={googleMapsUrl} target="_blank" rel="noreferrer">
              Navigate Day ↗
            </a>
          )}
          {weatherUrl && (
            <a className="ghost-btn" href={weatherUrl} target="_blank" rel="noreferrer">
              Forecast ↗
            </a>
          )}
        </div>
      </div>

      <div className="map-container">
        <MapContainer center={[43.5, -71.5]} zoom={7} style={{ height: '100%', width: '100%' }}>
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
                opacity: route.dayId === selectedDayId ? 0.9 : 0.35
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
