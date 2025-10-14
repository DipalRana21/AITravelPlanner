
import path from "path"
// import tailwindcss from "@tailwindcss/vite"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
        secure: true,
      },
      '/api/places': { // Keep this if you want to re-add Places as "Things to Do" later
        target: 'https://places.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/places/, ''),
        secure: true,
      },
      // --- NEW: Proxy for Ticketmaster Discovery API ---
      '/api/ticketmaster': {
        target: 'https://app.ticketmaster.com', // Base URL for Ticketmaster Discovery API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ticketmaster/, ''), // Rewrites /api/ticketmaster/discovery/v2/... to /discovery/v2/...
        secure: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying Ticketmaster Request:', req.url);
          });
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})


// // vite.config.js
// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       '/api/gemini': {
//         target: 'https://generativelanguage.googleapis.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
//         secure: true,
//       },
//     },
//   },
// });