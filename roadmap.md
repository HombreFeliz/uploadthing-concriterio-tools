# Roadmap — UploadThing Demo

## v1 (demo)

Lo que Claude Code debe construir ahora:

- Página única con tres secciones interactivas: uploader, galería, configurador de presets.
- API route `/api/uploadthing` con tres File Routes predefinidas (imágenes, documentos, cualquier archivo).
- Componente de upload con drag & drop, validación cliente, barra de progreso y callback de completado.
- Galería en memoria (estado React) que muestra archivos subidos con preview, metadatos y botón copiar URL.
- Configurador que alterna entre los tres presets y actualiza el uploader en tiempo real.
- Banners fijos: consultoría (30€), newsletter, repositorio.
- Sección de stack al final.
- SSR del router config para evitar loading state inicial.
- Deploy funcional en Vercel.

## v2 (mejoras posibles)

Solo si la demo tiene tracción:

- Añadir ejemplo de upload server-side con UTApi (mostrar el flujo inverso: subir desde servidor).
- Añadir visualización del webhook/callback con un log en tiempo real de los eventos que UploadThing envía.
- Drag & drop multi-archivo con progreso individual por archivo.
