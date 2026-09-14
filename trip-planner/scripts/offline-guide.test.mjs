import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile, readdir } from 'node:fs/promises';

const base = 'https://example.test/MMT-2025/';
const sw = await readFile(new URL('../dist/sw.js', import.meta.url), 'utf8');
const files = await readdir(new URL('../dist/', import.meta.url), { recursive: true });
const fileAssets = files.filter((f) => /\.(html|js|css|json|png|svg|woff2)$/.test(f) && f !== 'sw.js');
const payloads = new Map(await Promise.all(fileAssets.map(async (f) => [base + f, await readFile(new URL('../dist/' + f, import.meta.url))])));
payloads.set(base, payloads.get(base + 'index.html'));

function harness({ brokenInstall = false } = {}) {
  const handlers = {};
  const stores = new Map();
  let network = true;
  let fetches = 0;
  let claimed = false;
  const keyOf = (r) => typeof r === 'string' ? new URL(r, base).href : r.url;
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return {
        async addAll(requests) {
          const pairs = await Promise.all(requests.map(async (r) => [keyOf(r), await fetcher(r)]));
          pairs.forEach(([k,v]) => { const response = v.clone(); response.savedOrigin = null; store.set(k, response); });
        },
        async match(r, options = {}) {
          const cached = store.get(keyOf(r));
          if (!options.ignoreVary && cached?.headers.get('vary') === 'Origin' && cached.savedOrigin !== (typeof r === 'string' ? null : r.headers?.get('origin') || null)) return undefined;
          return cached?.clone();
        },
        async put(r,v) { store.set(keyOf(r), v.clone()); },
        async keys() { return [...store.keys()].map((key) => new Request(key)); },
        async delete(r) { return store.delete(keyOf(r)); },
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(k) { return stores.delete(k); },
  };
  async function fetcher(r) {
    fetches++;
    if (!network || (brokenInstall && keyOf(r).endsWith('.js'))) throw new Error('Network unavailable');
    const body = payloads.get(keyOf(r));
    if (!body) throw new Error('Unexpected asset: ' + keyOf(r));
    return new Response(body, { status: 200, headers: { date: new Date().toUTCString(), vary: 'Origin' } });
  }
  const self = { registration: { scope: base }, location: new URL(base), clients: { claim: async () => { claimed = true; } }, skipWaiting: async () => {}, addEventListener: (name, fn) => { handlers[name] = fn; } };
  vm.runInNewContext(sw, { self, caches, Request, Response, URL, Date, fetch: fetcher });
  async function event(type, fields = {}) {
    const work = []; let response;
    handlers[type]({ ...fields, waitUntil: (p) => work.push(p), respondWith: (p) => { response = p; } });
    const result = await response;
    await Promise.all(work);
    return result;
  }
  return { event, stores, offline: () => { network = false; }, fetched: () => fetches, claimed: () => claimed };
}

test('first install saves every built chunk and serves every app asset with zero network offline', async () => {
  const h = harness();
  await h.event('install');
  await h.event('activate');
  assert.equal(h.claimed(), true);
  h.offline();
  const before = h.fetched();
  for (const name of fileAssets) {
    const response = await h.event('fetch', { request: new Request(base + name) });
    assert.equal(response.status, 200, name);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), payloads.get(base + name), name);
  }
  assert.equal(h.fetched(), before);
  const page = await h.event('fetch', { request: { method: 'GET', mode: 'navigate', url: base + 'unexpected-path', cache: 'default' } });
  assert.match(await page.text(), /<div id="root">/);
});

test('offline readiness verifies actual cached files and detects a missing chunk', async () => {
  const h = harness(); await h.event('install');
  let status;
  const message = () => h.event('message', { data: { type: 'OFFLINE_STATUS' }, ports: [{ postMessage: (v) => { status = v; } }] });
  await message(); assert.equal(status.ready, true); assert.notEqual(status.revision, 'development');
  const store = [...h.stores.values()][0]; store.delete([...store.keys()].find((k) => /\/assets\/index-.*\.js$/.test(k)));
  await message(); assert.equal(status.ready, false);
});

test('a failed chunk download fails installation, preserving previous and unrelated caches', async () => {
  const h = harness({ brokenInstall: true });
  h.stores.set('mi26-cache-old', new Map()); h.stores.set('other-site-cache', new Map());
  await assert.rejects(h.event('install'), /Network unavailable/);
  assert.equal(h.claimed(), false);
  assert.equal(h.stores.has('mi26-cache-old'), true);
  assert.equal(h.stores.has('other-site-cache'), true);
});

test('activation deletes only outdated guide shells; weather always bypasses the worker', async () => {
  const h = harness(); h.stores.set('mi26-cache-old', new Map()); h.stores.set('other-site-cache', new Map());
  await h.event('install'); await h.event('activate');
  assert.equal(h.stores.has('mi26-cache-old'), false); assert.equal(h.stores.has('other-site-cache'), true);
  for (const url of ['https://api.open-meteo.com/v1/forecast','https://api.weather.gov/points/44,-85']) {
    assert.equal(await h.event('fetch', { request: new Request(url) }), undefined);
  }
});

test('module requests with Origin headers still find the complete offline shell', async () => {
  const h = harness(); await h.event('install'); h.offline();
  const js = fileAssets.find((f) => /assets\/index-.*\.js$/.test(f));
  const response = await h.event('fetch', { request: new Request(base + js, { headers: { Origin: 'https://example.test' } }) });
  assert.equal(response.status, 200);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), payloads.get(base + js));
});
