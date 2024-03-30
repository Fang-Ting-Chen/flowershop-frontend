import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteImages from 'vite-plugin-vue-images';

// 自定義函數用來處理資源文件的路徑
/*
const resolveAssetFileName = ({ name, ext, dir }) => {
  if (dir && dir.startsWith('src/assets/')) {
    return `src/assets/${name}${ext}`;
  }
  return `src/assets/${name}${ext}`;
};
*/



// https://vitejs.dev/config/
export default defineConfig({
  base: '/flowershop-frontend/',
  plugins: [
    vue(),
    ViteImages({
      dirs: ['src/assets/images', 'src/assets/css'],
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    }
  }

});
