import CartaPage, { MenuSection } from '../CartaPage';

const sections: MenuSection[] = [
  {
    title: 'CAFETERÍA',
    items: [
      { name: 'Café pocillo', price: '$3.600' },
      { name: 'Café pocillo con crema', price: '$3.800' },
      { name: 'Café pocillo cortado', price: '$3.800' },
      { name: 'Café americano', price: '$3.800' },
      { name: 'Café americano con crema', price: '$4.400' },
      { name: 'Café americano cortado', price: '$4.400' },
      { name: 'Café doble', price: '$4.400' },
      { name: 'Café doble con crema', price: '$5.100' },
      { name: 'Café doble cortado', price: '$5.100' },
      { name: 'Café con leche', price: '$4.200' },
      { name: 'Lágrima americana', price: '$3.800' },
      { name: 'Lágrima doble', price: '$4.400' },
      { name: 'Cappuccino', price: '$7.100' },
      { name: 'Submarino', price: '$7.100' },
      { name: 'Té/Mate cocido', price: '$2.000' },
      { name: 'Té/Mate cocido con leche', price: '$2.300' },
      { name: 'Té con limón', price: '$2.200' },
      { name: 'Té Boldo', price: '$2.300' },
      { name: 'Leche', description: '(Vaso)', price: '$2.200' },
    ],
  },
  {
    title: 'BEBIDAS',
    items: [
      { name: 'Gaseosa', description: '(Línea Coca-Cola)', price: '$3.500' },
      { name: 'Agua Tónica / Pomelo', description: '(Lata)', price: '$3.600' },
      { name: 'Agua mineral', price: '$2.900' },
      { name: 'Agua con gas', description: '(Vaso)', price: '$1.600' },
      { name: 'Agua saborizada', price: '$3.500' },
      { name: 'Licuado', description: '(Banana/Durazno/Frutilla)', price: '$6.300' },
      { name: 'Exprimido de naranja', price: '$4.900' },
    ],
  },
  {
    title: 'BEBIDAS CON ALCOHOL',
    items: [
      { name: 'Cerveza', description: '(lata)', price: '$5.400' },
      { name: 'Copa de vino', price: '$5.400' },
      { name: 'Fernet', description: '(medida)', price: '$8.500' },
      { name: 'Gancia', description: '(medida)', price: '$7.600' },
      { name: 'Tía María', description: '(medida)', price: '$7.900' },
      { name: 'Whisky', price: '$9.000' },
      { name: 'Whisky importado', price: '$11.400' },
    ],
  },
  {
    title: 'TRAGOS',
    items: [
      { name: 'Gancia batido', price: '$10.100' },
      { name: 'Daiquiri', price: '$10.100' },
      { name: 'Whiscola', price: '$10.100' },
      { name: 'Fernet cola', price: '$10.100' },
      { name: 'Campari', price: '$10.100' },
      { name: 'Cuba Libre', price: '$10.100' },
    ],
  },
  {
    title: 'PASTELERÍA',
    items: [
      { name: 'Medialuna', price: '$1.600' },
      { name: 'Pasta frola', price: '$2.900' },
    ],
  },
  {
    title: 'SANDWICHES',
    items: [
      { name: 'Arabe de JyQ', description: '(Tostado)', price: '$6.900' },
      { name: 'Tostado triple', price: '$7.100' },
      { name: 'Medio tostado', price: '$3.600' },
      { name: 'Medialuna con JyQ', price: '$2.300' },
      { name: 'Snacks', price: '$2.200' },
    ],
  },
  {
    title: 'PIZZAS & EMPANADAS',
    items: [
      { name: 'Pizza mozzarella', price: '$6.600' },
      { name: 'Pizza con jamón', price: '$7.700' },
      { name: 'Pizza napolitana', price: '$7.800' },
      { name: 'Pizza con jamón y morrón', price: '$8.100' },
      { name: 'Empanadas', description: '(unidad)', price: '$2.200' },
    ],
  },
  {
    title: 'POSTRES',
    items: [
      { name: 'Duraznos en almíbar', price: '$4.000' },
      { name: 'Duraznos con crema', price: '$4.600' },
      { name: 'Helado 2 bochas', price: '$4.700' },
      { name: 'Helado 3 bochas', price: '$5.300' },
      { name: 'Flan', price: '$4.000' },
      { name: 'Flan con crema', price: '$4.600' },
    ],
  },
  {
    title: 'COMBOS',
    highlight: true,
    items: [
      { name: '2 Medialunas + Café con leche', price: '$6.400' },
      { name: 'Pasta frola + Café con leche', price: '$6.900' },
      { name: 'Medialuna c/JyQ + Café c/leche', price: '$8.500' },
      { name: 'Medialuna c/JyQ + Gaseosa', price: '$7.800' },
      { name: 'Medio tostado + Café con leche', price: '$7.600' },
      { name: 'Medio tostado + Gaseosa', price: '$6.900' },
      { name: 'Medio tostado + Licuado', price: '$9.500' },
      { name: 'Medio tostado + Exprimido', price: '$8.300' },
      { name: 'Arabe JyQ + Gaseosa', price: '$9.900' },
      { name: 'Arabe JyQ + Café con leche', price: '$10.400' },
      { name: 'Pizza individual + Cerveza', price: '$11.100' },
      { name: 'Pizza individual + Gaseosa', price: '$9.800' },
      { name: '3 Empanadas + Cerveza', price: '$11.100' },
      { name: '3 Empanadas + Gaseosa', price: '$9.900' },
    ],
  },
  {
    title: 'ADICIONALES',
    items: [
      { name: 'Crema', price: '$1.300' },
      { name: 'Dulce de leche', price: '$1.300' },
      { name: 'Limón', price: '$1.300' },
      { name: 'Jamón', price: '$1.300' },
      { name: 'Queso', price: '$1.300' },
      { name: 'Tomate', price: '$1.300' },
    ],
  },
];

export default function Page() {
  return <CartaPage sede="Ciudadela" sections={sections} />;
}
