import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';
import { defineConfig, type Plugin } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Elimina del módulo compilado los trámites marcados hidden: true.
 * Se aplica únicamente en la compilación pública; el panel base conserva
 * intacto src/data.ts y sus datos administrativos.
 */
function publicDataSanitizer(): Plugin {
  const dataFile = path.resolve(rootDir, 'src/data.ts');

  return {
    name: 'public-data-sanitizer',
    enforce: 'pre',
    transform(code, id) {
      if (id.split('?')[0] !== dataFile) return null;

      const sourceFile = ts.createSourceFile(
        dataFile,
        code,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
      );

      let removedServices = 0;

      const transformed = ts.transform(sourceFile, [(context) => {
        const visit = (node: ts.Node): ts.Node => {
          if (
            ts.isVariableDeclaration(node) &&
            ts.isIdentifier(node.name) &&
            node.name.text === 'initialServices' &&
            node.initializer &&
            ts.isArrayLiteralExpression(node.initializer)
          ) {
            const visibleServices = node.initializer.elements.filter((element) => {
              if (!ts.isObjectLiteralExpression(element)) return true;

              const isHidden = element.properties.some((property) => {
                if (!ts.isPropertyAssignment(property)) return false;

                const propertyName = property.name;
                const isHiddenKey =
                  (ts.isIdentifier(propertyName) || ts.isStringLiteral(propertyName)) &&
                  propertyName.text === 'hidden';

                return isHiddenKey && property.initializer.kind === ts.SyntaxKind.TrueKeyword;
              });

              if (isHidden) removedServices += 1;
              return !isHidden;
            });

            const publicArray = ts.factory.updateArrayLiteralExpression(
              node.initializer,
              visibleServices,
            );

            return ts.factory.updateVariableDeclaration(
              node,
              node.name,
              node.exclamationToken,
              node.type,
              publicArray,
            );
          }

          return ts.visitEachChild(node, visit, context);
        };

        return (root) => ts.visitNode(root, visit) as ts.SourceFile;
      }]);

      const output = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
        .printFile(transformed.transformed[0] as ts.SourceFile);

      transformed.dispose();
      console.info(
        `[Public data] Se excluyeron ${removedServices} trámite(s) oculto(s) del bundle público.`,
      );

      return { code: output, map: null };
    },
  };
}

// Configuración separada: no carga el middleware de escritura del editor privado.
// Además elimina los registros hidden:true antes de empaquetar los datos públicos.
export default defineConfig({
  root: rootDir,
  plugins: [publicDataSanitizer(), react(), tailwindcss()],
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
