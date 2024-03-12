import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

const r = (dir: string) => resolve(__dirname, '.', dir)

const alias: Record<string, string> = {
  '@renderer': r('src/renderer')
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8848/api/v1',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
