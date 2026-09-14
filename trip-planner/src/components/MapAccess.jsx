import L from "leaflet";
import { Children, isValidElement, useEffect, useMemo } from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";

import { LeafletContext, useLeafletContext } from "@react-leaflet/core";
import { usePointCluster } from "./MapClusters";
import { layoutMapLabels } from "../lib/mapLabelLayout";
import { mapArea, shortMapLabel } from "../lib/mapLabels";

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
export function NamedMarker({ children, title, mapLabel, clustered = true, ...props }) {
  const name = title || headingOf(children) || "Map point";
  const cluster = usePointCluster();
  const context = useLeafletContext();
  const group = clustered ? cluster?.group : undefined;
  const markerContext = useMemo(() => group ? { ...context, layerContainer: group } : context, [context, group]);
  const [lat, lng] = props.position;
  const position = useMemo(() => [lat, lng], [lat, lng]);
  const area = mapArea(position);
  const label = mapLabel || shortMapLabel(name);
  const showLabel = group && (!cluster.everySpot || cluster.zoom >= 10);
  return <LeafletContext value={markerContext}><Marker {...props} position={position} title={name} alt={name} area={area} riseOnHover>
    {children}
    {showLabel && <Tooltip permanent direction="top" offset={[0, -26]} className="map-place-label">{label}</Tooltip>}
  </Marker></LeafletContext>;
}

export function MapAccess({ onPoints, mapRef }) {
  const map = useMap();
  const { group } = usePointCluster();
  useEffect(() => {
    mapRef.current = map;
    let frame;
    let labelResize;
    const observedLabels = new Set();
    const leaders = L.layerGroup().addTo(map);
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
        const labelObstacles = [{left:8,right:60,top:8,bottom:108}];
        map.eachLayer((layer) => {
          if (layer instanceof L.MarkerCluster) {
            const pixel = map.latLngToContainerPoint(layer.getLatLng());
            labelObstacles.push({left:pixel.x-60,right:pixel.x+60,top:pixel.y-26,bottom:pixel.y+26});
            const label = layer.getElement()?.textContent || "Map group";
            layer.getElement()?.setAttribute("aria-label", `${label}. Zoom in to explore`);
          }
        });
        const size = map.getSize();
        const labels = points.flatMap(({layer}) => {
          const tip = layer.getTooltip();
          const el = tip?.getElement();
          if (!map.hasLayer(layer) || !el || !tip.isOpen()) return [];
          const pixel = map.latLngToContainerPoint(layer.getLatLng());
          if (pixel.x < 0 || pixel.y < 0 || pixel.x > size.x || pixel.y > size.y) return [];
          return [{layer,tip,el,x:pixel.x,y:pixel.y,width:el.offsetWidth,height:el.offsetHeight}];
        }).sort((a,b) => a.y-b.y || a.x-b.x);
        const activeLabels = new Set(labels.map(l => l.el));
        for (const el of observedLabels) if (!activeLabels.has(el)) { labelResize.unobserve(el); observedLabels.delete(el); }
        for (const el of activeLabels) if (!observedLabels.has(el)) { observedLabels.add(el); labelResize.observe(el); }
        leaders.clearLayers();
        for (const label of layoutMapLabels(labels, size.x, size.y, labelObstacles)) {
          label.tip.options.direction = "center";
          label.tip.options.offset = L.point(label.labelX-label.x, label.labelY-label.y);
          label.tip.setLatLng(label.layer.getLatLng());
          if (Math.hypot(label.labelX-label.x,label.labelY-label.y) > 40) {
            L.polyline([label.layer.getLatLng(),map.containerPointToLatLng([label.labelX,label.labelY])], {color:"#486775",weight:1,opacity:.6,interactive:false}).addTo(leaders);
          }
        }
        points.sort((a, b) => a.name.localeCompare(b.name) || a.id - b.id);
        onPoints((previous) => previous.length === points.length && previous.every((p, i) => p.id === points[i].id && p.name === points[i].name && p.group === points[i].group) ? previous : points);
      });
    };
    labelResize = new ResizeObserver(refresh);
    const resize = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    resize.observe(map.getContainer());
    group.on("layeradd layerremove", refresh);
    const added = ({layer}) => { if (layer instanceof L.Marker || layer instanceof L.Tooltip) refresh(); };
    map.on("zoomend moveend", refresh);
    map.on("layeradd", added);
    refresh();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      labelResize.disconnect();
      group.off("layeradd layerremove", refresh);
      map.off("zoomend moveend", refresh);
      map.off("layeradd", added);
      leaders.remove();
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
