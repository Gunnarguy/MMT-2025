import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./lib/leafletConfig";
import App from "./App.jsx";

// Register Service Worker for offline PWA resilience
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        console.log("Offline Service Worker active:", reg.scope);
      })
      .catch((err) => {
        console.log("Service Worker registration skipped:", err);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
