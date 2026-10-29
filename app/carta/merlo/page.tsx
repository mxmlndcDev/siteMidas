import type { Metadata } from 'next';
import CartaPage from '../CartaPage';
import { sections } from '../menu';

export const metadata: Metadata = {
  title: 'Carta | Bingo Merlo',
  description: 'Carta de la cafetería de Bingo Merlo: café, tostados de miga o árabe, pizzetas, bebidas y combos.',
  alternates: { canonical: '/carta/merlo' },
};

export default function Page() {
  return <CartaPage sede="Merlo" sections={sections} />;
}
