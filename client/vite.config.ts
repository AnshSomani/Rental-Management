import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇 ADD THIS BLOCK BACK
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Make sure this is the correct port!
        changeOrigin: true,
      },
    },
  },
})