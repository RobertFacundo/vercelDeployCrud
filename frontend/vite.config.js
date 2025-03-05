import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
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
