import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deploys to /MMT-2025/ subdirectory
  base: '/MMT-2025/',
  server: {
    port: 5174,
  },
})
