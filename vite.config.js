import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      'vue': 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-bundler.js'
    }
  }
})
