# PRD — UploadThing Demo

## Qué es UploadThing

UploadThing es un servicio de upload de archivos diseñado para aplicaciones TypeScript full-stack. Abstrae la complejidad de S3 (presigned URLs, validación, callbacks) detrás de un sistema de File Routes tipado: defines qué archivos aceptas, qué middleware de auth aplicas, y qué pasa cuando el upload termina. El SDK se encarga del resto.

La arquitectura separa responsabilidades: la autenticación y validación ocurren en tu servidor (tú controlas quién sube y qué), el almacenamiento y CDN lo gestiona UploadThing. El resultado es que no procesas archivos en tu servidor — solo firmas y autorizas.

## Para qué tipo de proyecto sirve

Cualquier aplicación web que necesite uploads de usuario: avatares, documentos, imágenes de producto, adjuntos en formularios. Especialmente útil en stacks TypeScript donde quieres tipado end-to-end entre el file router del servidor y los componentes del cliente. Soporta Next.js, Astro, SvelteKit, Nuxt, SolidStart, Express y Fastify.

## Scope de esta demo

### Qué hace

1. **Upload con validación en tiempo real:** el usuario arrastra o selecciona archivos. Antes de subir, ve las restricciones activas (tipo, tamaño). Durante el upload, ve el progreso. Al terminar, ve la URL del archivo subido.
2. **Galería de archivos subidos:** muestra todos los archivos subidos en la sesión con preview (para imágenes), nombre, tipo MIME, tamaño formateado y URL copiable.
3. **Configurador de File Routes:** el usuario puede cambiar entre configuraciones predefinidas (solo imágenes hasta 4MB, documentos hasta 16MB, cualquier archivo hasta 8MB) y ver cómo el uploader se adapta en tiempo real.

### Qué NO hace

- No implementa autenticación de usuarios. El middleware devuelve un userId fijo para la demo.
- No persiste archivos entre sesiones. La galería es solo de la sesión actual (estado en cliente).
- No implementa borrado de archivos (requiere UTApi con server-side operations fuera del scope).
- No es un tutorial paso a paso — eso va en aprende.concriterio.dev.

## Flujos de usuario

### Flujo 1 — Subir un archivo

El usuario llega a la página principal. Ve un área de drag & drop con las restricciones visibles ("Imágenes hasta 4MB"). Arrastra un archivo o hace clic para seleccionar. Si el archivo no cumple las restricciones, ve un error inmediato en cliente (antes de intentar subir). Si cumple, el upload empieza con barra de progreso. Al terminar, el archivo aparece en la galería inferior con su URL.

### Flujo 2 — Explorar la galería

Debajo del uploader, la galería muestra los archivos subidos en la sesión. Cada entrada tiene: thumbnail (si es imagen) o icono genérico, nombre del archivo, tipo MIME, tamaño, y un botón para copiar la URL del CDN. El usuario puede ver que UploadThing devuelve URLs limpias servidas desde su CDN.

### Flujo 3 — Cambiar configuración del File Route

Una sección "Configurador" permite alternar entre tres presets de File Route. Al cambiar, el uploader se actualiza: muestra las nuevas restricciones y valida contra ellas. Esto demuestra que las File Routes son el concepto central de UploadThing — no es un uploader genérico, es un sistema de rutas tipadas.

## Componentes fijos

- Banner de consultoría: "¿Necesitas ayuda integrando esto en tu proyecto?" → https://cal.com/polmarza/toma-de-contacto (30€/sesión)
- Banner de newsletter: "Cada semana, herramientas como esta en tu bandeja de entrada." → https://concriterio.blog
- Banner de repositorio: "Esta demo está construida con Astro + React + UploadThing. El código es público." → https://github.com/polmarza/uploadthing-concriterio-tools
- Sección de stack al final de la página
