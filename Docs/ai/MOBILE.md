# Mobile and offline verification — September 13–14, 2026

Requested: complete phone access, particularly all map markers, on an iPhone 16
Pro Max. This update preserves the source itinerary, lodging, budget and canonical
road geometry. No backend or accounts were added.

## Result

- Phone section picker exposes all 11 sections without hidden horizontal tabs.
- Shared 44px controls, 16px form text, landscape safe-area padding and no zoom lock.
- Map toolbar outside the canvas; 44px marker targets; accessible marker names;
  popup scroll/close controls; Fit route; every day isolates correctly.
- Expand works on embedded day maps too. The dialog locks/restores background
  scrolling, supports Escape and keyboard focus containment, and respects dynamic
  viewport height. Its additional controls remain scrollable.
- Map point search indexes the actual active Leaflet markers, including all 15
  Scout towns, six Stryker sites, flights, hotels, gas, borders, weather and ferry.
- SkyBridge's five points are tappable with direction links. Elevation's points
  can be selected without hovering. Daylight milestone buttons support keyboards.
- A generated worker saves all output assets before declaring success; offline
  readiness verifies cache contents. PNG Home Screen icons and unrestricted
  orientation replace the portrait-only/data-URI manifest.
- Cache matching for versioned same-origin files ignores Vary because module
  requests can send Origin headers that the initial install fetch didn't send.
  This was necessary to pass an actual server-stopped browser reload.
- Vite preview now uses the production base path, making local release checks
  representative of GitHub Pages.

## Evidence

Observed in the in-app browser, not on a physical iPhone:

- 440×956: all 11 sections and all eight day pages have document width equal to
  viewport width. Thursday has both the canonical map and comparison map.
- 375px and 320px: all sections checked. A 42px border-chip overflow at 320px was
  fixed and rechecked: document and viewport both 320px.
- 956×440: all map toolbar actions fit; expanded Close remains visible; Escape
  exits and restores body scrolling. ResizeObserver updates Leaflet dimensions.
- Activated all layers; searched/opened all 91 map marker popups successfully.
  All five comparison marker popups also opened. Popups may obscure nearby pins;
  close the popup or use the point finder to reach another point.
- Production build first loaded from localhost:4175 and displayed Saved for
  offline. Stopped that server, reloaded the app, navigated to Border and back to
  Map, and opened Brio Beach Inn's saved popup. Internet for third-party services
  remained available during this browser check; the worker tests separately
  reject network fetches for every app asset.
- 13 automated tests pass: eight existing weather tests and five offline worker
  tests. ESLint for src, Vite config and worker passes; production build and
  git diff --check pass. No recent browser errors after disabling Leaflet zoom
  transition animation, which could finish after rapid day-map unmounts.

## Access boundaries

The saved guide includes route lines and marker details. It does not download a
whole street/satellite basemap, provide offline turn-by-turn navigation, refresh
weather without connectivity, or guarantee survival after iOS clears storage.
The disclosure explains this and asks users to open their Home Screen icon online
and wait for the saved status before departure.

References used during implementation:
- https://leafletjs.com/reference.html
- https://operations.osmfoundation.org/policies/tiles/
- https://webkit.org/blog/14403/updates-to-storage-policy/

Deployment must still be verified by successful Actions and the changed served
asset hash; do not infer publication from this document.

## Map readability follow-up — September 13, 2026

The user's phone screenshot showed a confusing field of numbered pins. Replaced
geographic dispersal with Leaflet.markercluster groups labeled by nearby area.
The whole-trip phone overview starts with seven groups covering 54 default points.
Category symbols replace repeating stop numbers, and closer zooms show place
names. All optional layers remain available (91 points with everything enabled).
The native Map day selector sits above the map. Touch-device navigation also uses
the section picker when Safari reports a wide layout viewport.

Search indexes the cluster group's full marker collection, sorts by place name,
and opens the selected popup even for co-located points. Non-animated cluster
zooms can collapse a just-revealed spiderfy during their remaining zoom handlers;
search now reveals the final cluster after that event completes. Marker position
arrays remain stable across zoom renders so React does not re-add unchanged pins.
Circles, route lines and transient vehicle/elevation pointers stay outside the
marker cluster layer container.

Validation: all 91 point popups opened on the first search selection in the phone
layout; Mackinac Straits separated into Mackinac Island and Mackinaw City groups;
Thursday's native day selector isolated its route. Lint, production build and all
13 weather/offline tests pass. The new cluster JS/CSS are included in the verified
worker asset list. No canonical itinerary, lodging, budget or road geometry changed.

With the production preview server stopped, the saved build reloaded, opened
Border and returned to Map, and opened a shared-location Lighthouse View Motel
popup. All eight day selections also had no document overflow at 440×956.
Third-party internet remained available; worker tests independently reject all
network requests for app assets.
