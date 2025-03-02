import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add aliases for your project structure
      '@': path.resolve(__dirname, './src'),
      '@application': path.resolve(__dirname, './src/application'),
      '@components': path.resolve(__dirname, './src/application/components'),
      '@styles': path.resolve(__dirname, './src/application/styles'),
      '@pages': path.resolve(__dirname, './src/application/pages'),
    },
  },
  // Configure for Electron if needed
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
