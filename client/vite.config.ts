import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

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