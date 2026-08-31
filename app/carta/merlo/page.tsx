import CartaPage, { MenuSection } from '../CartaPage';

const sections: MenuSection[] = [
  {
    title: 'CAFETERÍA',
    items: [
      { name: 'Café pocillo', price: '$3.300' },
      { name: 'Café con crema pocillo', price: '$3.500' },
      { name: 'Café americano', price: '$3.500' },
      { name: 'Café americano con crema', price: '$4.000' },
      { name: 'Café doble', price: '$4.000' },
      { name: 'Café doble con crema', price: '$4.700' },
      { name: 'Café con leche', price: '$3.900' },
      { name: 'Cappuccino', price: '$6.500' },
      { name: 'Submarino', price: '$6.600' },
      { name: 'Té/Mate cocido', price: '$1.900' },
      { name: 'Té con leche', price: '$2.100' },
      { name: 'Té con limón', price: '$2.000' },
      { name: 'Leche', description: '(Vaso)', price: '$2.000' },
    ],
  },
  {
    title: 'BEBIDAS',
    items: [
      { name: 'Gaseosa', description: '(Línea Coca-Cola)', price: '$3.200' },
      { name: 'Agua mineral', price: '$2.700' },
      { name: 'Agua con gas', description: '(Vaso)', price: '$1.500' },
      { name: 'Agua saborizada', price: '$3.200' },
      { name: 'Licuado', description: '(Banana/Durazno/Frutilla)', price: '$5.700' },
      { name: 'Exprimido de naranja', price: '$4.500' },
    ],
  },
  {
    title: 'BEBIDAS CON ALCOHOL',
    items: [
      { name: 'Cerveza', description: '(lata)', price: '$4.900' },
      { name: 'Copa de vino', price: '$4.900' },
      { name: 'Fernet', description: '(medida)', price: '$7.800' },
      { name: 'Whisky', price: '$8.200' },
      { name: 'Whisky importado', price: '$10.400' },
    ],
  },
  {
    title: 'TRAGOS',
    items: [
      { name: 'Gancia batido', price: '$6.900' },
      { name: 'Daiquiri', price: '$9.200' },
      { name: 'Whiscola', price: '$9.200' },
      { name: 'Fernet cola', price: '$9.200' },
      { name: 'Campari', price: '$9.200' },
      { name: 'Cuba Libre', price: '$9.200' },
    ],
  },
  {
    title: 'PASTELERÍA',
    items: [
      { name: 'Medialuna', price: '$1.500' },
      { name: 'Pasta frola', price: '$2.600' },
    ],
  },
  {
    title: 'SANDWICHES',
    items: [
      { name: 'Arabe de JyQ', description: '(Tostado)', price: '$6.300' },
      { name: 'Tostado triple', price: '$6.500' },
      { name: 'Medio tostado', price: '$3.300' },
      { name: 'Medialuna con JyQ', price: '$2.100' },
      { name: 'Snacks', price: '$2.000' },
    ],
  },
  {
    title: 'PIZZAS & EMPANADAS',
    items: [
      { name: 'Pizza mozzarella', price: '$6.000' },
      { name: 'Pizza con jamón', price: '$7.000' },
      { name: 'Pizza napolitana', price: '$6.900' },
      { name: 'Pizza con jamón y morrón', price: '$7.400' },
      { name: 'Empanadas', description: '(unidad)', price: '$2.000' },
    ],
  },
  {
    title: 'POSTRES',
    items: [
      { name: 'Duraznos en almíbar', price: '$3.700' },
      { name: 'Duraznos con crema', price: '$4.200' },
      { name: 'Helado 2 bochas', price: '$4.300' },
      { name: 'Helado 3 bochas', price: '$4.800' },
      { name: 'Flan', price: '$3.700' },
      { name: 'Flan con crema', price: '$4.200' },
    ],
  },
  {
    title: 'COMBOS',
    highlight: true,
    items: [
      { name: '2 Medialunas + Café con leche', price: '$5.800' },
      { name: 'Pasta frola + Café con leche', price: '$6.400' },
      { name: 'Medialuna c/JyQ + Café c/leche', price: '$8.000' },
      { name: 'Medialuna c/JyQ + Gaseosa', price: '$7.100' },
      { name: 'Medio tostado + Café con leche', price: '$7.100' },
      { name: 'Medio tostado + Gaseosa', price: '$6.300' },
      { name: 'Medio tostado + Licuado', price: '$8.700' },
      { name: 'Medio tostado + Exprimido', price: '$7.600' },
      { name: 'Arabe JyQ + Gaseosa', price: '$9.000' },
      { name: 'Arabe JyQ + Café con leche', price: '$9.500' },
      { name: 'Pizza individual + Cerveza', price: '$10.100' },
      { name: 'Pizza individual + Gaseosa', price: '$8.900' },
      { name: '3 Empanadas + Cerveza', price: '$10.100' },
      { name: '3 Empanadas + Gaseosa', price: '$9.000' },
    ],
  },
  {
    title: 'ADICIONALES',
    items: [
      { name: 'Crema', price: '$1.200' },
      { name: 'Dulce de leche', price: '$1.200' },
      { name: 'Limón', price: '$1.200' },
      { name: 'Jamón', price: '$1.200' },
      { name: 'Queso', price: '$1.200' },
    ],
  },
];

export default function Page() {
  return <CartaPage sede="Merlo" sections={sections} />;
}
