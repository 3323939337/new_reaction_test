import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const START_PORT = Number('0401')
const PUBLIC_HOSTS = (process.env.PUBLIC_HOSTS || '.trycloudflare.com')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean)

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
    port: START_PORT,
    host: '0.0.0.0', // 确保 Vite 可从外部访问
    allowedHosts: PUBLIC_HOSTS
  },
  preview: {
    port: START_PORT
  }
})
