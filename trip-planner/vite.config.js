import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use root for dev, and relative paths for production so it works on GitHub Pages AND locally.
  base: command === "serve" ? "/" : "./",
  server: {
    port: 5174,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // Keep common heavy deps in their own chunks to reduce the main bundle size.
          if (id.includes("/react-dom/")) return "react-dom";
          if (id.includes("/react/")) return "react";

          if (id.includes("/leaflet/")) return "leaflet";
          if (id.includes("/react-leaflet/")) return "react-leaflet";

          if (id.includes("/@dnd-kit/")) return "dnd-kit";
          if (id.includes("/@supabase/")) return "supabase";

          return "vendor";
        },
      },
    },
  },
}));
