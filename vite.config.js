import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'my-custom-element'
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0', // 确保 Vite 可从外部访问
    allowedHosts: ['a3e70792d398.ngrok-free.app']
  }
})
