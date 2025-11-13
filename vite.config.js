import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Ajuste importante para GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})