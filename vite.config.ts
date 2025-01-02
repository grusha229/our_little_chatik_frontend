import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:80', // URL бэкенда
            changeOrigin: true, // Изменяет заголовок Origin в запросе
            rewrite: (path) => path.replace(/^\/api^\/v1/, '') // Удаление /api из пути
        }
    }
}
})
