// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://gloeff.github.io',
  base: '/portfolio',
  integrations: [react(), mdx()],
  build: {
    // Inline small CSS to reduce requests
    inlineStylesheets: 'auto'
  },
  // Compress HTML output
  compressHTML: true,
  // Vite-specific optimizations
  vite: {
    build: {
      // Split CSS into smaller chunks
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[hash][extname]',
          chunkFileNames: 'chunks/[hash].js',
          entryFileNames: 'entry/[hash].js',
        }
      },
      // Optimize chunk size
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  },
  // Prefetch links for faster navigation
  prefetch: {
    prefetchAll: true
  }
});