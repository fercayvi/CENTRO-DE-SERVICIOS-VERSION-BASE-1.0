import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('dist-public');
const source = path.join(outputDir, 'public.html');
const destination = path.join(outputDir, 'index.html');

if (!existsSync(source)) {
  console.error(`[Public build] No se encontró el HTML generado: ${source}`);
  process.exit(1);
}

copyFileSync(source, destination);
console.log('[Public build] Página de entrada lista: dist-public/index.html');
