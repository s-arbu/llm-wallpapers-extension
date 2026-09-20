// vite.content.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(import.meta.dirname, 'src/content/content.ts'),
      output: {
        format: 'iife',
        entryFileNames: 'content.js'
      }
    }
  }
});
