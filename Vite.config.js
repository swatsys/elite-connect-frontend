// import { defineConfig } from 'vite';

// export default defineConfig({
//   build: {
//     outDir: 'dist',
//     sourcemap: true
//   },
//   server: {
//     port: 5173
//   }
// });

import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    host: true
  },
  preview: {
    port: 4173,
    strictPort: false,
    host: true
  }
})