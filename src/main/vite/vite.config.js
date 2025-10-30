import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import withReactRouter from 'vite-plugin-next-react-router'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // withReactRouter()
  ],
  server: {
    port: 3000
  }
})
