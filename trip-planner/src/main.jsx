import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./lib/leafletConfig";
import App from "./App.jsx";

// Register Service Worker for offline PWA resilience
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: "none" })
      .then((reg) => {
        const checkForUpdate = () => {
          if (navigator.onLine && document.visibilityState === "visible") reg.update().catch(() => {});
        };
        window.addEventListener("online", checkForUpdate);
        document.addEventListener("visibilitychange", checkForUpdate);
      })
      .catch((err) => {
        console.warn("Offline saving unavailable:", err.name);
        window.dispatchEvent(new Event("guide-offline-error"));
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
