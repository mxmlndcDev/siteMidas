import type { Metadata } from 'next';
import CartaPage from '../CartaPage';
import { sections } from '../menu';

export const metadata: Metadata = {
  title: 'Carta | Bingo Ciudadela',
  description: 'Carta de la cafetería de Bingo Ciudadela: café, tostados de miga o árabe, pizzetas, bebidas y combos.',
  alternates: { canonical: '/carta/ciudadela' },
};

export default function Page() {
  return <CartaPage sede="Ciudadela" sections={sections} />;
}
