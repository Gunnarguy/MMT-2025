import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Root during `vite dev`; the repo path once it's on GitHub Pages.
  base: command === "serve" ? "/" : "/MMT-2025/",
  server: {
    port: 5174,
  },
  build: {
    rollupOptions: {
      output: {
        // Leaflet is only needed on the Map tab, so it gets its own chunk.
        // React and its whole runtime stay together: splitting react from
        // react-dom or scheduler just creates circular chunk references.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/node_modules\/(@react-)?leaflet/.test(id)) return "leaflet";
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
          return "vendor";
        },
      },
    },
  },
}));
