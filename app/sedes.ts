// Datos de las 4 salas. Los usan la home, las páginas /salas/[slug] y los datos para Google.

export const SITE_URL = 'https://grupomidas.vercel.app';
export const INSTAGRAM_URL = 'https://www.instagram.com/grupomidasbingos';

type Dia = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
const TODOS: Dia[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export interface Sede {
  src: string;
  name: string;
  slug: string;
  street: string;
  locality: string;
  hours: { days: Dia[]; opens: string; closes: string }[];
  loc: string;
  label: string;
  menuUrl: string;
  mapsUrl: string;
  pozo: string;
  slotTop: string;
  amenities: string[];
  slots: string[];
  bingo: string;
  juegos: { nombre: string; dias: string; detalle: string }[];
}

export const SEDES: Sede[] = [
  {
    src: '/images/fachada/bingo ciudadela.png',
    name: 'Bingo Ciudadela',
    slug: 'ciudadela',
    street: 'Av. Rivadavia 11732',
    locality: 'Ciudadela',
    // Horario de la sala para Google (cierre después de medianoche = día siguiente)
    hours: [{ days: TODOS, opens: '07:00', closes: '06:00' }],
    loc: 'Av. Rivadavia 11732, Ciudadela',
    label: 'Sede ciudadela',
    menuUrl: '/carta/ciudadela',
    mapsUrl: 'https://maps.google.com/?q=Av.+Rivadavia+11732+Ciudadela+Buenos+Aires',
    pozo: '$4.2M',       // ← actualizar manualmente
    slotTop: '$320K',    // ← actualizar manualmente
    amenities: ['Seguridad'],
    slots: [
      'Todos los días: 07:00 a 06:00',
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
    slug: 'merlo',
    street: 'Av. del Libertador 753',
    locality: 'Merlo',
    // Horario de la sala para Google (cierre después de medianoche = día siguiente)
    hours: [{ days: TODOS, opens: '07:00', closes: '06:00' }],
    loc: 'Av. del Libertador 753, Merlo',
    label: 'Sede Merlo',
    menuUrl: '/carta/merlo',
    mapsUrl: 'https://maps.google.com/?q=Av.+del+Libertador+753+Merlo+Buenos+Aires',
    pozo: '$3.8M',
    slotTop: '$280K',
    amenities: ['Estacionamiento gratuito', 'Seguridad'],
    slots: [
      'Todos los días: 07:00 a 06:00',
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
    slug: 'hurlingham',
    street: 'Roca 2070',
    locality: 'Hurlingham',
    // Horario de la sala para Google (cierre después de medianoche = día siguiente)
    hours: [
      { days: ['Thursday', 'Sunday'], opens: '08:00', closes: '04:00' },
      { days: ['Friday', 'Saturday'], opens: '08:00', closes: '05:00' },
    ],
    loc: 'Roca 2070, Hurlingham',
    label: 'Sede Hurlingham',
    menuUrl: '/carta/hurlingham',
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
    slug: 'caseros',
    street: 'Av. San Martín 2780',
    locality: 'Caseros',
    // Horario de la sala para Google (cierre después de medianoche = día siguiente)
    hours: [{ days: TODOS, opens: '07:00', closes: '06:00' }],
    loc: 'Av. San Martín 2780, Caseros',
    label: 'Sede Caseros',
    menuUrl: '/carta/caseros',
    mapsUrl: 'https://maps.google.com/?q=Av.+San+Martín+2780+Caseros+Buenos+Aires',
    pozo: '$3.5M',
    slotTop: '$260K',
    amenities: ['Seguridad'],
    slots: [
      'Todos los días: 07:00 a 06:00',
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

export const getSede = (slug: string) => SEDES.find(s => s.slug === slug);

// Datos estructurados (schema.org) de una sala: lo que Google lee para unir la web con la ficha.
export function sedeJsonLd(s: Sede) {
  const url = `${SITE_URL}/salas/${s.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Casino',
    '@id': `${url}#sala`,
    name: s.name,
    url,
    image: `${SITE_URL}${encodeURI(s.src)}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.street,
      addressLocality: s.locality,
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    hasMap: s.mapsUrl,
    hasMenu: `${SITE_URL}${s.menuUrl}`,
    sameAs: [INSTAGRAM_URL],
    openingHoursSpecification: s.hours.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    amenityFeature: s.amenities.map(a => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
    parentOrganization: { '@id': `${SITE_URL}/#org` },
  };
}

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: 'Grupo Midas',
    url: SITE_URL,
    logo: `${SITE_URL}/logomidas.png`,
    sameAs: [INSTAGRAM_URL],
    subOrganization: SEDES.map(s => ({ '@id': `${SITE_URL}/salas/${s.slug}#sala` })),
  };
}
