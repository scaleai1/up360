import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Up360 marketing site. Base path matches the GitHub Pages repo name.
export default defineConfig({
  plugins: [react()],
  base: '/up360/',
})
