# siteMidas — Contexto del proyecto

## Qué es
Landing page para **Grupo Midas**, cadena de bingos/salas de juego del conurbano bonaerense (Zona Oeste GBA). One-pager con: hero editorial, sección de sedes, galería con parallax, formulario de alta al club de fidelidad y footer con leyenda legal.

## Stack técnico
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS v3** + variables CSS personalizadas en `globals.css`
- **GSAP 3** — solo para animación de entrada del hero (`fromTo` en `useEffect`). No usar ScrollTrigger.
- Parallax de galería: `scroll` listener vanilla JS en `useEffect` separado
- **Fuentes**: Playfair Display (`--font-display`) + DM Sans (`--font-body`) vía `next/font/google`
- Sin backend propio — formulario del club envía a un CRM externo (`CRM_URL` en `page.tsx` — **pendiente configurar**)

## Diseño / estética
Inspirado en **vorszk.com**: luxury editorial, paleta **light** warm monochrome, serif grande, espacio negativo agresivo. Acento **dorado** (`--blue / --accent: #956400` sobre fondo claro). Fondo `#F7F6F3`.

> ⚠️ El MEMORY.md anterior decía "dark" pero el tema actual es **light**. La variable `--blue` vale `#956400` (legible sobre claro), no `#C9A227`.

### Variables CSS clave (`globals.css`)
| Variable | Valor | Uso |
|----------|-------|-----|
| `--bg` | `#F7F6F3` | Fondo general |
| `--surface` | `#FFFFFF` | Cards |
| `--surface-3` | `#F4F2EE` | Stats bar de cards |
| `--border` | `#E8E6E1` | Bordes |
| `--text-primary` | `#111111` | Texto principal |
| `--text-secondary` | `#787774` | Texto secundario |
| `--text-muted` | `#AEACA7` | Labels, metadatos |
| `--blue` / `--accent` | `#956400` | Dorado (acento) |
| `--blue-light` / `--accent-light` | `#FBF3DB` | Fondo dorado suave |

### Clases utilitarias (`globals.css`)
- `.vorszk-btn` — botón con fill animado por `translateY`
- `.vorszk-btn-fill` — elemento fill del botón
- `.vorszk-btn-text` — link con subrayado que crece desde izquierda
- `.reveal` / `.revealed` — scroll reveal vía IntersectionObserver (opacity + translateY)
- `.bg-parallax-img` — imágenes de fondo de galería; el scroll listener las mueve vía `data-speed`

## Estructura de archivos relevantes
```
siteMidas/
├── app/
│   ├── layout.tsx        — fuentes y metadata SEO
│   ├── page.tsx          — toda la UI (one file, ~750 líneas aprox.)
│   └── globals.css       — variables CSS + clases utilitarias
├── public/
│   ├── Midas.svg         — logo principal
│   ├── loreria.svg       — logo Lotería Pcia. BsAs (footer)
│   ├── images/fachada/   — fotos de las 4 sedes (PNG)
│   └── images/galeria/   — 4 imágenes de ambiente (01.png, 02.png, 03.JPG, 04.png)
├── instrucciones-transformacion-midas-vorszk.md — guía de diseño de referencia
└── temp-app/             — scaffolding viejo, ignorar
```

## Secciones de la página (orden)
1. **Nav** — sticky, logo SVG izquierda + botón "Menu" → overlay fullscreen
2. **Hero** — headline editorial grande (GSAP entrance), stats bar al pie
3. **Sedes** — 4 cards apiladas (ver diseño de cards abajo)
4. **Galería / La Experiencia** — texto sticky + imágenes parallax de fondo
5. **Contacto** — formulario de alta Club Midas
6. **Footer** — logo Midas centrado + logo Lotería + leyenda legal

## Diseño de las sede-cards
Estructura de cada card (`sede-card`):
```
┌─────────────────────────────────────────────────┐
│  LABEL (ej. "SEDE CENTRAL")                     │
│  Nombre grande  (font-display)    [Ver carta][📍]│
│  📍 Dirección                                   │
├─────────────────────────────────────────────────┤
│  POZO     |  SLOT TOP    (stats bar, bg surface-3)│
│  $4.2M    |  $320K                              │
├──────────────────────┬──────────────────────────┤
│  SLOTS    BINGO      │                          │
│  Horarios...         │   [Imagen fachada]       │
│  [Amenities pills]   │   full height, no margin │
│  [Ver jugadas +]     │                          │
└──────────────────────┴──────────────────────────┘
│  Acordeón de juegos (max-height transition)     │
└─────────────────────────────────────────────────┘
```
- Grid body: `md:grid-cols-[1fr_44%]` — info izquierda, imagen derecha sin margen extra
- Stats bar tiene `background: var(--surface-3)` y separador vertical `w-px h-8 bg-border`
- Card shadow: `shadow-[0_1px_4px_rgba(0,0,0,0.06)]`

## Galería / Experiencia — efecto parallax
- Sección con `minHeight: '220vh'` para scroll room
- Texto (eyebrow + h2 + bajada): `position: sticky; top: 0; h-screen` centrado
- 4 imágenes `.bg-parallax-img`: `absolute`, pequeñas (`clamp(72px, ~16vw, 155px)`), `opacity: 0.28`, `filter: saturate(0.25)`, dispersas por la sección
- Scroll listener en `useEffect` aplica `transform: translateY(progress * data-speed)` a cada imagen
- Posiciones fijas: img1 top-left, img2 mid-right, img3 bottom-left, img4 bottom-right

## Contenido del negocio

### Las 4 sedes (array `SEDES` en `page.tsx`)
| Sede | Dirección | Pozo | Slot top |
|------|-----------|------|----------|
| Bingo Ciudadela | Av. Rivadavia 11732, Ciudadela | $4.2M | $320K |
| Bingo Merlo | Av. del Libertador 753, Merlo | $3.8M | $280K |
| Bingo Hurlingham | Roca 2070, Hurlingham | $2.1M | $195K |
| Bingo Caseros | Av. San Martín 2780, Caseros | $3.5M | $260K |

Cada sede tiene: `menuUrl` (Netlify), `mapsUrl` (Google Maps), `slots[]`, `bingo`, `amenities[]`, `juegos[]`.
Los valores de pozo y slot top son **manuales** — no hay API.

### Club Midas (membresía gratuita)
Formulario: nombre, fecha de nacimiento, WhatsApp, sala favorita. Validación edad ≥18 en cliente (`computeAge()`). Envío POST a `CRM_URL` (placeholder — **pendiente configurar**).

## Animaciones
| Sistema | Qué anima | Cómo |
|---------|-----------|------|
| GSAP `fromTo` | Hero lines, sub, stat | `useEffect` con lazy `import('gsap')` |
| IntersectionObserver | `.reveal` → `.revealed` | opacity + translateY, threshold 0.06 |
| CSS transition-opacity | Menú overlay | `duration-500` |
| CSS max-height | Acordeón de jugadas por sede | `max-h-0 ↔ max-h-[500px]` |
| Scroll listener | `.bg-parallax-img` de galería | `translateY(progress * speed)` |

**Regla importante:** no tocar el bloque GSAP del hero — funciona y replica el patrón de Vorszk exactamente.

## Pendientes conocidos
- `CRM_URL` es placeholder `'AQUI_VA_EL_LINK_DE_TU_CRM'`
- Videos de fondo para cards de "propuesta" (estructura existe, `video: null`)
- Valores de pozo/slot top se actualizan manualmente en el array `SEDES`
