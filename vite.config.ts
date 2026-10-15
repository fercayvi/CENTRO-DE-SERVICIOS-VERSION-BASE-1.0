import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { writeFile } from 'node:fs/promises';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'codespaces-data-ts-writer',
        configureServer(server) {
          server.middlewares.use('/__admin/write-data-ts', (req, res) => {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');

            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Método no permitido.' }));
              return;
            }

            const origin = req.headers.origin;
            const requestHost = req.headers.host;
            let originHost = '';
            try {
              originHost = origin ? new URL(origin).host : '';
            } catch {
              originHost = '';
            }

            // Prevent cross-origin sites from writing to the Codespaces workspace.
            if (!requestHost || originHost !== requestHost) {
              res.statusCode = 403;
              res.end(JSON.stringify({ error: 'Origen no autorizado.' }));
              return;
            }

            let body = '';
            let tooLarge = false;
            req.on('data', (chunk) => {
              body += chunk.toString();
              if (body.length > 2_000_000) {
                tooLarge = true;
                res.statusCode = 413;
                res.end(JSON.stringify({ error: 'El archivo generado supera el tamaño permitido.' }));
                req.destroy();
              }
            });

            req.on('end', async () => {
              if (tooLarge || res.writableEnded) return;

              try {
                const payload = JSON.parse(body) as { content?: unknown };
                const content = payload.content;
                const expectedImport = "import { ServiceId, Service, FAQ, NewsItem, Aviso, MonthlyRecognition, ContactInfo, CategoryConfig, SiteSettings } from './types';";

                if (
                  typeof content !== 'string' ||
                  content.length > 1_500_000 ||
                  !content.startsWith(expectedImport) ||
                  !content.includes('export const initialServices: Service[] = ') ||
                  !content.includes('export const initialNews: NewsItem[] = ') ||
                  !content.includes('export const faqsData: FAQ[] = ')
                ) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'El contenido no coincide con el formato esperado de src/data.ts.' }));
                  return;
                }

                await writeFile(path.resolve(__dirname, 'src/data.ts'), content, 'utf8');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, message: 'src/data.ts actualizado.' }));
              } catch (error) {
                console.error('No se pudo actualizar src/data.ts desde el panel:', error);
                if (!res.writableEnded) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'No se pudo procesar o escribir src/data.ts.' }));
                }
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
