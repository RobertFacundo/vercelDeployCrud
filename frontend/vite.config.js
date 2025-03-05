import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',  // Ruta relativa al archivo 'index.html' ahora que está en la raíz
    },
  },
  plugins: [react()],
  server: {
    port: 3001,
  },
  test: {
    reporters: ['verbose'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js'
  },
})
