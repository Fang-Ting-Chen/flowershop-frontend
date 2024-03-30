import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteImages from 'vite-plugin-vue-images';

/* 自定義函數用來處理資源文件的路徑
const resolveAssetFileName = ({ name, ext, dir }) => {
  if (dir && dir.startsWith('src/assets/images')) {
    return `src/assets/images/${name}${ext}`; // 输出到 images 目录下
  } else if (dir && dir.startsWith('src/assets/css')) {
    return `src/assets/css/${name}${ext}`; // 输出到 css 目录下
  }
  return `assets/${name}${ext}`; // 默认输出到 assets 目录下
}
*/


export default defineConfig({
  base: '/flowershop-frontend/dist/',
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
        assetFileNames: 'src/assets/images/[name].[ext]',
      }
    }
  }

});
