import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteImages from 'vite-plugin-vue-images';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/flowershop-frontend/',
  plugins: [
    vue(),
    ViteImages({
      dirs: ['src/assets/images'],
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
      
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
