// The build fills in a content revision and every output asset. A successful
// install means the complete application is available, including map code/data.
const REVISION = "development";
const CACHE_NAME = `mi26-cache-${REVISION}`;
const RUNTIME_CACHE = "mi26-viewed-assets-v1";
const PRECACHE_ASSETS = ["./", "./index.html", "./manifest.json"];
const scopeURL = (path) => new URL(path, self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(PRECACHE_ASSETS.map((path) => new Request(scopeURL(path), { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("mi26-cache-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "OFFLINE_STATUS") return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const present = await Promise.all(PRECACHE_ASSETS.map((path) => cache.match(scopeURL(path))));
    event.ports[0]?.postMessage({ ready: present.every(Boolean), revision: REVISION, assets: present.filter(Boolean).length });
  })());
});

async function viewedAsset(request, event) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  // Respect a longer server max-age and retain viewed OSM tiles for at least
  // seven days. Only requested tiles are saved: no area download or prefetch.
  const date = Date.parse(cached?.headers.get("date") || "");
  const maxAge = Number(cached?.headers.get("cache-control")?.match(/max-age=(\d+)/)?.[1] || 0);
  if (cached && Date.now() - date < Math.max(604800, maxAge) * 1000) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil((async () => {
        await cache.put(request, copy);
        const keys = await cache.keys();
        await Promise.all(keys.slice(0, Math.max(0, keys.length - 256)).map((key) => cache.delete(key)));
      })().catch(() => {}));
    }
    return response.ok ? response : cached || response;
  } catch {
    return cached || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  // Weather owns its own explicitly dated fallback. Never fake a fresh refresh.
  if (event.request.cache === "no-store" || url.hostname === "api.open-meteo.com" || url.hostname === "api.weather.gov") return;
  if (url.origin === self.location.origin && url.href.startsWith(self.registration.scope)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      // These versioned same-origin files do not vary by Origin. A module
      // script can send an Origin header that the install fetch did not send.
      const cached = await cache.match(event.request, { ignoreSearch: true, ignoreVary: true });
      if (cached) return cached;
      if (event.request.mode === "navigate") return (await cache.match(scopeURL("./index.html"))) || fetch(event.request);
      return fetch(event.request);
    })());
    return;
  }
  if (["tile.openstreetmap.org", "server.arcgisonline.com", "fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname)) {
    event.respondWith(viewedAsset(event.request, event));
  }
});
