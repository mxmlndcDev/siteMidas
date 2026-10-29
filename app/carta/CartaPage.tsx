'use client';
import { useState } from 'react';

export interface MenuItem {
  name: string;
  description?: string;
  price: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
  highlight?: boolean;
}

// Corona de Grupo Midas (la misma del logo de cada sala).
function CrownIcon() {
  return (
    <svg viewBox="78 238 224 268" className="h-[62%] w-auto" fill="white" aria-hidden="true">
      <circle cx="191" cy="260" r="13" />
      <circle cx="155" cy="307" r="13" />
      <circle cx="227" cy="309" r="13" />
      <circle cx="190" cy="328" r="13" />
      <circle cx="97" cy="382" r="14" />
      <circle cx="282" cy="382" r="14" />
      <path d="M105 404 Q150 422 163 410 L190 357 L217 410 Q230 422 275 404 L248 492 Q190 476 132 492 Z" />
    </svg>
  );
}

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex justify-between items-baseline gap-2 py-1.5">
      <div className="flex-1 min-w-0">
        <span className="font-mono text-base">{item.name}</span>
        {item.description && (
          <span className="font-mono text-sm ml-1 opacity-60">{item.description}</span>
        )}
        <div className="border-b border-dotted border-black/25 mt-0.5" />
      </div>
      <span className="font-mono font-bold text-base whitespace-nowrap">{item.price}</span>
    </div>
  );
}

function Section({
  section, expanded, onToggle,
}: { section: MenuSection; expanded: boolean; onToggle: () => void }) {
  const bg = section.highlight ? '#94855f' : 'white';
  const titleColor = section.highlight ? 'white' : '#94855f';
  const textColor = section.highlight ? 'white' : 'black';

  return (
    <div className="border-b-2 border-black" style={{ backgroundColor: bg, color: textColor }}>
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 flex justify-between items-center hover:opacity-80 transition-opacity"
      >
        <h2
          className="tracking-wide text-left"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.75rem', color: titleColor }}
        >
          {section.title}
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 flex-shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          {expanded
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />}
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4">
          {section.items.map((item, i) => <ItemRow key={i} item={item} />)}
        </div>
      )}
    </div>
  );
}

export default function CartaPage({
  sede, sections,
}: { sede: string; sections: MenuSection[] }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setExpanded(prev => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,900&family=Bebas+Neue&family=Cinzel:wght@600&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b-2 border-black px-4 pt-8 pb-6">
          <div className="max-w-2xl mx-auto">
            {/* Encabezado igual al PDF: MENÚ + franja con corona y nombre de la sala */}
            <div className="w-fit max-w-full">
              <h1
                className="text-black"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900,
                  fontStretch: '125%',
                  fontSize: 'clamp(4rem, 21vw, 8.5rem)',
                  lineHeight: 0.8,
                  letterSpacing: '-0.02em',
                }}
              >
                MENÚ
              </h1>
              <div className="flex mt-2 h-10 sm:h-12">
                <div
                  className="flex items-center justify-center aspect-square h-full"
                  style={{ backgroundColor: '#94855f' }}
                >
                  <CrownIcon />
                </div>
                <div className="flex-1 bg-black text-white flex items-center justify-center px-4">
                  <span
                    className="whitespace-nowrap"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontWeight: 600,
                      fontSize: 'clamp(1rem, 4.4vw, 1.4rem)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Bingo {sede}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setExpanded(new Set(sections.map((_, i) => i)))}
                className="px-4 py-2 text-white font-mono text-sm transition-colors"
                style={{ backgroundColor: '#94855f' }}
              >
                Expandir todo
              </button>
              <button
                onClick={() => setExpanded(new Set())}
                className="px-4 py-2 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors"
              >
                Contraer todo
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto">
          {sections.map((s, i) => (
            <Section key={i} section={s} expanded={expanded.has(i)} onToggle={() => toggle(i)} />
          ))}
        </main>

        <footer className="bg-black text-white py-6 mt-8">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="font-mono text-sm opacity-75">Bingo {sede}</p>
            <p className="font-mono text-xs opacity-40 mt-1">grupomidasbingos</p>
          </div>
        </footer>
      </div>
    </>
  );
}
