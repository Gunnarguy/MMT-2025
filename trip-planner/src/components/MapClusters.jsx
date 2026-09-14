import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMap } from "react-leaflet";
import { clusterLabel, escapeMapHtml } from "../lib/mapLabels";

export const ClusterContext = createContext(null);
export function usePointCluster() { return useContext(ClusterContext); }

export default function MapClusters({ children, zoom }) {
  const map = useMap();
  const [group] = useState(() => L.markerClusterGroup({
    animate: false,
    showCoverageOnHover: false,
    maxClusterRadius: 65,
    spiderfyDistanceMultiplier: 1.8,
    spiderLegPolylineOptions: { color: "#175d70", weight: 2, opacity: 0.6 },
    iconCreateFunction(cluster) {
      const label = clusterLabel(cluster.getAllChildMarkers().map((p) => p.options.area));
      return L.divIcon({
        className: "map-place-cluster",
        iconSize: [140, 54], iconAnchor: [70, 27],
        html: `<span class="map-cluster-title">${escapeMapHtml(label)}</span> <span class="map-cluster-count">${cluster.getChildCount()} map points <span aria-hidden="true">＋</span></span>`,
      });
    },
  }));
  useEffect(() => {
    map.addLayer(group);
    return () => map.removeLayer(group);
  }, [map, group]);
  const value = useMemo(() => ({ group, zoom }), [group, zoom]);
  return <ClusterContext value={value}>{children}</ClusterContext>;
}
