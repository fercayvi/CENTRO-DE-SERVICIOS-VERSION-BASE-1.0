import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as ts from 'typescript';
import {defineConfig} from 'vite';

const execFileAsync = promisify(execFile);

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'codespaces-media-uploader',
        configureServer(server) {
          server.middlewares.use('/__admin/upload-media', (req, res) => {
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

            if (!requestHost || originHost !== requestHost) {
              res.statusCode = 403;
              res.end(JSON.stringify({ error: 'Origen no autorizado.' }));
              return;
            }

            const allowedExtensions: Record<string, string[]> = {
              image: ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'],
              video: ['.mp4', '.webm', '.mov'],
              pdf: ['.pdf'],
            };
            const fileType = String(req.headers['x-file-type'] || '');
            let originalName = '';
            try {
              originalName = decodeURIComponent(String(req.headers['x-file-name'] || ''));
            } catch {
              originalName = '';
            }
            const extension = path.extname(originalName).toLowerCase();
            const baseName = path.basename(originalName, path.extname(originalName))
              .normalize('NFKD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-zA-Z0-9_-]+/g, '-')
              .replace(/^-+|-+$/g, '')
              .slice(0, 70);

            if (!allowedExtensions[fileType]?.includes(extension) || !baseName) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Formato no permitido. Imágenes: PNG/JPG/WEBP/GIF/AVIF; videos: MP4/WEBM/MOV; documentos: PDF.' }));
              return;
            }

            const chunks: Buffer[] = [];
            let totalBytes = 0;
            let tooLarge = false;
            const maxBytes = 25 * 1024 * 1024;

            req.on('data', (chunk: Buffer | string) => {
              const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
              totalBytes += buffer.length;
              if (totalBytes > maxBytes) {
                tooLarge = true;
                res.statusCode = 413;
                res.end(JSON.stringify({ error: 'El archivo supera el límite de 25 MB.' }));
                req.destroy();
                return;
              }
              chunks.push(buffer);
            });

            req.on('end', async () => {
              if (tooLarge || res.writableEnded) return;
              try {
                if (totalBytes === 0) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'El archivo está vacío.' }));
                  return;
                }

                const uniqueName = `${Date.now()}-${baseName}${extension}`;
                const publicDirectory = path.resolve(__dirname, 'public');
                const destination = path.resolve(publicDirectory, uniqueName);
                if (!destination.startsWith(publicDirectory + path.sep)) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Nombre de archivo no válido.' }));
                  return;
                }

                await mkdir(publicDirectory, { recursive: true });
                await writeFile(destination, Buffer.concat(chunks), { flag: 'wx' });
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, path: `/${uniqueName}` }));
              } catch (error) {
                console.error('No se pudo guardar el archivo multimedia:', error);
                if (!res.writableEnded) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'No se pudo guardar el archivo en public/.' }));
                }
              }
            });
          });
        },
      },
      {
        name: 'codespaces-git-publisher',
        configureServer(server) {
          server.middlewares.use('/__admin/publish-git', async (req, res) => {
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

            if (!requestHost || originHost !== requestHost) {
              res.statusCode = 403;
              res.end(JSON.stringify({ error: 'Origen no autorizado.' }));
              return;
            }

            const repoRoot = path.resolve(__dirname);
            const runGit = async (args: string[]) => execFileAsync('git', args, {
              cwd: repoRoot,
              windowsHide: true,
              timeout: 120000,
              maxBuffer: 1024 * 1024,
            });
            const getStagedPaths = async () => {
              const { stdout } = await runGit(['diff', '--cached', '--name-only']);
              return stdout.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
            };
            const isAllowedPath = (item: string) => item === 'src/data.ts' || item.startsWith('public/');

            try {
              // Do not accidentally include unrelated files already staged by the developer.
              const stagedBefore = await getStagedPaths();
              const unexpectedBefore = stagedBefore.filter((item) => !isAllowedPath(item));
              if (unexpectedBefore.length > 0) {
                res.statusCode = 409;
                res.end(JSON.stringify({
                  error: 'No se publicó porque hay otros archivos preparados en Git. Revisa el área de preparación y vuelve a intentarlo.',
                  details: unexpectedBefore.slice(0, 10),
                }));
                return;
              }

              // Fixed arguments only; no shell and no user-provided command strings.
              await runGit(['add', '--', 'src/data.ts', 'public/']);

              const stagedPaths = await getStagedPaths();
              const unexpectedAfter = stagedPaths.filter((item) => !isAllowedPath(item));
              if (unexpectedAfter.length > 0) {
                res.statusCode = 409;
                res.end(JSON.stringify({
                  error: 'Se detectaron archivos fuera del alcance permitido. No se creó ningún commit.',
                  details: unexpectedAfter.slice(0, 10),
                }));
                return;
              }

              if (stagedPaths.length === 0) {
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  noChanges: true,
                  message: 'No hay cambios nuevos para publicar.',
                }));
                return;
              }

              await runGit(['commit', '-m', 'Actualiza tarjeta']);
              await runGit(['push', 'origin', 'main']);

              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                noChanges: false,
                message: 'Cambios guardados y enviados a GitHub. La versión pública se actualizará mediante GitHub Actions.',
              }));
            } catch (error) {
              const details = error && typeof error === 'object' && 'stderr' in error
                ? String((error as { stderr?: unknown }).stderr || '')
                : '';
              const message = error instanceof Error ? error.message : String(error);
              console.error('Falló la publicación automática en GitHub:', message, details);
              if (!res.writableEnded) {
                res.statusCode = 500;
                res.end(JSON.stringify({
                  error: 'No se pudieron publicar los cambios en GitHub. Revisa la configuración de Git, las credenciales y la conexión.',
                  details: (details || message).slice(0, 1000),
                }));
              }
            }
          });
        },
      },
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

                const requiredDeclarations = [
                  'export const siteSettings: SiteSettings = ',
                  'export const defaultCategories: CategoryConfig[] = ',
                  'export const initialContact: ContactInfo = ',
                  'export const initialRecognitions: MonthlyRecognition[] = ',
                  'export const initialServices: Service[] = ',
                  'export const initialNews: NewsItem[] = ',
                  'export const avisosData: Aviso[] = ',
                  'export const faqsData: FAQ[] = ',
                  'export function getDefaultServiceDetails(service: Service)',
                ];

                if (
                  !payload ||
                  typeof payload !== 'object' ||
                  typeof content !== 'string' ||
                  content.length > 1_500_000 ||
                  !content.startsWith(expectedImport) ||
                  !requiredDeclarations.every((declaration) => content.includes(declaration))
                ) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'El contenido no coincide con el formato esperado de src/data.ts.' }));
                  return;
                }

                // Parse the generated TypeScript before touching the repository source file.
                // This catches malformed/truncated output without executing the submitted code.
                const parseResult = ts.transpileModule(content, {
                  compilerOptions: {
                    target: ts.ScriptTarget.Latest,
                    module: ts.ModuleKind.ESNext
                  },
                  reportDiagnostics: true
                });

                if ((parseResult.diagnostics ?? []).some(
                  (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
                )) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'El contenido generado contiene errores de sintaxis TypeScript.' }));
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
