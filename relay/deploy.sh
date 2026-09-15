#!/usr/bin/env bash
# Deploy the relay and push the AeroAPI key from .dev.vars into the Worker as a secret,
# without the key ever appearing on a command line or in a log.
set -euo pipefail
cd "$(dirname "$0")"
[ -f .dev.vars ] || { echo ".dev.vars is missing (AEROAPI_KEY=...)"; exit 1; }
npx wrangler whoami >/dev/null 2>&1 || { echo "Run: npx wrangler login   (opens the Cloudflare login in your browser), then re-run this."; exit 1; }
grep '^AEROAPI_KEY=' .dev.vars | cut -d= -f2- | tr -d '\n' | npx wrangler secret put AEROAPI_KEY
out=$(npx wrangler deploy 2>&1)
echo "$out" | grep -v -i "key" | tail -6
url=$(echo "$out" | grep -oE 'https://[a-z0-9.-]+\.workers\.dev' | head -1)
[ -n "$url" ] || { echo "Deployed, but no workers.dev URL was printed; copy it from the Cloudflare dashboard."; exit 0; }
sed -i '' "s#^export const FLIGHT_RELAY = .*#export const FLIGHT_RELAY = \"$url\";#" ../trip-planner/src/data/relay.js
echo "Relay URL written to trip-planner/src/data/relay.js: $url"
echo "Next: cd ../trip-planner && npm run build, then commit and push."
