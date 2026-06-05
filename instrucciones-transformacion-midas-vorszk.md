# Instrucciones de transformación: siteMidas → estilo Vorszk

## Contexto

**Base:** Next.js 14 + Tailwind CSS + GSAP (ScrollTrigger) + TypeScript  
**Referencia visual:** vorszk.com — luxury editorial, dark, serif, espacio negativo agresivo, videos en loop  
**Stack actual:** idéntico al de Vorszk (Next.js + Tailwind + GSAP) → cero cambios de dependencias

---

## 1. Tipografía

### 1.1 Instalar fuente editorial serif

Vorszk usa una serif de alta gama (estilo Editorial New). La opción gratuita más cercana es **Playfair Display** o **DM Serif Display**.

```bash
# En /app/layout.tsx — reemplazar la configuración de fuente actual por:
```

```tsx
// app/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 1.2 Actualizar tailwind.config.ts

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:      'var(--bg)',
        surface: 'var(--surface)',
        border:  'var(--border)',
        blue:    'var(--blue)',
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 2. Variables CSS (globals.css)

Reemplazar el bloque `:root` actual por este. El acento dorado se mantiene (`--blue: #C9A227`) — Vorszk usa beige/dorado como acento también.

```css
/* app/globals.css — reemplazar :root completo */
@layer base {
  :root {
    --bg:             #080705;   /* Negro profundo editorial */
    --surface:        #0F0E0B;
    --surface-2:      #161410;
    --border:         #242018;
    --text-primary:   #EDE8DF;   /* Blanco cálido, no puro */
    --text-secondary: #6B6458;
    --text-muted:     #3D3830;
    --blue:           #C9A227;   /* Dorado — acento de marca */
    --blue-light:     #1A1508;
  }
}

/* Agregar al final del archivo: */

/* Cursor personalizado (opcional pero editorial) */
* { cursor: none; }
.cursor-dot {
  position: fixed;
  width: 6px; height: 6px;
  background: var(--blue);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
}
```

---

## 3. Navegación — estilo Vorszk

Vorszk tiene: logo izquierda + "Menu" derecha como hamburguesa. Reemplazar el nav actual por este patrón:

```tsx
{/* ── Nav ── */}
<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 mix-blend-difference">
  {/* Logo */}
  <span className="font-display text-base tracking-widest uppercase text-text-primary">
    Grupo Midas
  </span>

  {/* Trigger menú */}
  <button
    onClick={() => setMenuOpen(true)}
    className="text-[10px] tracking-[0.3em] uppercase text-text-primary hover:text-blue transition-colors"
  >
    Menu
  </button>
</nav>

{/* ── Overlay menú fullscreen ── */}
{menuOpen && (
  <div className="fixed inset-0 z-[100] bg-bg flex flex-col px-6 md:px-12 py-16">
    <div className="flex justify-between items-start mb-20">
      <span className="font-display text-base tracking-widest uppercase">Grupo Midas</span>
      <button onClick={() => setMenuOpen(false)}
        className="text-[10px] tracking-[0.3em] uppercase text-text-muted hover:text-text-primary transition-colors">
        Cerrar
      </button>
    </div>

    {/* Links grandes */}
    <nav className="flex flex-col gap-2">
      {[
        { href: '#sedes',   label: 'Sedes'      },
        { href: '#club',    label: 'Club Midas' },
        { href: '#eventos', label: 'Eventos'    },
      ].map(({ href, label }) => (
        <a key={label} href={href}
          onClick={() => setMenuOpen(false)}
          className="font-display text-[13vw] md:text-[8vw] leading-none tracking-tighter hover:italic hover:text-blue transition-all duration-300">
          {label}
        </a>
      ))}
    </nav>

    {/* Footer del menú */}
    <div className="mt-auto flex items-end justify-between">
      <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
        Zona Oeste GBA
      </div>
      <a href="#club"
        className="text-[10px] tracking-[0.2em] uppercase border border-text-muted hover:border-blue hover:text-blue px-4 py-2 transition-all">
        Unirse gratis
      </a>
    </div>
  </div>
)}
```

Agregar al componente:
```tsx
const [menuOpen, setMenuOpen] = useState(false);
```

---

## 4. Hero — reestructurar al estilo Vorszk

Vorszk tiene un hero minimalista: tagline grande centrado verticalmente, sin imagen de fondo (o imagen muy sutil), mucho espacio negativo.

```tsx
{/* ── Hero ── */}
<section id="hero-section" className="min-h-[100dvh] flex flex-col pt-16 border-b border-border/30">

  {/* Metadata strip */}
  <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-border/20">
    <span className="text-[9px] tracking-[0.28em] uppercase text-text-muted">
      Zona Oeste · GBA
    </span>
    <span className="text-[9px] tracking-[0.28em] uppercase text-blue">
      Aniversario Ciudadela · Vie 27
    </span>
  </div>

  {/* Cuerpo hero: headline ocupa todo */}
  <div className="flex-1 flex flex-col justify-between px-6 md:px-12 py-16 md:py-24">

    {/* Tagline editorial */}
    <div className="space-y-0 max-w-[90vw]">
      <div className="overflow-hidden leading-none">
        <h1 className="hero-line font-display text-[15vw] md:text-[10vw] leading-[0.88] tracking-tighter">
          Experi-
        </h1>
      </div>
      <div className="overflow-hidden leading-none">
        <h1 className="hero-line font-display text-[15vw] md:text-[10vw] leading-[0.88] tracking-tighter">
          encia
        </h1>
      </div>
      <div className="overflow-hidden leading-none pb-1">
        <h1 className="hero-line font-display text-[15vw] md:text-[10vw] leading-[0.88] tracking-tighter italic text-blue">
          Premium.
        </h1>
      </div>
    </div>

    {/* Subtext + CTAs — al pie izquierda */}
    <div className="hero-sub opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xs">
        Las mejores salas de bingo, gastronomía y sorteos del conurbano.
      </p>
      <div className="flex items-center gap-8">
        <a href="#club" className="group inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase hover:text-blue transition-colors">
          Unirse gratis
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#sedes" className="text-[10px] tracking-[0.2em] uppercase text-text-muted hover:text-text-primary transition-colors">
          Ver sedes
        </a>
      </div>
    </div>
  </div>

  {/* Stats strip — pie hero */}
  <div className="hero-stat opacity-0 flex items-center justify-between px-6 md:px-12 py-5 border-t border-border/20">
    {([['1000+','Puestos'],['4','Salas'],['+$50M','Pozo']] as const).map(([v,l]) => (
      <div key={l} className="flex items-baseline gap-2">
        <span className="font-display text-2xl md:text-3xl">{v}</span>
        <span className="text-[9px] tracking-widest uppercase text-text-muted">{l}</span>
      </div>
    ))}
    <a href="#sedes" className="hidden md:flex items-center gap-1.5 text-[9px] tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors">
      Explorar <ArrowUpRight className="w-3 h-3" />
    </a>
  </div>
</section>
```

---

## 5. Sección "Expertise" → reemplazar Features

Vorszk tiene las cards de expertise con **video en loop** como fondo. Adaptar la sección Features actual:

```tsx
{/* ── Expertise / Propuesta ── */}
<section className="border-t border-border/30">

  {/* Header de sección — estilo Vorszk */}
  <div className="px-6 md:px-12 py-16 border-b border-border/20">
    <div className="flex items-start justify-between">
      <span className="text-[9px] tracking-[0.28em] uppercase text-text-muted">Nuestra propuesta</span>
    </div>
    <h2 className="font-display text-4xl md:text-6xl leading-tight mt-6 max-w-xl">
      Donde más ven límites,<br />
      nosotros vemos <em>posibilidades.</em>
    </h2>
  </div>

  {/* Cards con video — layout vertical tipo Vorszk */}
  <div className="grid md:grid-cols-3 border-b border-border/20">
    {[
      {
        n: '01',
        t: 'Slots y Bingo',
        d: 'Las mejores máquinas de última generación y salas de bingo tradicionales, abiertas los siete días.',
        video: null, // reemplazar por: '/videos/slots.mp4'
      },
      {
        n: '02',
        t: 'Gastronomía',
        d: 'Restaurantes de primer nivel, menús especiales, cafetería y barra de tragos.',
        video: null,
      },
      {
        n: '03',
        t: 'Seguridad Premium',
        d: 'Ambiente seguro, climatizado y controlado. Estacionamiento vigilado disponible.',
        video: null,
      },
    ].map((f, i) => (
      <div
        key={f.t}
        className={`feature-item opacity-0 relative aspect-[3/4] overflow-hidden group ${i > 0 ? 'border-l border-border/20' : ''}`}
      >
        {/* Video de fondo (si existe) */}
        {f.video ? (
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          >
            <source src={f.video} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-surface-2" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
          <span className="font-display text-[9px] tracking-widest uppercase text-blue">{f.n}</span>
          <div>
            <h3 className="font-display text-2xl md:text-3xl leading-tight mb-3">{f.t}</h3>
            <p className="text-text-secondary text-xs leading-relaxed max-w-[220px]">{f.d}</p>
            <a href="#sedes" className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase mt-6 hover:text-blue transition-colors">
              Explorar <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
```

---

## 6. Sección Sedes — mantener estructura, refinar estilo

La sección de sedes ya está bien estructurada. Solo ajustes tipográficos y de espaciado:

```tsx
{/* En sede-overlay-text: cambiar tamaño y espaciado */}
<div className="sede-overlay-text opacity-0 absolute bottom-0 left-0 right-0 px-6 md:px-12 py-10 md:py-16">
  <div>
    <span className="block text-[9px] tracking-[0.28em] uppercase text-text-muted mb-3">Sede central</span>
    <h2 className="font-display text-5xl md:text-7xl leading-none tracking-tighter">
      Bingo Ciudadela
    </h2>
  </div>
</div>

{/* En sede-card footer: tipografía más editorial */}
<div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 py-8">
  <div className="font-display text-xl md:text-3xl tracking-tight">{s.name}</div>
  <div className="flex items-center gap-1.5 text-white/40 text-[9px] tracking-widest uppercase mt-1">
    <MapPin className="w-3 h-3" />{s.loc}
  </div>
</div>
```

---

## 7. Club Midas — refinar al estilo Vorszk

```tsx
{/* Cambiar el label superior */}
<span className="block text-[9px] tracking-[0.28em] uppercase text-text-muted mb-8">
  Membresía gratuita
</span>

{/* Título más grande */}
<h2 className="font-display text-5xl md:text-7xl leading-none tracking-tighter mb-12">
  Club<br /><em>Midas.</em>
</h2>

{/* Tiers: agregar número de orden */}
{[
  { n:'01', tier:'Classic',  desc:'Tarritos de regalo por asistencia' },
  { n:'02', tier:'Silver',   desc:'Descuentos del 10% en gastronomía' },
  { n:'03', tier:'Gold',     desc:'Menú sin cargo y sorpresas especiales' },
  { n:'04', tier:'Platinum', desc:'Atención VIP, tragos y valet parking' },
].map((t) => (
  <div key={t.tier} className="tier-item opacity-0 flex items-center justify-between py-6 group cursor-default border-b border-border/30">
    <div className="flex items-baseline gap-6">
      <span className="text-[9px] tracking-widest text-text-muted">{t.n}</span>
      <span className="font-display text-2xl group-hover:italic group-hover:text-blue transition-all duration-300">
        {t.tier}
      </span>
    </div>
    <span className="text-text-muted text-xs tracking-wide text-right max-w-[200px]">{t.desc}</span>
  </div>
))}
```

---

## 8. Footer — al estilo Vorszk

```tsx
<footer className="border-t border-border/30 px-6 md:px-12 py-8">
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

    {/* Tagline grande — Vorszk cierra con esto */}
    <div className="font-display text-[8vw] md:text-[4vw] leading-none tracking-tighter italic text-text-muted">
      For the Chosen Ones.
    </div>

    <div className="flex flex-col items-end gap-3">
      <span className="font-display text-sm">Grupo Midas</span>
      <span className="text-[9px] tracking-wide text-text-muted text-right">
        Solo mayores de 18 años.<br />
        Jugar compulsivamente es perjudicial para la salud.
      </span>
      <span className="text-[9px] tracking-widest uppercase text-text-muted">©2025 Grupo Midas</span>
    </div>
  </div>
</footer>
```

---

## 9. Animaciones GSAP — sin cambios necesarios

El sistema de animaciones actual (pin, clip-wipe de líneas, parallax de sedes, stagger de tiers) es funcionalmente idéntico al de Vorszk. **No tocar el bloque `useEffect`.**

El único ajuste: asegurarse de que el menú overlay también tenga animación de entrada:

```tsx
// En el overlay del menú, agregar clase transition
<div className={`fixed inset-0 z-[100] bg-bg flex flex-col px-6 md:px-12 py-16
  transition-all duration-500 ease-in-out
  ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
>
```

---

## 10. Assets de video (opcional pero recomendado)

Para replicar exactamente el efecto de Vorszk en las cards de expertise:

1. Conseguir 3 clips cortos (10–20s) de: sala de bingo, gastronomía, exterior del local
2. Comprimir a ~720p, formato MP4 H.264
3. Guardar en `/public/videos/`
4. Reemplazar `video: null` por `video: '/videos/nombre.mp4'` en el array de la sección

---

## Orden de ejecución recomendado

1. `layout.tsx` — fuentes
2. `tailwind.config.ts` — tokens
3. `globals.css` — variables CSS
4. `page.tsx` — en este orden: nav → hero → features → sedes → club → footer
5. Probar con `npm run dev` después de cada sección grande
6. Assets de video al final (opcional)

---

## Lo que NO cambia

- Stack técnico (Next.js 14, Tailwind, GSAP, TypeScript) — idéntico
- Sistema de animaciones GSAP (ScrollTrigger) — se mantiene intacto
- Estructura de rutas y componentes
- Lógica del formulario de Club Midas
- Imágenes de fachadas existentes en `/public/images/`
