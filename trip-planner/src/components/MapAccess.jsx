import L from "leaflet";
import { Children, isValidElement, useEffect, useMemo } from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";

import { LeafletContext, useLeafletContext } from "@react-leaflet/core";
import { usePointCluster } from "./MapClusters";
import { mapArea } from "../lib/mapLabels";

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
export function NamedMarker({ children, title, clustered = true, ...props }) {
  const name = title || headingOf(children) || "Map point";
  const cluster = usePointCluster();
  const context = useLeafletContext();
  const group = clustered ? cluster?.group : undefined;
  const markerContext = useMemo(() => group ? { ...context, layerContainer: group } : context, [context, group]);
  const [lat, lng] = props.position;
  const position = useMemo(() => [lat, lng], [lat, lng]);
  const area = mapArea(position);
  const label = cluster?.zoom >= 10 ? name : area;
  return <LeafletContext value={markerContext}><Marker {...props} position={position} title={name} alt={name} area={area} riseOnHover>
    {children}
    {group && <Tooltip permanent direction="top" offset={[0, -36]} className="map-place-label">{label}</Tooltip>}
  </Marker></LeafletContext>;
}

export function MapAccess({ onPoints, mapRef }) {
  const map = useMap();
  const { group } = usePointCluster();
  useEffect(() => {
    mapRef.current = map;
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const points = [];
        group.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer.getPopup()) {
            points.push({ id: L.stamp(layer), name: layer.options.title || "Map point", area: layer.options.area, layer, group });
            layer.getElement()?.setAttribute("aria-label", layer.options.title || "Map point");
          }
        });
        map.eachLayer((layer) => {
          if (layer instanceof L.MarkerCluster) {
            const label = layer.getElement()?.textContent || "Map group";
            layer.getElement()?.setAttribute("aria-label", `${label}. Zoom in to explore`);
          }
        });
        points.sort((a, b) => a.name.localeCompare(b.name) || a.id - b.id);
        onPoints((previous) => previous.length === points.length && previous.every((p, i) => p.id === points[i].id && p.name === points[i].name) ? previous : points);
      });
    };
    const resize = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    resize.observe(map.getContainer());
    group.on("layeradd layerremove", refresh);
    map.on("zoomend moveend layeradd", refresh);
    refresh();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      group.off("layeradd layerremove", refresh);
      map.off("zoomend moveend layeradd", refresh);
      mapRef.current = null;
    };
  }, [map, group, mapRef, onPoints]);
  return null;
}

export function PointFinder({ points, query, onQuery, onSelect }) {
  const matching = points.filter((p) => `${p.name} ${p.area}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <details className="map-point-finder">
    <summary>Find a map point <span>{points.length} in active layers</span></summary>
    <label>Search stops, hotels, fuel and other markers
      <input type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Try Mackinac, gas, or a hotel…" />
    </label>
    <p>Choose a point to zoom in and open its details. Use the date and layer controls to change this list.</p>
    <ul>{matching.map((point) => <li key={point.id}><button type="button" data-point-id={point.id} aria-label={`${point.name}, ${point.area}`} onClick={() => onSelect(point)}><span>{point.name}<small>{point.area}</small></span><span aria-hidden="true">↗</span></button></li>)}</ul>
    {!matching.length && <p role="status">No matching points in the active layers.</p>}
  </details>;
}
