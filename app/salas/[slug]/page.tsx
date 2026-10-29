import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SEDES, getSede, sedeJsonLd } from '../../sedes';

export const dynamicParams = false;

export function generateStaticParams() {
  return SEDES.map(s => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getSede(params.slug);
  if (!s) return {};
  const title = `${s.name} | ${s.street}, ${s.locality}`;
  const sinDosPuntos = (t: string) => t.replace(': ', ' ').toLowerCase();
  const description = `${s.name} en ${s.street}, ${s.locality}. Slots ${s.slots.map(sinDosPuntos).join(' · ')}. Bingo ${sinDosPuntos(s.bingo)}. Jugadas, carta de cafetería y Club Midas.`;
  return {
    title,
    description,
    alternates: { canonical: `/salas/${s.slug}` },
    openGraph: { title, description, images: [s.src], locale: 'es_AR', type: 'website' },
  };
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="block text-[10px] tracking-[0.24em] uppercase text-text-muted mb-2">{titulo}</span>
      {children}
    </div>
  );
}

export default function SalaPage({ params }: { params: { slug: string } }) {
  const s = getSede(params.slug);
  if (!s) notFound();
  const otras = SEDES.filter(o => o.slug !== s.slug);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sedeJsonLd(s)) }}
      />

      <nav className="flex items-center justify-between px-6 md:px-12 h-14 border-b border-border">
        <Link href="/" aria-label="Grupo Midas, inicio">
          <Image src="/Midas.svg" alt="Grupo Midas" width={140} height={16} className="h-4 w-auto" />
        </Link>
        <Link href="/#sedes" className="text-[10px] tracking-[0.24em] uppercase text-text-muted hover:text-text-primary transition-colors">
          Todas las salas
        </Link>
      </nav>

      <main>
        <header className="px-6 md:px-12 pt-14 pb-10 border-b border-border">
          <span className="text-[10px] tracking-[0.28em] uppercase text-text-muted">{s.label}</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mt-4">{s.name}</h1>
          <p className="mt-4 text-base text-text-secondary">{s.street}, {s.locality}, Buenos Aires</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href={s.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-text-primary text-bg px-5 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-blue transition-colors min-h-[44px] inline-flex items-center"
            >
              Cómo llegar
            </a>
            <Link
              href={s.menuUrl}
              className="border border-border hover:border-blue px-5 py-3 text-[11px] tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors min-h-[44px] inline-flex items-center"
            >
              Ver carta
            </Link>
            <Link
              href="/#contacto"
              className="border border-border hover:border-blue px-5 py-3 text-[11px] tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors min-h-[44px] inline-flex items-center"
            >
              Club Midas
            </Link>
          </div>
        </header>

        <section className="grid md:grid-cols-[1fr_44%] border-b border-border">
          <div className="px-6 md:px-12 py-10 space-y-8 md:border-r border-border">
            <div className="grid grid-cols-2 gap-6">
              <Bloque titulo="Slots">
                {s.slots.map(h => <p key={h} className="text-sm text-text-secondary leading-relaxed">{h}</p>)}
              </Bloque>
              <Bloque titulo="Bingo">
                <p className="text-sm text-text-secondary leading-relaxed">{s.bingo}</p>
              </Bloque>
            </div>

            <Bloque titulo="Jugadas">
              <div className="divide-y divide-border border-y border-border">
                {s.juegos.map(j => (
                  <div key={j.nombre} className="py-3">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-base">{j.nombre}</span>
                      <span className="text-[10px] tracking-wide text-blue uppercase shrink-0">{j.dias}</span>
                    </div>
                    <span className="text-xs text-text-muted leading-relaxed">{j.detalle}</span>
                  </div>
                ))}
              </div>
            </Bloque>

            <Bloque titulo="En la sala">
              <div className="flex flex-wrap gap-2">
                {[...s.amenities, 'Cafetería y barra'].map(a => (
                  <span key={a} className="text-[10px] tracking-[0.15em] uppercase text-text-muted border border-border rounded-full px-3 py-1">
                    {a}
                  </span>
                ))}
              </div>
            </Bloque>
          </div>

          <div className="relative min-h-[300px] md:min-h-[520px] border-t md:border-t-0 border-border">
            <Image
              src={s.src}
              alt={`Fachada de ${s.name}, ${s.street}, ${s.locality}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 44vw"
              className="object-cover"
              style={{ filter: 'saturate(0.82) brightness(0.96)' }}
            />
          </div>
        </section>

        <section className="px-6 md:px-12 py-10 border-b border-border">
          <span className="block text-[10px] tracking-[0.24em] uppercase text-text-muted mb-4">Otras salas de Grupo Midas</span>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {otras.map(o => (
              <Link key={o.slug} href={`/salas/${o.slug}`} className="font-display text-2xl hover:text-blue transition-colors">
                {o.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-6 md:px-12 py-10 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <Image src="/loreria.svg" alt="Lotería de la Provincia de Buenos Aires" width={120} height={40} className="h-8 w-auto" />
        <p className="text-[10px] tracking-[0.12em] uppercase text-text-muted leading-relaxed">
          Prohibido el ingreso a menores de 18 años · Jugar compulsivamente es perjudicial para la salud
        </p>
      </footer>
    </div>
  );
}
