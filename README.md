# UploadThing — Con Criterio Tools

Demo interactiva de UploadThing como parte de concriterio.tools.

## Qué hace esta demo

1. **Upload con validación en tiempo real:** sube archivos con drag & drop, visualiza restricciones de tipo y tamaño antes de enviar, y observa el progreso del upload.
2. **Galería de archivos subidos:** visualiza los archivos subidos con preview, metadatos (nombre, tipo, tamaño, URL) y opción de copiar enlace directo.
3. **Configurador de File Routes:** cambia restricciones (tipo de archivo, tamaño máximo) en tiempo real y observa cómo UploadThing valida contra esas reglas.

## Stack

- **Astro 6** — Framework base. La demo es mayoritariamente estática con islas React interactivas. Astro permite SSR para las API routes sin el overhead de Next.js.
- **React 19** — Islands de Astro para los componentes interactivos (uploader, galería, configurador).
- **Tailwind CSS 4** — Estilos via plugin Vite (@tailwindcss/vite). Sin @astrojs/tailwind (deprecated).
- **uploadthing 7.7.4** — SDK core + @uploadthing/react para componentes de upload.
- **TypeScript** — Tipado en todo el proyecto.

## Variables de entorno

Ver `.env.example`

## Desarrollo local

```bash
# Requiere Node 22+
npm install
npm run dev
```

Abre http://localhost:4321

## Deploy

Configurado para Vercel. Importar repo, añadir variables de entorno del .env.example, deploy automático.

## Parte de

[concriterio.tools](https://concriterio.tools) — herramientas para builders por [Pol Marza](https://concriterio.blog)
