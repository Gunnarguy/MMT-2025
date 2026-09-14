import { useEffect, useState } from "react";

export default function OfflineAccess() {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [status, setStatus] = useState(() => !("serviceWorker" in navigator) ? "unavailable" : import.meta.env.DEV ? "preview" : "saving");
  const [updateReady, setUpdateReady] = useState(false);
  const [checking, setChecking] = useState(false);

  async function checkOffline() {
    const worker = navigator.serviceWorker?.controller;
    if (!worker) { setStatus(import.meta.env.DEV ? "preview" : "saving"); return; }
    setChecking(true);
    const channel = new MessageChannel();
    const result = await new Promise((resolve) => {
      const timer = setTimeout(() => { channel.port1.close(); resolve(null); }, 8000);
      channel.port1.onmessage = (event) => { clearTimeout(timer); channel.port1.close(); resolve(event.data); };
      worker.postMessage({ type: "OFFLINE_STATUS" }, [channel.port2]);
    });
    setStatus(result?.ready ? "ready" : "unavailable");
    setChecking(false);
  }

  useEffect(() => {
    const supported = "serviceWorker" in navigator;
    let hadController = Boolean(supported && navigator.serviceWorker.controller);
    const onNetwork = () => { setOnline(navigator.onLine); checkOffline(); };
    const onController = () => {
      if (hadController) setUpdateReady(true);
      hadController = true;
      checkOffline();
    };
    const onVisibility = () => { if (document.visibilityState === "visible") checkOffline(); };
    const onFailure = () => setStatus("unavailable");
    if (supported) {
      navigator.serviceWorker.addEventListener("controllerchange", onController);
      navigator.serviceWorker.getRegistration().then(() => checkOffline()).catch(onFailure);
    }
    window.addEventListener("online", onNetwork);
    window.addEventListener("offline", onNetwork);
    window.addEventListener("guide-offline-error", onFailure);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (supported) navigator.serviceWorker.removeEventListener("controllerchange", onController);
      window.removeEventListener("online", onNetwork);
      window.removeEventListener("offline", onNetwork);
      window.removeEventListener("guide-offline-error", onFailure);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  async function prepare() {
    setChecking(true);
    try {
      if (!navigator.serviceWorker?.controller) {
        await navigator.serviceWorker?.register(`${import.meta.env.BASE_URL}sw.js`);
      }
      const registration = await navigator.serviceWorker?.getRegistration();
      if (navigator.onLine) await registration?.update();
      await navigator.storage?.persist?.();
      await checkOffline();
    } catch { setStatus("unavailable"); }
    finally { setChecking(false); }
  }

  const label = updateReady ? "Update ready — reload the guide" : status === "ready"
    ? `${online ? "Saved for offline" : "Offline — saved guide available"}`
    : status === "preview" ? "Local preview — offline saving is available on the published site"
    : status === "unavailable" ? "Offline save not verified — tap to retry"
    : "Saving this guide for offline use…";

  return <details className="offline-access" data-offline={!online}>
    <summary><span role="status">{label}</span></summary>
    <div className="offline-access-body">
      <p><b>Keep the trip on your iPhone:</b> open this site in Safari, tap Share → Add to Home Screen, and choose Open as Web App if shown. Open that new icon while connected and wait for “Saved for offline.”</p>
      <p>The saved guide includes every day, route line, map point and its details, hotels, checklists and border information. Weather keeps its last saved forecast and timestamp. New weather, directions apps, external links, street tiles and satellite imagery need a connection; previously viewed tiles may still be available.</p>
      <p>Device storage can be cleared by iOS or by you. Check this status before losing signal; downloading this region in Apple Maps is useful for offline driving directions.</p>
      <button type="button" disabled={checking || status === "preview"} onClick={prepare}>{checking ? "Checking…" : "Check offline guide"}</button>
      {updateReady && <button type="button" onClick={() => window.location.reload()}>Reload updated guide</button>}
    </div>
  </details>;
}
