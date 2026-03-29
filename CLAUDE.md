# UploadThing — Instrucciones para Claude Code

## Qué es esto

Demo interactiva de UploadThing para concriterio.tools.
Lee docs/prd.md para el scope completo antes de empezar.

## Stack

- **Astro 6.1.x** (requiere Node 22+) — framework base con output `server`
- **React 19** vía `@astrojs/react` 5.0.x — islands para componentes interactivos
- **Tailwind CSS 4** vía `@tailwindcss/vite` — NO usar `@astrojs/tailwind` (está deprecated). Instalar `tailwindcss` y `@tailwindcss/vite`, añadir el plugin en `vite.plugins` del config de Astro
- **uploadthing 7.7.x** — SDK core del servidor
- **@uploadthing/react 7.3.x** — componentes y hooks React para el cliente
- **@astrojs/vercel** — adapter de deploy
- **lucide-react** — iconos

### Instalación

```bash
npm create astro@latest -- --template minimal
npm install uploadthing @uploadthing/react react react-dom @astrojs/react @astrojs/vercel lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

### Configuración Astro

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Configuración Tailwind

Crear `src/styles/global.css`:
```css
@import "tailwindcss";
```

Importar en el layout base:
```astro
---
import "../styles/global.css";
---
```

## Lo que debes construir

### 1. File Router del servidor (`src/server/uploadthing.ts`)

Tres File Routes predefinidas:

```typescript
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async () => {
      return { userId: "demo-user" }; // Sin auth real en la demo
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, name: file.name };
    }),

  documentUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 2 },
    "text/plain": { maxFileSize: "1MB", maxFileCount: 2 },
  })
    .middleware(async () => ({ userId: "demo-user" }))
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, name: file.name };
    }),

  generalUploader: f({ blob: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => ({ userId: "demo-user" }))
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
```

### 2. API Route (`src/pages/api/uploadthing.ts`)

```typescript
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "../../server/uploadthing";

const handler = createRouteHandler({ router: uploadRouter });

export const GET = handler;
export const POST = handler;
```

### 3. Componente UploadZone (`src/components/UploadZone.tsx`)

- Recibe como prop qué endpoint usar (imageUploader | documentUploader | generalUploader)
- Usa `useUploadThing()` del SDK para control total (NO el componente `<UploadButton>` prefab)
- Implementa drag & drop custom con los estilos del design system
- Muestra restricciones activas extraídas del endpoint seleccionado
- Barra de progreso durante upload
- Callback `onClientUploadComplete` que pasa los archivos al componente padre

### 4. Componente FileGallery (`src/components/FileGallery.tsx`)

- Recibe array de archivos subidos como prop
- Para imágenes: muestra thumbnail con la URL del CDN de UploadThing
- Para otros archivos: icono genérico según tipo MIME
- Muestra nombre (truncado), tipo MIME en mono, tamaño formateado
- Botón copiar URL al clipboard con feedback visual

### 5. Componente RouteConfigurator (`src/components/RouteConfigurator.tsx`)

- Tres tabs/pills: "Imágenes", "Documentos", "General"
- Al seleccionar, actualiza el endpoint activo en el componente padre
- Muestra descripción de las restricciones del preset seleccionado

### 6. SSR del Router Config

En el layout o página principal de Astro, inyectar el config para evitar loading state:

```astro
---
import { extractRouterConfig } from "uploadthing/server";
import { uploadRouter } from "../server/uploadthing";

const routerConfig = extractRouterConfig(uploadRouter);
(globalThis as any).__UPLOADTHING ??= routerConfig;
---
<script define:vars={{ routerConfig }} is:inline>
  globalThis.__UPLOADTHING ??= routerConfig;
</script>
```

### 7. Página principal (`src/pages/index.astro`)

Estructura de la página:
1. Header con título "UploadThing" y subtítulo breve
2. Sección explicativa: qué es y por qué importa (2-3 párrafos cortos)
3. RouteConfigurator (React island con `client:load`)
4. UploadZone (React island con `client:load`) — cambia según el preset seleccionado
5. FileGallery (React island con `client:load`) — muestra archivos de la sesión
6. Sección de stack
7. Banners (consultoría, newsletter, repositorio)

El estado compartido (preset activo + archivos subidos) se gestiona en un componente React wrapper que contiene los tres islands. Este wrapper se monta como un solo island en Astro.

### 8. Componentes Astro estáticos

- `Banners.astro` — los tres banners fijos
- `StackSection.astro` — lista de tecnologías usadas con justificación
- `Layout.astro` — HTML base, meta tags, fuentes Google, import del CSS global

## Componentes fijos (obligatorios)

- Banner consultoría: "¿Necesitas ayuda integrando esto en tu proyecto?" → https://cal.com/polmarza/toma-de-contacto (30€/sesión)
- Banner newsletter: "Cada semana, herramientas como esta en tu bandeja de entrada." → https://concriterio.blog
- Banner repositorio: "Esta demo está construida con Astro + React + UploadThing. El código es público." → https://github.com/polmarza/uploadthing-concriterio-tools
- Sección de stack al final de la página

## Sistema de diseño

Lee docs/design-system.md para todos los detalles. Resumen rápido:

```
Primary:     #7665FF
Background:  #0a0a0a
Surface:     #111111
Border:      #1e1e1e
Text:        #e2e2e2
Text muted:  #666666
Success:     #4ade80
Error:       #f87171
```

Fuentes: Fraunces (headings), Outfit (body), Space Mono (código/datos técnicos).
Dark mode por defecto. Border-radius 8-12px. Max-width 800px centrado.

## Variables de entorno

Todas definidas en `.env.example`. Solo una:
- `UPLOADTHING_TOKEN` — token del dashboard de UploadThing

Nunca hardcodear. El SDK lo lee automáticamente de `process.env.UPLOADTHING_TOKEN`.

## Convenciones

- TypeScript siempre — no `.js`, no `any` salvo casos excepcionales justificados
- Componentes pequeños con responsabilidad única
- Sin librerías innecesarias — el SDK de UploadThing ya trae lo que necesitamos
- El código debe ser legible: esta demo es también material educativo
- Usar `useUploadThing()` hook para control total, no los componentes prefab `<UploadButton>` / `<UploadDropzone>` (queremos custom UI con nuestro design system)
- Los componentes React usan `client:load` en Astro — no `client:visible` ni `client:idle` (el uploader debe estar listo inmediatamente)

## NO hacer

- No añadir autenticación de usuarios
- No añadir features no descritas en docs/prd.md
- No usar estilos inline salvo casos puntuales
- No exponer el UPLOADTHING_TOKEN en el cliente
- No usar `@astrojs/tailwind` — está deprecated. Usar `@tailwindcss/vite`
- No usar los componentes UI prefab de UploadThing — construir UI custom con el hook `useUploadThing`
- No instalar `@astrojs/node` — el adapter es `@astrojs/vercel`
