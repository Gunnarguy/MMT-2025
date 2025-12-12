import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages deploys to /MMT-2025/ subdirectory, but local dev should be root.
  base: command === 'serve' ? '/' : '/MMT-2025/',
  server: {
    port: 5174,
  },
}))
