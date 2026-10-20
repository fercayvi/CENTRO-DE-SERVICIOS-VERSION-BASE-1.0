# Operación del portal: editar, validar y publicar

## Objetivo

Permitir que el encargado actualice contenido desde la versión administrador y que los cambios lleguen a la versión pública mediante un paquete validado, sin modificar `main` ni publicar directamente desde Codespaces.

## Flujo acordado

1. **Abrir un Codespace de trabajo** basado en `feat/public-portal-v2-foundation`. Para cada lote de cambios, crear una rama `content/descripcion-corta` desde esa rama base. No trabajar en `main`.
2. **Editar en la versión administrador** y guardar los cambios normales del panel.
3. **Persistir el catálogo en el repositorio**: abrir la sección de sincronización del panel y pulsar **Actualizar src/data.ts**. Ese botón escribe el catálogo generado en el archivo `src/data.ts` del workspace de Codespaces; no lo publica en internet ni lo guarda por sí solo en GitHub.
4. **Revisar los cambios** en Source Control / diff. Confirmar que solo estén los archivos esperados, revisar textos, enlaces, teléfonos e imágenes. Las imágenes nuevas deben agregarse a `public/` y referenciarse con su ruta pública.
5. **Crear un commit en la rama `content/*` y abrir un Pull Request** cuyo destino sea `feat/public-portal-v2-foundation`. No usar `main` como destino.
6. **Esperar los controles automáticos**. El workflow ejecuta TypeScript, build público, auditoría de dependencias y genera el artefacto `portal-publico`. Si falla, no publicar.
7. **Revisar la versión compilada** y obtener aprobación del responsable de contenido. Cuando se apruebe el PR, integrar el cambio en `feat/public-portal-v2-foundation`; esa actualización genera un nuevo artefacto.
8. **Entrega a TI**: descargar el artefacto `portal-publico` de la ejecución exitosa más reciente y desplegar el contenido de su carpeta en el hosting aprobado. TI debe validar la URL final y conservar el paquete anterior para rollback.

## Qué guarda y qué no guarda el botón

- Los cambios del panel se mantienen temporalmente en el navegador mientras se edita.
- **Actualizar src/data.ts** los escribe en el workspace de Codespaces.
- Un commit es lo que persiste esos cambios en GitHub.
- El workflow construye y empaqueta el sitio público; no despliega automáticamente a producción.
- El portal público estático no puede guardar cambios administrativos en un servidor. No usar el sitio público ni un Codespace compartido como CMS de producción.

## Reglas de seguridad

- Nunca editar ni desplegar directamente desde `main`.
- No compartir el enlace del Codespace como portal de producción ni hacerlo público.
- No poner tokens, contraseñas ni secretos en el código.
- Revisar el diff antes de confirmar cambios.
- Validar enlaces de trámites, teléfonos, horarios, archivos y contenido antes de aprobar.
- El filtro de trámites ocultos y la auditoría del bundle son controles acotados; no equivalen a una auditoría de seguridad completa.
- El repositorio actual es público y contiene código fuente de la versión administrador. No guardar secretos ni información confidencial en él. Antes de una operación real con usuarios de Ayvi, TI debe definir si el código administrativo debe trasladarse a un repositorio privado separado.

## Pendiente para automatizar el último paso

La publicación a producción no está configurada porque aún no se ha definido el hosting, el dominio ni las credenciales/identidad de despliegue aprobadas por TI. No se debe inventar ni añadir un destino de publicación sin esa decisión.
