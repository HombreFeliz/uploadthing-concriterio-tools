# Design System — UploadThing Demo

## Colores

```
Primary:      #7665FF   (violeta Con Criterio)
Primary hover:#8B7CFF   (variante clara para hover)
Background:   #0a0a0a   (negro profundo)
Surface:      #111111   (tarjetas, zonas elevadas)
Surface alt:  #1a1a1a   (superficie secundaria, zona de drop)
Border:       #1e1e1e   (bordes por defecto)
Border active:#7665FF33 (borde con tinte primary, para estados activos)
Text primary: #e2e2e2
Text muted:   #666666
Success:      #4ade80   (upload completado, validación OK)
Error:        #f87171   (error de validación, upload fallido)
Warning:      #fbbf24   (archivo cerca del límite)
```

## Tipografía

```
Display:  Fraunces (variable, opsz)  — headings principales
Body:     Outfit (variable)          — texto general, labels, descripciones
Mono:     Space Mono                 — código, tipos MIME, tamaños de archivo, URLs
```

Cargar vía Google Fonts en el Layout base:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## Tamaños de texto

```
Heading 1:    Fraunces 700, 2.5rem / 3rem
Heading 2:    Fraunces 600, 1.75rem / 2.25rem
Heading 3:    Outfit 600, 1.25rem / 1.75rem
Body:         Outfit 400, 1rem / 1.5rem
Body small:   Outfit 400, 0.875rem / 1.25rem
Caption:      Outfit 300, 0.75rem / 1rem
Mono:         Space Mono 400, 0.875rem / 1.25rem
```

## Componentes específicos de esta demo

### Zona de drop (UploadZone)

```
Fondo:          Surface alt (#1a1a1a)
Borde:          2px dashed Border (#1e1e1e)
Borde hover:    2px dashed Primary (#7665FF)
Borde dragover: 2px solid Primary (#7665FF) + fondo Primary/5%
Border radius:  12px
Padding:        48px
Texto central:  Text muted, Outfit 400
Icono:          Upload icon, 48px, Text muted → Primary en hover
```

### Barra de progreso

```
Fondo track:    Border (#1e1e1e)
Fondo fill:     Primary (#7665FF)
Altura:         4px
Border radius:  2px
Animación:      width transition 200ms ease
Completado:     fill cambia a Success (#4ade80)
```

### Tarjeta de archivo (FileGallery)

```
Fondo:          Surface (#111111)
Borde:          1px solid Border (#1e1e1e)
Border radius:  8px
Padding:        16px
Thumbnail:      64x64px, object-fit cover, border-radius 4px
Nombre:         Outfit 500, Text primary, truncate con ellipsis
Tipo MIME:      Space Mono 400, Text muted, 0.75rem
Tamaño:         Space Mono 400, Text muted, 0.75rem
Botón copiar:   Ghost button con icono clipboard, hover Primary
```

### Selector de presets (RouteConfigurator)

```
Tabs/pills:     Fondo Surface, borde Border
Tab activa:     Fondo Primary/10%, borde Primary, texto Primary
Tab inactiva:   Fondo transparent, texto Text muted
Transición:     150ms ease
```

### Banners

```
Fondo:          Surface (#111111)
Borde:          1px solid Border (#1e1e1e)
Border radius:  8px
Padding:        24px 32px
CTA button:     Fondo Primary, texto white, padding 8px 20px, border-radius 6px
CTA hover:      Fondo Primary hover (#8B7CFF)
```

## Estilo general

- Dark mode por defecto (no hay toggle de tema)
- Bordes sutiles, sin sombras pesadas
- Densidad media — suficiente aire entre elementos
- Componentes con border-radius: 8-12px
- Máximo ancho de contenido: 800px centrado
- Transiciones suaves (150-200ms) en hover y estados activos
- Iconos: Lucide React, tamaño 20px por defecto
