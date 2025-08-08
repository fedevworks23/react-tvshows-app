import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/react-tvshows-app/',
  // server: {
  //   port: 3000,
  //   open: true,
  //   host: '' // Set to true to allow access from other devices on the network
  // },
  // build: {
  //   outDir: 'build',
  //   sourcemap: true,
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: 'assets/[name].js',
  //       chunkFileNames: 'assets/[name].js',
  //       assetFileNames: 'assets/[name].[ext]'
  //     }
  //   }
  // },
})
