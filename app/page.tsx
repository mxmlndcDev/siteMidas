'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

// ─── PIN DURATION (extra scroll while hero is fixed) ─────────────────────────
// Stagger: line1 80-280, line2 280-480, line3 480-680, sub 650-850, stat 750-950
// Hero fully revealed at ~950px — hold complete hero until 1350px then unpin.
const PIN_PX = 1350;

const SEDES = [
  { src: '/images/fachada/bingo merlo.png',      name: 'Bingo Merlo',      loc: 'Merlo Centro' },
  { src: '/images/fachada/bingo hurlingham.png', name: 'Bingo Hurlingham', loc: 'Hurlingham'   },
  { src: '/images/fachada/bingo caseros.png',    name: 'Bingo Caseros',    loc: 'Caseros'      },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | null = null;

    // Dynamic import keeps GSAP out of the SSR bundle
    import('gsap').then(({ gsap }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const hero = document.querySelector<HTMLElement>('#hero-section');
          if (!hero) return;

          // ── 1. Pin the hero for PIN_PX of extra scroll ──────────────────
          ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: `+=${PIN_PX}`,
            pin: true,
            pinSpacing: true,
          });

          // ── 2. Headline lines: clip-wipe up (each in its own timeline) ──
          // Lines start clipped below their overflow-hidden container.
          const lines = gsap.utils.toArray<HTMLElement>('.hero-line');
          const lineRanges = [
            [80, 300],
            [280, 500],
            [480, 700],
          ] as const;

          lines.forEach((line, i) => {
            gsap.fromTo(
              line,
              { yPercent: 108, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  start: lineRanges[i][0],
                  end: lineRanges[i][1],
                  scrub: 1.4,
                },
              }
            );
          });

          // ── 3. Subtext + CTAs ────────────────────────────────────────────
          gsap.fromTo(
            '.hero-sub',
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: { start: 650, end: 850, scrub: 1 },
            }
          );

          // ── 4. Floating stat ─────────────────────────────────────────────
          gsap.fromTo(
            '.hero-stat',
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: { start: 750, end: 950, scrub: 1 },
            }
          );

          // ── 5. Hero image: subtle zoom-out as lines reveal ───────────────
          gsap.fromTo(
            '.hero-image-wrap',
            { scale: 1.07 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { start: 0, end: 900, scrub: 2 },
            }
          );

          // ── 6. Feature items: staggered slide-up on enter ────────────────
          // Motivation: hierarchy — the three pillars reveal in reading order.
          gsap.utils.toArray<HTMLElement>('.feature-item').forEach((item, i) => {
            gsap.fromTo(
              item,
              { opacity: 0, y: 36 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power2.out',
                delay: i * 0.14,
                scrollTrigger: {
                  trigger: item,
                  start: 'top 84%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          // ── 7. Ciudadela parallax (image moves slower than scroll) ───────
          gsap.to('.sede-parallax', {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.sede-hero',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });

          // Ciudadela text overlay: fade up on enter
          gsap.fromTo(
            '.sede-overlay-text',
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.sede-hero',
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Smaller sede cards stagger
          gsap.utils.toArray<HTMLElement>('.sede-card').forEach((card, i) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                delay: i * 0.12,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 86%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          // ── 8. Club section ──────────────────────────────────────────────
          // Tiers wipe in from left one by one
          gsap.utils.toArray<HTMLElement>('.tier-item').forEach((item, i) => {
            gsap.fromTo(
              item,
              { opacity: 0, x: -28 },
              {
                opacity: 1,
                x: 0,
                duration: 0.65,
                ease: 'power2.out',
                delay: i * 0.1,
                scrollTrigger: {
                  trigger: item,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          // Form panel slides in from right
          gsap.fromTo(
            '.form-panel',
            { opacity: 0, x: 32 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.form-panel',
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }, containerRef);
      })
    );

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-bg text-text-primary font-body">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-14 border-b border-border/40 bg-bg/80 backdrop-blur-md">
        <span className="font-display text-lg tracking-tight flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue" />
          Grupo Midas
        </span>
        <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-text-secondary">
          <a href="#sedes"  className="hover:text-text-primary transition-colors">Sedes</a>
          <a href="#club"   className="hover:text-text-primary transition-colors">Club Midas</a>
          <a href="#eventos"className="hover:text-text-primary transition-colors">Eventos</a>
        </div>
        <a href="#club" className="text-[11px] tracking-[0.2em] uppercase border border-text-muted hover:border-blue hover:text-blue px-4 py-2 transition-all">
          Unirse gratis
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section id="hero-section" className="min-h-[100dvh] flex flex-col pt-14">

        {/* Metadata strip */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border/30">
          <span className="text-[10px] tracking-[0.22em] uppercase text-text-muted">
            Zona Oeste GBA &nbsp;·&nbsp; Bingo & Entretenimiento
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-blue">
            Aniversario Ciudadela &nbsp;·&nbsp; Vie 27
          </span>
        </div>

        {/* Main two-col */}
        <div className="flex-1 grid md:grid-cols-[58%_42%]">

          {/* Left: headline */}
          <div className="flex flex-col justify-between px-6 md:px-12 py-12 md:py-16 border-r border-border/30">

            {/* Lines each wrapped in overflow-hidden for clip wipe */}
            <div className="space-y-0">
              <div className="overflow-hidden leading-none">
                <h1 className="hero-line font-display text-[13vw] md:text-[8.5vw] leading-[0.92] tracking-tighter">
                  Experi-
                </h1>
              </div>
              <div className="overflow-hidden leading-none">
                <h1 className="hero-line font-display text-[13vw] md:text-[8.5vw] leading-[0.92] tracking-tighter">
                  encia
                </h1>
              </div>
              <div className="overflow-hidden leading-none pb-1">
                <h1 className="hero-line font-display text-[13vw] md:text-[8.5vw] leading-[0.92] tracking-tighter italic">
                  Premium.
                </h1>
              </div>
            </div>

            {/* Subtext + CTAs */}
            <div className="hero-sub space-y-6 opacity-0">
              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm">
                Las mejores salas de bingo, gastronomia de primer nivel y los sorteos mas espectaculares del conurbano.
              </p>
              <div className="flex items-center gap-8">
                <a href="#club" className="group inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-blue transition-colors">
                  Unirse gratis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#sedes" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Ver sedes
                </a>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="hidden md:block relative overflow-hidden">
            <div className="hero-image-wrap w-full h-full">
              <Image
                src="/images/hero.jpg"
                alt="Grupo Midas — experiencia premium"
                fill
                sizes="42vw"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg/50 to-transparent" />
            </div>

            {/* Floating stat */}
            <div className="hero-stat absolute bottom-8 left-8 opacity-0">
              <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-1.5">Premios entregados</div>
              <div className="font-display text-5xl text-blue leading-none">+50M</div>
            </div>
          </div>
        </div>

        {/* Stats bottom strip */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4 border-t border-border/30">
          <div className="flex items-center gap-8">
            {([['1000+','Puestos'],['4','Salas'],['+$50M','Pozo']] as const).map(([v,l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="font-display text-xl">{v}</span>
                <span className="text-[10px] tracking-widest uppercase text-text-muted">{l}</span>
              </div>
            ))}
          </div>
          <a href="#sedes" className="hidden md:flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors">
            Conocer mas <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t border-border/40">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3">
          {[
            { n:'01', t:'Slots y Bingo',    d:'Las mejores maquinas de ultima generacion y salas de bingo tradicionales, abiertas los siete dias.' },
            { n:'02', t:'Gastronomia',      d:'Restaurantes de primer nivel, menus especiales, cafeteria y barra de tragos para acompanar tu juego.' },
            { n:'03', t:'Seguridad Premium',d:'Ambiente seguro, climatizado y controlado. Estacionamiento vigilado y personal capacitado disponible.' },
          ].map((f, i) => (
            <div
              key={f.t}
              className={`feature-item py-10 md:py-0 opacity-0 border-t md:border-t-0 border-border/40 ${i > 0 ? 'md:border-l md:pl-10' : ''} ${i < 2 ? 'md:pr-10' : ''}`}
            >
              <span className="block font-display text-[10px] tracking-widest uppercase text-blue mb-6">{f.n}</span>
              <h3 className="font-display text-2xl md:text-3xl mb-4 leading-tight">{f.t}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sedes ──────────────────────────────────────────────────────── */}
      <section id="sedes" className="border-t border-border/40">

        {/* Ciudadela hero */}
        <div className="sede-hero relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <div className="sede-parallax w-full h-[120%] absolute inset-0 -top-[10%]">
            <Image
              src="/images/fachada/bingo ciudadela.png"
              alt="Bingo Ciudadela"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
          <div className="sede-overlay-text opacity-0 absolute bottom-0 left-0 right-0 px-6 md:px-12 py-8 md:py-12 flex items-end justify-between">
            <div>
              <span className="block text-[10px] tracking-[0.22em] uppercase text-text-muted mb-2">Sede central</span>
              <h2 className="font-display text-4xl md:text-6xl leading-none">Bingo Ciudadela</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-text-secondary text-sm">
              <MapPin className="w-4 h-4" />Ciudadela Centro
            </div>
          </div>
        </div>

        {/* Tres sedes */}
        <div className="grid md:grid-cols-3 border-t border-border/40">
          {SEDES.map((s, i) => (
            <div key={s.name} className={`sede-card opacity-0 relative aspect-square overflow-hidden group ${i > 0 ? 'border-l border-border/40' : ''}`}>
              <Image src={s.src} alt={s.name} fill sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-5 md:px-8 py-6">
                <div className="font-display text-lg md:text-2xl text-white">{s.name}</div>
                <div className="flex items-center gap-1.5 text-white/50 text-xs mt-1">
                  <MapPin className="w-3 h-3" />{s.loc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Club Midas ─────────────────────────────────────────────────── */}
      <section id="club" className="border-t border-border/40 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Tiers */}
          <div>
            <span className="block text-[10px] tracking-[0.22em] uppercase text-blue mb-8">Membresia gratuita</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-10">Club Midas</h2>
            <div className="divide-y divide-border/40">
              {[
                { tier:'Classic',  desc:'Tarritos de regalo por asistencia' },
                { tier:'Silver',   desc:'Descuentos del 10% en gastronomia' },
                { tier:'Gold',     desc:'Menu sin cargo y sorpresas especiales' },
                { tier:'Platinum', desc:'Atencion VIP, tragos y valet parking' },
              ].map((t) => (
                <div key={t.tier} className="tier-item opacity-0 flex items-center justify-between py-5 group cursor-default">
                  <span className="font-display text-xl group-hover:text-blue transition-colors duration-300">{t.tier}</span>
                  <span className="text-text-secondary text-xs tracking-wide text-right max-w-[200px]">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="form-panel opacity-0 pt-2">
            <h3 className="font-display text-3xl md:text-4xl mb-2">Sumate gratis</h3>
            <p className="text-text-secondary text-sm mb-10">Completa tus datos y empieza a disfrutar.</p>

            <form className="space-y-8" action="AQUI_VA_EL_LINK_DE_TU_CRM" method="POST">
              <label className="block">
                <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Nombre y Apellido</span>
                <input type="text" required placeholder="Tu nombre completo"
                  className="w-full bg-transparent border-b border-border text-sm text-text-primary placeholder:text-text-muted pb-3 focus:outline-none focus:border-blue transition-colors" />
              </label>
              <div className="grid grid-cols-2 gap-8">
                <label className="block">
                  <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Fecha de nacimiento</span>
                  <input type="date" required
                    className="w-full bg-transparent border-b border-border text-sm text-text-secondary pb-3 focus:outline-none focus:border-blue transition-colors" />
                </label>
                <label className="block">
                  <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">WhatsApp</span>
                  <input type="tel" required placeholder="+54 11 ..."
                    className="w-full bg-transparent border-b border-border text-sm text-text-primary placeholder:text-text-muted pb-3 focus:outline-none focus:border-blue transition-colors" />
                </label>
              </div>
              <label className="block">
                <span className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Sala favorita</span>
                <div className="relative">
                  <select required
                    className="w-full bg-transparent border-b border-border text-sm text-text-secondary pb-3 focus:outline-none focus:border-blue transition-colors appearance-none cursor-pointer">
                    <option value="">Elegir sede</option>
                    <option value="ciudadela">Ciudadela</option>
                    <option value="merlo">Merlo</option>
                    <option value="hurlingham">Hurlingham</option>
                    <option value="caseros">Caseros</option>
                  </select>
                  <ArrowRight className="absolute right-0 bottom-3.5 w-3 h-3 text-text-muted pointer-events-none rotate-90" />
                </div>
              </label>
              <button type="submit"
                className="w-full border border-blue text-blue hover:bg-blue hover:text-bg active:scale-[0.99] py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-all">
                Quiero ser parte
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/40 px-6 md:px-12 py-6 flex items-center justify-between">
        <span className="font-display text-sm">Grupo Midas</span>
        <span className="text-[10px] tracking-wide text-text-muted">
          Solo mayores de 18 anos. Jugar compulsivamente es perjudicial para la salud.
        </span>
      </footer>
    </div>
  );
}
