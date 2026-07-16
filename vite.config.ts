import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Deployed as a GitHub Pages *user site* (aaryateja.github.io), so assets are
// served from the domain root — base stays "/".
export default defineConfig({
  base: '/',
  plugins: [react()],
})
