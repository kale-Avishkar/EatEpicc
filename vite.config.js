import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    /*
      Manual chunk splitting — prevents one giant bundle.
      Framer Motion + React vendor are separated so the browser
      can cache them independently between deploys.
    */
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion';
          }
          if (id.includes('node_modules/lenis')) {
            return 'scroll';
          }
        },
      },
    },
    /* Inline assets smaller than 4kb to save HTTP round-trips */
    assetsInlineLimit: 4096,
    /* Enable CSS code splitting per chunk */
    cssCodeSplit: true,
    /* Target modern browsers — smaller, faster output */
    target: 'es2020',
  },
  /*
    Dev server: force full page reload instead of partial HMR
    for CSS changes (avoids stale style state during development)
  */
  css: {
    devSourcemap: true,
  },
})
