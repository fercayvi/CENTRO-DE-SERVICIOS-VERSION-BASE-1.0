# Entrega técnica — Versión pública del Portal Talento y Cultura

## Estado
- La versión pública vive en la rama `feat/public-portal-v2-foundation`.
- La rama `main` no debe modificarse como parte de esta entrega.
- La aplicación pública usa `public.html`, `src/public-main.tsx`, `src/PublicApp.tsx` y `vite.public.config.ts`.
- La compilación pública excluye los trámites marcados `hidden: true` y sustituye el editor de diagramas por un componente informativo. No monta `AdminPanel`.
- La configuración pública no carga el middleware de escritura administrativa definido en la configuración de desarrollo normal.

## Requisitos
- Node.js 22 recomendado (la validación de GitHub Actions usa Node 22).
- npm.
- Acceso al repositorio y a la rama indicada.

## Validación y compilación
Desde la raíz del repositorio:

```bash
npm ci
npm run lint
npm run build:public
```

La compilación genera el sitio estático en `dist-public/`, incluyendo `dist-public/index.html` y los recursos de `dist-public/assets/`.

Para una prueba local de la compilación:

```bash
npm run preview:public
```

No se debe subir `node_modules/` ni el código fuente administrativo al servidor público. Para el despliegue estático, publicar el contenido generado dentro de `dist-public/` según la configuración de hosting de TI.

## Controles automatizados
El workflow `.github/workflows/public-portal-checks.yml` ejecuta:
1. `npm ci`
2. `npm run lint`
3. `npm run build:public`
4. `npm audit --audit-level=high`

El script `scripts/audit-public-bundle.js` busca marcadores concretos del panel administrativo, del endpoint administrativo y de los IDs de trámites ocultos. Es una comprobación acotada del bundle; no sustituye una auditoría de seguridad completa ni la validación de configuración del servidor.

## Confirmaciones antes de producción
La rama contiene datos de contacto y contenido de prueba que deben ser validados por el área responsable antes de publicar:
- El teléfono/WhatsApp de contacto en `src/data.ts` parece ser un dato de ejemplo.
- El botón del trámite Vacaciones contiene actualmente una URL incompleta (`https://`).

No se debe considerar aprobada la información de negocio solo porque el build pase.

## Despliegue
Este repositorio no queda publicado automáticamente por estas comprobaciones. TI debe definir el hosting, dominio/URL, HTTPS, cabeceras de seguridad, registros y procedimiento de reversión. El puerto de Codespaces usado para previsualizar es solo de prueba y no es el despliegue de producción.
