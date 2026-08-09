import L from "leaflet";

/**
 * The map draws every marker with `L.divIcon` (see RouteMap), so Leaflet's
 * bundled PNG marker is never used. Point its icon URLs at a 1x1 transparent
 * data URI so a stray default marker can't fire a request at a CDN — this site
 * is otherwise fully self-contained.
 */
const BLANK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: BLANK,
  iconRetinaUrl: BLANK,
  shadowUrl: BLANK,
});
