import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base` is set to "/<repo>/" in CI (see .github/workflows/deploy.yml) so assets
// resolve correctly under GitHub Pages project sites. Defaults to "/" for local dev.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
