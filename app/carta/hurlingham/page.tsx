import type { Metadata } from 'next';
import CartaPage from '../CartaPage';
import { sections } from '../menu';

export const metadata: Metadata = {
  title: 'Carta | Bingo Hurlingham',
  description: 'Carta de la cafetería de Bingo Hurlingham: café, tostados de miga o árabe, pizzetas, bebidas y combos.',
  alternates: { canonical: '/carta/hurlingham' },
};

export default function Page() {
  return <CartaPage sede="Hurlingham" sections={sections} />;
}
