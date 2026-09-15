/**
 * The flight relay: a Cloudflare Worker (see /relay) that holds the FlightAware
 * AeroAPI key and answers /flight/<ident>?date=... with status, gates, times
 * and position. Empty until `relay/deploy.sh` has run; the flight deck falls
 * back to scheduled progress while it is.
 */
export const FLIGHT_RELAY = "";
