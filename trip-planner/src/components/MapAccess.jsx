import L from "leaflet";
import { Children, isValidElement, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";

function textOf(node) {
  return Children.toArray(node).map((child) => isValidElement(child) ? textOf(child.props.children) : String(child)).join("");
}
function headingOf(node) {
  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) continue;
    if (child.type === "b") return textOf(child.props.children);
    const heading = headingOf(child.props.children);
    if (heading) return heading;
  }
  return "";
}

// One accessible name from the same content the popup displays.
export function NamedMarker({ children, title, ...props }) {
  const name = title || headingOf(children) || "Map point";
  return <Marker {...props} title={name} alt={name} riseOnHover>{children}</Marker>;
}

export function MapAccess({ onPoints, mapRef }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const points = [];
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer.getPopup()) {
            points.push({ id: L.stamp(layer), name: layer.options.title || "Map point", layer });
            layer.getElement()?.setAttribute("aria-label", layer.options.title || "Map point");
          }
        });
        onPoints(points);
      });
    };
    const resize = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    resize.observe(map.getContainer());
    map.on("layeradd layerremove", refresh);
    refresh();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      map.off("layeradd layerremove", refresh);
      mapRef.current = null;
    };
  }, [map, mapRef, onPoints]);
  return null;
}

export function PointFinder({ points, query, onQuery, onSelect }) {
  const matching = points.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <details className="map-point-finder">
    <summary>Find a map point <span>{points.length} in active layers</span></summary>
    <label>Search stops, hotels, fuel and other markers
      <input type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Try Mackinac, gas, or a hotel…" />
    </label>
    <p>Choose a point to zoom in and open its details. Use the date and layer controls to change this list.</p>
    <ul>{matching.map((point) => <li key={point.id}><button type="button" onClick={() => onSelect(point)}>{point.name}<span aria-hidden="true">↗</span></button></li>)}</ul>
    {!matching.length && <p role="status">No matching points in the active layers.</p>}
  </details>;
}
