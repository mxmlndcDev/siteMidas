import type { MetadataRoute } from 'next';
import { SEDES, SITE_URL } from './sedes';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...SEDES.map(s => ({ url: `${SITE_URL}/salas/${s.slug}`, priority: 0.9 })),
    ...SEDES.map(s => ({ url: `${SITE_URL}${s.menuUrl}`, priority: 0.6 })),
  ];
}
