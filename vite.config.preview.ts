import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Standalone single-file build used ONLY to generate a shareable static
// preview (e.g. published as an Artifact) — inlines all JS/CSS/assets into
// one index.html so it can be opened with no server at all. Not used for
// the real app build (see vite.config.ts), which stays multi-chunk for
// normal hosting.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  build: {
    outDir: 'dist-preview',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
