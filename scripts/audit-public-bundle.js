import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('dist-public');
const assetsDir = path.join(outputDir, 'assets');

if (!fs.existsSync(outputDir) || !fs.existsSync(assetsDir)) {
  console.error('[Public audit] No se encontró dist-public/assets. Ejecuta primero el build público.');
  process.exit(1);
}

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

const jsFiles = listFiles(assetsDir).filter((file) => file.endsWith('.js'));
if (jsFiles.length === 0) {
  console.error('[Public audit] No se encontraron archivos JavaScript en dist-public/assets.');
  process.exit(1);
}

const forbiddenMarkers = [
  { label: 'endpoint administrativo de escritura', value: '/__admin/write-data-ts' },
  { label: 'componente del panel administrativo', value: 'AdminPanel' },
  { label: 'trámite oculto politicas_pago', value: 'politicas_pago' },
  { label: 'trámite oculto recibos_cif', value: 'recibos_cif' },
  { label: 'trámite oculto caja_ahorro', value: 'caja_ahorro' },
  { label: 'trámite oculto infonavit', value: 'infonavit' },
];

const findings = [];
for (const file of jsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const marker of forbiddenMarkers) {
    if (content.includes(marker.value)) {
      findings.push({ file: path.relative(outputDir, file), label: marker.label });
    }
  }
}

if (findings.length > 0) {
  console.error('[Public audit] ERROR: se encontraron referencias que requieren revisión en el bundle público:');
  for (const finding of findings) {
    console.error(`  - ${finding.file}: ${finding.label}`);
  }
  console.error('[Public audit] El build no debe considerarse listo hasta revisar estos hallazgos.');
  process.exit(1);
}

console.log(`[Public audit] OK: revisados ${jsFiles.length} archivos JavaScript; no se encontraron los marcadores administrativos ni los IDs de trámites ocultos configurados.`);
