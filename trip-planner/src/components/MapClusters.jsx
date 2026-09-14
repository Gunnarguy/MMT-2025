import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import { clusterLabel, escapeMapHtml } from "../lib/mapLabels";

export const ClusterContext = createContext(null);
export function usePointCluster() { return useContext(ClusterContext); }

export default function MapClusters({ children, zoom, everySpot = false }) {
  const map = useMap();
  const group = useMemo(() => everySpot ? L.featureGroup() : L.markerClusterGroup({
    animate: false,
    zoomToBoundsOnClick: false,
    showCoverageOnHover: false,
    maxClusterRadius: 48,
    spiderfyDistanceMultiplier: 1.8,
    spiderLegPolylineOptions: { color: "#175d70", weight: 2, opacity: 0.6 },
    iconCreateFunction(cluster) {
      const label = clusterLabel(cluster.getAllChildMarkers().map((p) => p.options.area));
      return L.divIcon({
        className: "map-place-cluster",
        iconSize: [112, 44], iconAnchor: [56, 22],
        html: `<span class="map-cluster-title">${escapeMapHtml(label)}</span> <span class="map-cluster-count">${cluster.getChildCount()} spots <span aria-hidden="true">＋</span></span>`,
      });
    },
  }), [everySpot]);
  useEffect(() => {
    const explore = ({ layer }) => {
      if (map.getZoom() >= map.getMaxZoom() || layer.getBounds().getNorthEast().equals(layer.getBounds().getSouthWest())) {
        layer.spiderfy();
      } else {
        const bounds = layer.getBounds();
        const zoom = map.getBoundsZoom(bounds, false, L.point(130, 140));
        if (zoom <= map.getZoom()) layer.spiderfy();
        else map.fitBounds(bounds, { paddingTopLeft: [65, 80], paddingBottomRight: [65, 60], maxZoom: 17, animate: false });
      }
    };
    group.on("clusterclick", explore);
    map.addLayer(group);
    return () => { group.off("clusterclick", explore); map.removeLayer(group); };
  }, [map, group]);
  const value = useMemo(() => ({ group, zoom, everySpot }), [group, zoom, everySpot]);
  return <ClusterContext key={everySpot ? "individual" : "grouped"} value={value}>{children}</ClusterContext>;
}
