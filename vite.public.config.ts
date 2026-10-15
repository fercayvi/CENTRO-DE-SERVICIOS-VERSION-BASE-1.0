import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Configuración separada: no carga el middleware de escritura del editor privado.
export default defineConfig({
  root: rootDir,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(rootDir, '.') },
  },
  build: {
    outDir: 'dist-public',
    emptyOutDir: true,
    rollupOptions: {
      input: { index: path.resolve(rootDir, 'public.html') },
    },
  },
});
