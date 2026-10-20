import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Configuración separada: no carga el middleware de escritura del editor privado.
// En el portal público, sustituye el editor pesado por un aviso de solo lectura.
export default defineConfig({
  root: rootDir,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(rootDir, '.') },
      {
        find: /^\.\/DecisionTreeCanvasEditor$/,
        replacement: path.resolve(rootDir, 'src/components/PublicDecisionTreeEditorStub.tsx'),
      },
    ],
  },
  build: {
    outDir: 'dist-public',
    emptyOutDir: true,
    rollupOptions: {
      input: { index: path.resolve(rootDir, 'public.html') },
    },
  },
});
