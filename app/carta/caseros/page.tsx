import type { Metadata } from 'next';
import CartaPage from '../CartaPage';
import { sections } from '../menu';

export const metadata: Metadata = {
  title: 'Carta | Bingo Caseros',
  description: 'Carta de la cafetería de Bingo Caseros: café, tostados de miga o árabe, pizzetas, bebidas y combos.',
  alternates: { canonical: '/carta/caseros' },
};

export default function Page() {
  return <CartaPage sede="Caseros" sections={sections} />;
}
