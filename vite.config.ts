// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(),visualizer()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  test: {
    environment: 'jsdom', 
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
