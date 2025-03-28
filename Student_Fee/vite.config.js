import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      plugins: [forms, typography, aspectRatio, containerQueries]  // Add plugins here
    })
  ],
  base: './',  // Fix base path for Electron
  build: {
    target: 'esnext',          // Ensure ES module compatibility
    outDir: 'dist',            // Build output directory
    rollupOptions: {
      output: {
        format: 'es',          // Use ES module format
      }}}
});
