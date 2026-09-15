# mmt-flight-relay

The one server-side piece of the Michigan '26 field guide: a Cloudflare Worker that turns
FlightAware AeroAPI (plus adsb.lol for a free position) into a JSON the static site is allowed
to read. It holds the AeroAPI key as a Worker secret; the site only ever sees the relay URL.

Why it exists: every open ADS-B feed and AeroAPI itself refuse cross-origin browser requests,
and a public site cannot hold an API key. The repo's "no backend" rule is about accounts, sync
and databases; this has none of those, stores nothing, and answers only two flight numbers.

## Deploy (once, from a terminal that can open a browser for the Cloudflare login)

    cd relay
    npx wrangler login
    npx wrangler secret put AEROAPI_KEY      # paste the FlightAware key when prompted
    npx wrangler deploy                      # prints https://mmt-flight-relay.<subdomain>.workers.dev

Then put that URL in `trip-planner/src/data/relay.js` (`FLIGHT_RELAY`) and push. The flight
deck flips from scheduled progress to live status, gates, estimated times and position.

## Cost cap

Responses are cached at the edge for 45 seconds, only AAL2358 and AAL1253 are accepted, and the
deck polls once a minute only while a flight is within its day. That is at most 1,440 AeroAPI
calls per flight day, well inside the personal tier.

## Try it

    curl "https://mmt-flight-relay.<subdomain>.workers.dev/flight/AAL2358?date=2026-09-14"
