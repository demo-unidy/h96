// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [
      tailwindcss(),
      // Stencil's lazy loader dynamically imports .map source-map files in HMR mode.
      // Return an empty module for them so Vite doesn't error.
      {
        name: 'ignore-stencil-map-imports',
        resolveId(id) {
          if (id.endsWith('.map')) return id;
        },
        load(id) {
          if (id.endsWith('.map')) return 'export default {}';
        },
      },
    ],
    optimizeDeps: {
      exclude: ['@unidy.io/sdk', '@unidy.io/sdk/loader'],
    },
  },
});
