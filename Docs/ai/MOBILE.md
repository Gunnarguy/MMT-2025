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

## Compact labels and every-spot mode — September 13, 2026

The next user screenshot showed multi-line labels cropped by the map edges in
Ludington. Labels now use intrinsic single-line widths, 10px type, short display
names and a screen-space placement pass. Full names remain in accessible marker
names, search and popups. Labels avoid each other and zoom controls when space
permits; longer offsets have leader lines to unchanged geographic pin positions.
ResizeObserver reruns placement after React renders tooltip text or fonts resize.
Groups are 112×44 instead of 140×54, open with padded bounds, and retain 44px
minimum targets. Every spot removes clustering; at regional zoom every marker is
rendered and names appear on closer zoom. Fit all spots includes every point in
the active layers, including optional flight and Scout overlays. Coincident pins
can still overlap; the searchable list exposes each individually.

Browser checks: all 91 points opened from search in both modes (182 selections).
Every spot plus Fit all spots produced 91 marker icons, zero groups, and 91 list
entries. Ludington's five compact labels were measured without overlap after
font/content sizing. Two pure layout tests cover nearby pins, canvas edges and
zoom-control obstacles; they run with the existing 13 weather/offline tests in CI.

### Fuel corrections

Fuel is a planning aid, not vehicle telemetry. Removed exact projected tank
percentages, mandatory-stop/stranding claims, guaranteed savings and the fixed
$9.99 Budget fee from the map, fuel planner, dispatch, border guidance and calendar
export. The rental agreement governs the chosen fuel option. The Ontario
calculator now labels its initial value and exchange rate as planning examples.

- Ludington: retained Meijer Express at 3960 W US-10; corrected the approximate
  pin to 43.9569,-86.37854. Store campus uses 3900; the gas forecourt uses 3960.
  https://www.meijer.com/shopping/store-locator/193.html
  https://mapcarta.com/N7914889369
  https://www.loc8nearme.com/michigan/ludington/meijer-gas-station/2267104/
- Mackinaw City: Marathon, 308 S Nicolet, supported by the highway-logo listing.
  https://michigan.view.interstatelogos.com/I-75-N/8297/48757/
- Port Huron: corrected the mixed Speedway/Mobil entry and 2607 address to
  Speedway, 2621 Pine Grove Ave; pin 43.0018822,-82.4396813 from Maps.
  https://careers.7-eleven.com/location/port-huron-jobs/7/6252001-5001836-5006233/4
- Southwest Michigan: could not substantiate the New Buffalo Pilot/address.
  Replaced it with TA/BP Sawyer, 6100 Sawyer Rd, I-94 Exit 12. Official map link
  gives 41.8845,-86.6001. This is a suggested stop on the existing return route.
  https://www.ta-petro.com/location/mi/ta-sawyer/
- O'Hare: could not substantiate the BP/Shell at 10250 W Higgins. Replaced it
  with Shell, 600 E Touhy Ave, Des Plaines; official page gives 42.009182,-87.908429.
  https://find.shell.com/us/fuel/10008894-600-e-touhy-ave/en_US
- Rental policy: https://www.budget.com/en/offers/us-offers/fuel-plans

Listings were checked September 13; no guarantee of live hours, fuel availability
or prices. Route geometry and author-authored itinerary text remain unchanged.

### Complete map point details (September 13, 2026)

- Route markers keep the full stop record, including time/duration, hours, prices,
  address, contact/actions, description, tips, and research source. Hotel markers
  join LODGING by property name and expose check-in/out, total recorded rate,
  missing confirmation status, property notes, and occupancy/breakfast caveats.
- The two older sleep-stop entries explicitly refer to the lodging record:
  Bayshore differs from Brio; Belleville is a provisional backup. The authored
  itinerary is preserved and the discrepancy is visible.
- Airport/rental markers reuse logistics data; flights read the same device-saved
  flight records as Car & flights. Scout markers include expandable town workups.
  Border/island points expose their day stops; the comparison map includes full
  SkyBridge visiting/weather information and coastal town stops/stays.
- Popup bodies scroll independently, capped at 360px or 48dvh, including nested
  content that mounts after Leaflet first measures the popup. Main map labels
  stay small; detail text stays readable. Independent markers in Every spot use
  a plain feature group, avoiding cluster-tree state when changing display modes.
- Checked all 91 active-layer point selections in Nearby groups and Every spot;
  all 91 marker elements fit inside the all-points canvas. Production preview
  tested at phone widths (440 and 348 CSS pixels), plus 956×440 landscape with
  no page overflow. Production Summer's Inn popup exposes all saved notes inside
  a 360px scroll region. SkyBridge and Charlevoix comparison details verified.
- ESLint passes for changed JS/JSX; production build and 18 tests pass, including
  rendering every stop, every lodging record and every town workup against its
  source data, plus weather refresh and complete offline asset-cache checks.
- These are saved guide details, not a claim that every venue's current hours,
  prices, or booking status was freshly reverified. The Summer's Inn official
  website fetch timed out during this pass; its policy notes remain labeled as
  saved research, with a call link for current confirmation.
