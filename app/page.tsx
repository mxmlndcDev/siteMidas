'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CRM_URL = 'https://script.google.com/macros/s/AKfycbwB6Dl3jIGcVql9dgHKW6TpkPab2mRt2R6z-akGMCaMtfkEDg69dbxtSuENqQPkZyN2qg/exec';

const SEDES = [
  {
    src: '/images/fachada/bingo ciudadela.png',
    name: 'Bingo Ciudadela',
    loc: 'Av. Rivadavia 11732, Ciudadela',
    label: 'Sede ciudadela',
    menuUrl: 'https://carta-bingo-ciudadela.netlify.app/',
    mapsUrl: 'https://maps.google.com/?q=Av.+Rivadavia+11732+Ciudadela+Buenos+Aires',
    pozo: '$4.2M',       // ← actualizar manualmente
    slotTop: '$320K',    // ← actualizar manualmente
    amenities: ['Seguridad'],
    slots: [
      'Lun–Mié: 07:00 a 06:00',
      'Jue–Dom: 24 horas',
    ],
    bingo: 'Mié–Dom: 14:30 a 21:00',
    juegos: [
      { nombre: 'Bingo Extra', dias: 'Mié–Dom', detalle: '1% pozo · bolilla libre' },
      { nombre: 'Bingo Oro', dias: 'Mié–Dom', detalle: '15% pozo · tope 42 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Bingo Plata', dias: 'Mié–Dom', detalle: '10% pozo · tope 46 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Jugada Especial', dias: 'Todos los Jueves', detalle: '5% pozo · 19:00 · bolilla libre' },
    ],
  },
  {
    src: '/images/fachada/bingo merlo.png',
    name: 'Bingo Merlo',
    loc: 'Av. del Libertador 753, Merlo',
    label: 'Sede Merlo',
    menuUrl: 'https://carta-bingo-merlo.netlify.app/',
    mapsUrl: 'https://maps.google.com/?q=Av.+del+Libertador+753+Merlo+Buenos+Aires',
    pozo: '$3.8M',
    slotTop: '$280K',
    amenities: ['Estacionamiento gratuito', 'Seguridad'],
    slots: [
      'Lun–Mié: 07:00 a 05:00',
      'Jue–Dom: 24 horas',
    ],
    bingo: 'Lun–Dom: 15:00 a 21:00',
    juegos: [
      { nombre: 'Bingo Extra', dias: 'Todos los días', detalle: '1% pozo · bolilla libre' },
      { nombre: 'Bingo Oro', dias: 'Todos los días', detalle: '15% pozo · tope 42 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Bingo Plata', dias: 'Todos los días', detalle: '10% pozo · tope 46 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Jugada Especial', dias: 'Todos los Jueves', detalle: '5% pozo · 19:00 · bolilla libre' },
    ],
  },
  {
    src: '/images/fachada/bingo hurlingham.png',
    name: 'Bingo Hurlingham',
    loc: 'Roca 2070, Hurlingham',
    label: 'Sede Hurlingham',
    menuUrl: 'https://carta-bingo-hurlingham.netlify.app/',
    mapsUrl: 'https://maps.google.com/?q=Roca+2070+Hurlingham+Buenos+Aires',
    pozo: '$2.1M',
    slotTop: '$195K',
    amenities: ['Estacionamiento gratuito', 'Seguridad'],
    slots: [
      'Jue–Dom: 08:00 a 04:00',
      'Vie–Sáb y feriados: 08:00 a 05:00',
    ],
    bingo: 'Vie–Dom: 15:00 a 21:00',
    juegos: [
      { nombre: 'Bingo Extra', dias: 'Vie–Dom', detalle: '1% pozo · bolilla libre' },
      { nombre: 'Bingo Oro', dias: 'Vie–Dom', detalle: '15% pozo · tope 42 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Bingo Plata', dias: 'Vie–Dom', detalle: '10% pozo · tope 46 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Jugada Especial', dias: 'Todos los Viernes', detalle: '5% pozo · 19:00 · bolilla libre' },
    ],
  },
  {
    src: '/images/fachada/bingo caseros.png',
    name: 'Bingo Caseros',
    loc: 'Av. San Martín 2780, Caseros',
    label: 'Sede Caseros',
    menuUrl: 'https://carta-bingo-caseros.netlify.app/',
    mapsUrl: 'https://maps.google.com/?q=Av.+San+Martín+2780+Caseros+Buenos+Aires',
    pozo: '$3.5M',
    slotTop: '$260K',
    amenities: ['Seguridad'],
    slots: [
      'Lun–Mié: 07:00 a 06:00',
      'Jue–Dom: 24 horas',
    ],
    bingo: 'Mié–Dom: 14:00 a 21:00',
    juegos: [
      { nombre: 'Bingo Extra', dias: 'Mié–Dom', detalle: '1% pozo · bolilla libre' },
      { nombre: 'Bingo Oro', dias: 'Mié–Dom', detalle: '15% pozo · tope 42 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Bingo Plata', dias: 'Mié–Dom', detalle: '10% pozo · tope 46 · 15:30 16:30 17:30 18:30 19:30 20:30' },
      { nombre: 'Jugada Especial', dias: 'Todos los Sábados', detalle: '5% pozo · 19:00 · bolilla libre' },
    ],
  },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const GALERIA = [
  { src: '/images/galeria/01.png', alt: 'Sala de juegos Grupo Midas' },
  { src: '/images/galeria/02.png', alt: 'Gastronomía Grupo Midas' },
  { src: '/images/galeria/03.JPG', alt: 'Ambiente Grupo Midas' },
  { src: '/images/galeria/04.png', alt: 'Premios Grupo Midas' },
].slice(0, 4);

function computeAge(birth: string): number {
  const d = new Date(birth), n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  const m = n.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < d.getDate())) a--;
  return a;
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1a5 5 0 0 1 5 5c0 3.5-5 9-5 9S3 9.5 3 6a5 5 0 0 1 5-5zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  );
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSede, setExpandedSede] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [ageError, setAgeError] = useState('');

  // Focus management + Escape
  useEffect(() => {
    if (!menuOpen) { menuBtnRef.current?.focus(); return; }
    document.getElementById('menu-overlay')?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // IntersectionObserver: scroll reveals
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.06 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // GSAP: hero entrance only — `killed` prevents Strict Mode double-fire
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let killed = false;
    let ctx: { revert: () => void } | null = null;
    import('gsap').then(({ gsap }) => {
      if (killed) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          gsap.utils.toArray<HTMLElement>('.hero-line'),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: 'power3.out', duration: 1.1, stagger: 0.15, delay: 0.25 }
        );
        gsap.fromTo('.hero-sub',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.9, delay: 0.8 }
        );
        gsap.fromTo('.hero-stat',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8, delay: 1 }
        );
      }, containerRef);
    });
    return () => { killed = true; ctx?.revert(); };
  }, []);

  // Parallax para las imágenes de fondo de galería
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = document.getElementById('galeria');
    if (!section) return;
    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const progress = window.scrollY - sectionTop;
      document.querySelectorAll<HTMLElement>('.bg-parallax-img').forEach(img => {
        const speed = parseFloat(img.dataset.speed ?? '0.2');
        img.style.transform = `translateY(${progress * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAgeError('');
    const form = e.currentTarget;
    const birthInput = form.elements.namedItem('nacimiento') as HTMLInputElement;
    if (birthInput?.value && computeAge(birthInput.value) < 18) {
      setAgeError('Debés ser mayor de 18 años para unirte al Club Midas.');
      birthInput.focus();
      return;
    }
    setStatus('submitting');
    try {
      const data = {
        nombre: (form.elements.namedItem('nombre') as HTMLInputElement).value,
        nacimiento: (form.elements.namedItem('nacimiento') as HTMLInputElement).value,
        whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
        sala: (form.elements.namedItem('sala') as HTMLSelectElement).value,
      };
      await fetch(CRM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputCls = (err?: boolean) =>
    `w-full bg-transparent border-b text-sm text-text-primary placeholder:text-text-muted pb-3
     focus:outline-none transition-[border-color] duration-200
     ${err ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-blue'}`;

  return (
    <div ref={containerRef} className="bg-bg text-text-primary font-body">
      <div className="max-w-[1400px] mx-auto relative">

        {/* Ambient warm radial */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-[-25%] left-[5%] w-[80vw] h-[80vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(149,100,0,0.035) 0%, transparent 65%)' }}
          />
        </div>

        {/* ── Skip link ────────────────────────────────────────────────────── */}
        <a
          href="#hero-section"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-surface focus:text-blue focus:px-4 focus:py-2 focus:text-[10px] focus:tracking-widest focus:uppercase focus:border focus:border-border"
        >
          Saltar al contenido
        </a>

        {/* ── Nav ──────────────────────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-14 bg-bg border-b border-border">
          <img src="/Midas.svg" alt="Grupo Midas" className="h-[10px] w-auto" />
          <button
            ref={menuBtnRef}
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="menu-overlay"
            className="vorszk-btn-text min-h-[44px] px-3 inline-flex items-center text-[10px] tracking-[0.3em] uppercase text-text-primary focus-visible:outline-1 focus-visible:outline-blue focus-visible:outline-offset-4"
          >
            Menu
          </button>
        </nav>

        {/* ── Menu overlay ─────────────────────────────────────────────────── */}
        <div
          id="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          aria-hidden={!menuOpen}
          className={`fixed inset-0 z-[100] bg-bg flex flex-col px-6 md:px-12 py-16
          transition-opacity duration-500
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="flex justify-between items-center mb-16 pb-6 border-b border-border">
            <img src="/Midas.svg" alt="Grupo Midas" className="h-[10px] w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              className="vorszk-btn-text min-h-[44px] px-3 inline-flex items-center text-[10px] tracking-[0.3em] uppercase text-text-muted hover:text-text-primary transition-colors focus-visible:outline-1 focus-visible:outline-blue focus-visible:outline-offset-4"
            >
              Cerrar
            </button>
          </div>

          <nav className="flex flex-col gap-0">
            {([
              { href: '#sedes', label: 'Sedes' },
              { href: '#galeria', label: 'Galería' },
            ] as const).map(({ href, label }, i) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
                  transitionDelay: menuOpen ? `${i * 90 + 120}ms` : '0ms',
                }}
                className="font-display text-[13vw] md:text-[8vw] leading-[1] tracking-tight text-text-primary hover:text-blue transition-colors duration-200 py-1 border-b border-border"
              >
                {label}
              </a>
            ))}
          </nav>

          <div
            className="mt-auto pt-8 border-t border-border flex items-center justify-between"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 480ms ease, transform 480ms ease',
              transitionDelay: menuOpen ? '300ms' : '0ms',
            }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">Zona Oeste GBA</span>
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 hover:opacity-80 transition-opacity focus-visible:outline-1 focus-visible:outline-blue focus-visible:outline-offset-2"
              style={{ background: '#111111', color: '#FFFFFF', borderRadius: '4px' }}
            >
              Unirse gratis
            </a>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section id="hero-section" className="min-h-[100dvh] flex flex-col pt-14 border-b border-border">

          <div className="flex-1 flex flex-col justify-between px-6 md:px-12 py-16 md:py-24">
            <div className="relative">
            <img
              src="/logomidas.png"
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[26vw] max-w-[320px] opacity-90 animate-float select-none pointer-events-none"
            />
            <h1 className="max-w-[90vw]" aria-label="Experiencia Premium">
              <span className="block overflow-hidden leading-none">
                <span className="hero-line block font-display text-[15vw] md:text-[10vw] leading-[0.88] tracking-tighter text-text-primary">
                  Vení
                </span>
              </span>
              <span className="block overflow-hidden leading-none">
                <span className="hero-line block font-display text-[15vw] md:text-[10vw] leading-[0.88] tracking-tighter text-text-primary">
                  a jugar
                </span>
              </span>
              <span className="block overflow-hidden leading-none pb-1">
                <span className="hero-line block font-display text-[15vw] md:text-[10vw] leading-[0.88] tracking-tighter italic text-blue">
                  y divertirte.
                </span>
              </span>
            </h1>
            </div>

            <div className="hero-sub flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xs">
                Hace más de 20 años ofrecemos entretenimiento, diversión y conexión real entre nuestros clientes.
              </p>
              <div className="flex items-center gap-8">
                <a
                  href="#contacto"
                  className="vorszk-btn-text group inline-flex items-center gap-2 min-h-[44px] text-[10px] tracking-[0.2em] uppercase text-text-primary hover:text-blue transition-colors"
                >
                  Unirse gratis
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href="#sedes"
                  className="vorszk-btn-text inline-flex items-center min-h-[44px] text-[10px] tracking-[0.2em] uppercase text-text-muted hover:text-text-primary transition-colors"
                >
                  Ver sedes
                </a>
              </div>
            </div>
          </div>

          <div className="hero-stat flex items-center justify-between px-6 md:px-12 py-4 border-t border-border">
            {([
              { val: '1000+', label: 'Puestos', aria: 'Más de 1000 puestos' },
              { val: '4', label: 'Salas', aria: '4 salas' },
              { val: '+$50M', label: 'Pozo', aria: 'Más de 50 millones en premios' },
            ] as const).map(({ val, label, aria }) => (
              <div key={label} className="flex items-baseline gap-2" role="group" aria-label={aria}>
                <span className="font-display text-2xl md:text-3xl text-text-primary">{val}</span>
                <span className="text-[10px] tracking-widest uppercase text-text-muted" aria-hidden="true">{label}</span>
              </div>
            ))}
            <a
              href="#sedes"
              className="vorszk-btn-text hidden md:flex items-center gap-1 text-[10px] tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
            >
              Explorar ↗
            </a>
          </div>
        </section>

        {/* ── Sedes ────────────────────────────────────────────────────────── */}
        <section id="sedes" className="border-t border-border">

          <div className="px-6 md:px-12 py-14 border-b border-border">
            <span className="text-[10px] tracking-[0.28em] uppercase text-text-muted">Nuestras sedes</span>
            <div className="overflow-hidden mt-4">
              <h2 className="reveal font-display text-4xl md:text-6xl leading-tight max-w-2xl text-text-primary">
                Cuatro salas,<br />
                una sola <em>experiencia.</em>
              </h2>
            </div>
          </div>

          {/* Cards apiladas */}
          <div className="flex flex-col gap-4 px-4 md:px-6 pb-6 border-b border-border">
            {SEDES.map((s, i) => {
              const isExpanded = expandedSede === s.name;
              return (
                <div
                  key={s.name}
                  style={{ '--index': i } as React.CSSProperties}
                  className="reveal sede-card group overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                >

                  {/* ── Header: label + nombre + dirección + botones ── */}
                  <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-6 pb-5 border-b border-border">
                    <div>
                      <span className="block text-[9px] tracking-[0.28em] uppercase text-text-muted mb-1.5">
                        {s.label}
                      </span>
                      <span className="font-display text-2xl md:text-4xl tracking-tight text-text-primary leading-none">
                        {s.name}
                      </span>
                      <p className="flex items-center gap-1 mt-2 text-[11px] text-text-muted">
                        <PinIcon className="w-3 h-3 shrink-0" />
                        {s.loc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-1 shrink-0">
                      <a
                        href={s.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vorszk-btn border border-border hover:border-blue px-3 py-2 text-[9px] tracking-[0.2em] uppercase text-text-secondary hover:text-bg transition-colors duration-300"
                      >
                        <span className="vorszk-btn-fill absolute inset-0 bg-blue translate-y-full transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10">Ver carta</span>
                      </a>
                      <a
                        href={s.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Cómo llegar a ${s.name}`}
                        className="group/pin w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-blue hover:text-blue transition-all duration-300 text-text-muted"
                      >
                        <PinIcon className="w-3.5 h-3.5 group-hover/pin:scale-110 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>

                  {/* ── Stats bar: Pozo + Slot top ── */}
                  <div
                    className="flex items-center gap-8 px-6 md:px-8 py-4 border-b border-border"
                    style={{ background: 'var(--surface-3)' }}
                  >
                    <div>
                      <span className="block text-[9px] tracking-[0.22em] uppercase text-text-muted mb-0.5">Pozo</span>
                      <span className="font-display text-2xl md:text-3xl leading-none" style={{ color: '#956400' }}>
                        {s.pozo}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div>
                      <span className="block text-[9px] tracking-[0.22em] uppercase text-text-muted mb-0.5">Slot top</span>
                      <span className="font-display text-2xl md:text-3xl leading-none text-text-primary">
                        {s.slotTop}
                      </span>
                    </div>
                  </div>

                  {/* ── Body: horarios izquierda + imagen derecha ── */}
                  <div className="grid md:grid-cols-[1fr_44%]">

                    {/* Info */}
                    <div className="flex flex-col justify-between p-6 md:p-8 gap-6 md:border-r border-border">
                      <div className="space-y-5">

                        {/* Horarios */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[9px] tracking-[0.22em] uppercase text-text-muted mb-1.5">Slots</span>
                            {s.slots.map(h => (
                              <div key={h} className="text-[11px] text-text-secondary leading-relaxed">{h}</div>
                            ))}
                          </div>
                          <div>
                            <span className="block text-[9px] tracking-[0.22em] uppercase text-text-muted mb-1.5">Bingo</span>
                            <div className="text-[11px] text-text-secondary leading-relaxed">{s.bingo}</div>
                          </div>
                        </div>

                        {/* Amenities */}
                        {s.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {s.amenities.map(a => (
                              <span key={a} className="text-[9px] tracking-[0.15em] uppercase text-text-muted border border-border rounded-full px-3 py-1">
                                {a}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Ver jugadas — acordeón trigger */}
                      <button
                        onClick={() => setExpandedSede(isExpanded ? null : s.name)}
                        aria-expanded={isExpanded}
                        className="group/pill self-start inline-flex items-center gap-3 border border-border hover:border-blue rounded-full pl-5 pr-2 py-2 transition-all duration-300 min-h-[44px]"
                      >
                        <span className="text-[9px] tracking-[0.2em] uppercase text-text-secondary group-hover/pill:text-text-primary transition-colors duration-300">
                          {isExpanded ? 'Cerrar' : 'Ver jugadas'}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-border flex items-center justify-center group-hover/pill:bg-blue group-hover/pill:text-surface transition-all duration-300 text-xs">
                          <span className={`inline-block transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>+</span>
                        </span>
                      </button>
                    </div>

                    {/* Imagen full-height */}
                    <div className="relative min-h-[260px] md:min-h-0 overflow-hidden border-t md:border-t-0 border-border">
                      <Image
                        src={s.src}
                        alt={`Fachada de ${s.name}, ${s.loc}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        priority={i === 0}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ filter: 'saturate(0.82) brightness(0.96)' }}
                      />
                    </div>
                  </div>

                  {/* ── Acordeón de juegos ── */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="mx-6 md:mx-8 border-t border-border divide-y divide-border py-2">
                      {s.juegos.map(j => (
                        <div key={j.nombre} className="py-3 flex flex-col gap-0.5">
                          <div className="flex items-start justify-between gap-4">
                            <span className="font-display text-sm text-text-primary">{j.nombre}</span>
                            <span className="text-[9px] tracking-wide text-blue uppercase shrink-0">{j.dias}</span>
                          </div>
                          <span className="text-[10px] text-text-muted leading-relaxed">{j.detalle}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* ── Galería + Contacto ───────────────────────────────────────────── */}
        <section id="galeria" className="border-t border-border">

          {/* Texto sticky + imágenes de fondo en parallax */}
          <div className="relative" style={{ minHeight: '220vh' }}>

            {/* Imágenes de fondo — pequeñas, desaturadas, parallax */}
            {([
              { src: '/images/galeria/01.png', top: '8%', left: '4%', w: '16vw', maxW: 140, speed: 0.15 },
              { src: '/images/galeria/02.png', top: '22%', right: '5%', w: '13vw', maxW: 115, speed: 0.28 },
              { src: '/images/galeria/03.JPG', top: '52%', left: '7%', w: '15vw', maxW: 130, speed: 0.20 },
              { src: '/images/galeria/04.png', top: '68%', right: '8%', w: '18vw', maxW: 155, speed: 0.12 },
            ] as const).map((img, i) => (
              <div
                key={img.src}
                className="bg-parallax-img absolute overflow-hidden rounded-xl pointer-events-none"
                data-speed={img.speed}
                style={{
                  top: img.top,
                  left: 'left' in img ? img.left : undefined,
                  right: 'right' in img ? img.right : undefined,
                  width: `clamp(72px, ${img.w}, ${img.maxW}px)`,
                  aspectRatio: '3/4',
                  opacity: 0.28,
                }}
              >
                <Image
                  src={img.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="160px"
                  className="object-cover"
                  style={{ filter: 'saturate(0.25) brightness(0.92)' }}
                />
              </div>
            ))}

            {/* Texto sticky centrado */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-none z-10">
              <span className="reveal block text-[10px] tracking-[0.28em] uppercase text-text-muted mb-6">
                La experiencia
              </span>
              <h2 className="reveal font-display text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter text-text-primary max-w-2xl">
                Más que un juego.<br />
                Un <em>lugar.</em>
              </h2>
              <p className="reveal text-text-secondary text-sm md:text-base leading-relaxed max-w-sm mt-8">
                Gastronomía, ambiente seguro, comodidad y excelentes slots.
              </p>
            </div>
          </div>

          {/* Form al pie */}
          <div id="contacto" className="px-6 md:px-12 py-20 md:py-28 border-t border-border mt-4">
            <div className="max-w-lg mx-auto">

              <div className="text-center mb-12">
                <span className="reveal block text-[10px] tracking-[0.28em] uppercase text-text-muted mb-4">
                  Contacto
                </span>
                <h2 className="reveal font-display text-4xl md:text-5xl leading-tight tracking-tighter text-text-primary">
                  Sumate<br /><em>gratis.</em>
                </h2>
                <p className="reveal text-text-secondary text-sm leading-relaxed mt-4 max-w-xs mx-auto">
                  Completá tus datos y enterate de todo.
                </p>
              </div>

              {status === 'success' ? (
                <div aria-live="polite" aria-atomic="true" className="text-center py-8">
                  <span className="block text-[10px] tracking-[0.28em] uppercase mb-6" style={{ color: '#956400' }}>
                    Registro confirmado
                  </span>
                  <p className="font-display text-3xl leading-tight mb-5 text-text-primary">
                    Bienvenido al<br /><em>Grupo Midas.</em>
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                    Pronto recibirás novedades y beneficios exclusivos.
                  </p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit} noValidate>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="text-[10px] tracking-[0.2em] uppercase px-4 py-3 rounded-[4px]"
                      style={{ background: '#FDEBEC', color: '#9F2F2D', border: '1px solid rgba(159,47,45,0.18)' }}
                    >
                      Hubo un problema al enviar. Intentá de nuevo.
                    </p>
                  )}

                  <label className="block">
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Nombre y Apellido</span>
                    <input
                      type="text" name="nombre" required minLength={2} maxLength={120}
                      placeholder="Tu nombre completo"
                      className={inputCls()}
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block">
                        <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Fecha de nacimiento</span>
                        <input
                          type="date" name="nacimiento" required
                          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                            .toISOString().split('T')[0]}
                          aria-describedby={ageError ? 'age-error' : undefined}
                          className={inputCls(!!ageError)}
                        />
                      </label>
                      {ageError && (
                        <p id="age-error" role="alert" className="mt-2 text-[10px] leading-snug" style={{ color: '#9F2F2D' }}>
                          {ageError}
                        </p>
                      )}
                    </div>
                    <label className="block">
                      <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">WhatsApp</span>
                      <input
                        type="tel" name="whatsapp" required placeholder="+54 11 ..."
                        pattern="[\d\s\+\-\(\)]{7,20}"
                        className={inputCls()}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Sala favorita</span>
                    <div className="relative">
                      <select name="sala" required className={inputCls() + ' appearance-none cursor-pointer'}>
                        <option value="">Elegir sede</option>
                        <option value="ciudadela">Ciudadela</option>
                        <option value="merlo">Merlo</option>
                        <option value="hurlingham">Hurlingham</option>
                        <option value="caseros">Caseros</option>
                      </select>
                      <span className="absolute right-0 bottom-3.5 text-[11px] text-text-muted pointer-events-none select-none">▾</span>
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="vorszk-btn group w-full border border-blue text-blue py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
                  >
                    <span className="vorszk-btn-fill absolute inset-0 bg-blue translate-y-full transition-transform duration-300 ease-in-out" />
                    <span className="relative z-10 group-hover:text-bg transition-colors duration-300">
                      {status === 'submitting' ? 'Enviando…' : 'Quiero ser parte'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="border-t border-border px-6 md:px-12 pt-10 pb-8">

          {/* Logo Grupo Midas — centrado, tamaño grande */}
          <div className="flex justify-center items-center py-8 md:py-10 border-b border-border">
            <img
              src="/Midas.svg"
              alt="Grupo Midas"
              className="h-4 md:h-6 w-auto"
              style={{ maxWidth: '60vw' }}
            />
          </div>

          {/* Bottom row: Lotería logo izquierda · Leyenda legal derecha */}
          <div className="flex items-end justify-between gap-6 pt-6">

            {/* Logo Lotería Provincia de Buenos Aires */}
            <img
              src="/loreria.svg"
              alt="Lotería de la Provincia de Buenos Aires"
              className="h-9 md:h-11 w-auto shrink-0"
            />

            {/* Leyenda legal */}
            <p className="text-[10px] tracking-wide text-text-muted text-right leading-relaxed max-w-xs">
              Jugar compulsivamente es perjudicial<br />
              para la salud. Ley Nro. 15.131<br />
              Línea confidencial y gratuita<br />
              0800-444-4000
            </p>

          </div>
        </footer>
      </div>{/* /max-w-[1400px] */}
    </div>
  );
}
