import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port:8080,
    hot: true,  // Enable hot module replacement (HMR)
    watch: {
      usePolling: true,  // Enable polling (useful for WSL, Docker, etc.)
      interval: 1000,    // Check for file changes every second
    },
    hmr: {
      protocol: 'ws',  // Use WebSockets for HMR
      host: 'localhost',  // Host for HMR
      port: 3000,  // Port for HMR (you can change this)
    }
  }
})
