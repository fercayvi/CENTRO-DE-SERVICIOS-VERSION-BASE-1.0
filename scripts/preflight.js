import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Códigos de escape ANSI para dar formato y color en la terminal
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dataFilePath = path.resolve(rootDir, 'src/data.ts');
const publicDir = path.resolve(rootDir, 'public');

console.log(`${CYAN}${BOLD}[Preflight]${RESET} Iniciando validación de integridad de archivos de medios...`);

// 1. Verificar existencia del archivo src/data.ts
if (!fs.existsSync(dataFilePath)) {
  console.error(`${RED}${BOLD}Error: No se encontró el archivo fuente ${dataFilePath}${RESET}`);
  process.exit(1);
}

// 2. Leer como texto el archivo src/data.ts
const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

// 3. Expresión regular para extraer rutas locales que comiencen con / y terminen en extensiones de medios
// Filtra URLs remotas al requerir que el / no esté precedido por caracteres de protocolo o dominio
// Incluye formatos comunes y permite query strings o fragmentos al final de la ruta.
const mediaRegex = /(?:^|[^a-zA-Z0-9_:/])(\/[^"'`\r\n<>]+?\.(?:png|jpe?g|pdf|mp4|svg|webp|gif|avif|mov|webm|m4v|ogv|mp3|wav|ogg)(?:[?#][^"'`\r\n<>]*)?)(?=["'`\s<>)]|$)/gi;

const matches = [];
let match;
while ((match = mediaRegex.exec(fileContent)) !== null) {
  matches.push(match[1]);
}

// Obtener rutas únicas
const uniquePaths = [...new Set(matches)];

if (uniquePaths.length === 0) {
  console.log(`${YELLOW}No se encontraron referencias a rutas locales de medios en src/data.ts.${RESET}`);
  console.log(`${GREEN}${BOLD}✔ Validación de preflight finalizada exitosamente.${RESET}`);
  process.exit(0);
}

console.log(`${CYAN}[Preflight]${RESET} Se encontraron ${uniquePaths.length} ruta(s) local(es) de medios en src/data.ts.`);

const missingFiles = [];
const verifiedFiles = [];

for (const relativePath of uniquePaths) {
  // Quitar el '/' inicial y los query strings/fragmentos usados en URLs.
  const cleanPath = relativePath.replace(/^\/+/, '').split(/[?#]/, 1)[0];

  let decodedPath;
  try {
    // Decodificar caracteres de URL (por ejemplo, espacios o acentos).
    decodedPath = decodeURIComponent(cleanPath);
  } catch {
    // Una secuencia % mal formada no debe detener toda la validación.
    missingFiles.push(relativePath);
    continue;
  }

  const targetFullPath = path.resolve(publicDir, decodedPath);
  const relativeToPublic = path.relative(publicDir, targetFullPath);

  // Evitar que una ruta con ../ se valide contra archivos fuera de public/.
  if (relativeToPublic.startsWith('..') || path.isAbsolute(relativeToPublic)) {
    missingFiles.push(relativePath);
    continue;
  }

  // Verificar si existe físicamente dentro de public/.
  if (fs.existsSync(targetFullPath) && fs.statSync(targetFullPath).isFile()) {
    verifiedFiles.push(relativePath);
  } else {
    missingFiles.push(relativePath);
  }
}

// 4. Evaluar si faltan archivos
if (missingFiles.length > 0) {
  console.error(`\n${RED}${BOLD}✖ ERROR DE INTEGRIDAD: Faltan ${missingFiles.length} archivo(s) en la carpeta public/:${RESET}`);
  missingFiles.forEach(file => {
    console.error(`${RED}  - ${file} (No se encontró físicamente en: public/${file.replace(/^\/+/, '')})${RESET}`);
  });
  console.error(`\n${RED}${BOLD}El proceso de build ha sido abortado debido a archivos faltantes.${RESET}\n`);
  process.exit(1);
}

// 5. Si todos los archivos existen, mensaje de éxito
console.log(`\n${GREEN}${BOLD}✔ ÉXITO: Todos los archivos de medios existen físicamente en la carpeta public/:${RESET}`);
verifiedFiles.forEach(file => {
  console.log(`${GREEN}  ✓ ${file}${RESET}`);
});
console.log(`${GREEN}${BOLD}✔ Validación de preflight completada correctamente.${RESET}\n`);
process.exit(0);
