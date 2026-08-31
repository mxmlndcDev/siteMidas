import CartaPage, { MenuSection } from '../CartaPage';

const sections: MenuSection[] = [
  {
    title: 'CAFETERÍA',
    items: [
      { name: 'Café pocillo', price: '$3.200' },
      { name: 'Café pocillo con crema', price: '$3.600' },
      { name: 'Café pocillo cortado', price: '$3.600' },
      { name: 'Café americano', price: '$3.500' },
      { name: 'Café americano con crema', price: '$4.000' },
      { name: 'Café americano cortado', price: '$4.000' },
      { name: 'Café doble', price: '$4.500' },
      { name: 'Café doble con crema', price: '$5.000' },
      { name: 'Café doble cortado', price: '$5.000' },
      { name: 'Café con leche', price: '$4.500' },
      { name: 'Café Irlandés', price: '$6.300' },
      { name: 'Cappuccino', price: '$6.000' },
      { name: 'Té/Mate cocido', price: '$3.000' },
      { name: 'Té/Mate cocido con leche', price: '$4.000' },
      { name: 'Té con limón', price: '$4.000' },
    ],
  },
  {
    title: 'BEBIDAS',
    items: [
      { name: 'Gaseosa', description: '(Línea Coca-Cola)', price: '$3.500' },
      { name: 'Agua mineral', price: '$3.250' },
      { name: 'Agua saborizada', price: '$4.000' },
      { name: 'Licuado', description: '(con leche)', price: '$6.000' },
      { name: 'Licuado', description: '(con agua)', price: '$5.200' },
      { name: 'Exprimido de naranja', price: '$6.000' },
    ],
  },
  {
    title: 'BEBIDAS CON ALCOHOL',
    items: [
      { name: 'Cerveza', description: '(lata)', price: '$5.000' },
      { name: 'Fernet', description: '(medida)', price: '$7.500' },
      { name: 'Whisky', description: '(medida)', price: '$8.000' },
      { name: 'Whisky importado', description: '(medida)', price: '$10.000' },
    ],
  },
  {
    title: 'TRAGOS',
    items: [
      { name: 'Gancia batido', price: '$9.000' },
      { name: 'Gancia con Soda', price: '$8.700' },
      { name: 'Daiquiri', price: '$9.000' },
      { name: 'Whiscola', price: '$9.000' },
      { name: 'Fernet cola', price: '$9.000' },
      { name: 'Campari', price: '$9.000' },
      { name: 'Gin Tonic', price: '$9.000' },
    ],
  },
  {
    title: 'PASTELERÍA',
    items: [
      { name: 'Medialuna', price: '$1.800' },
      { name: 'Medialuna con Dulce de leche', price: '$1.800' },
    ],
  },
  {
    title: 'SANDWICHES',
    items: [
      { name: 'Arabe de JyQ', description: '(Tostado)', price: '$8.000' },
      { name: 'Tostado triple', price: '$9.000' },
      { name: 'Medio tostado', price: '$4.500' },
      { name: 'Medialuna con JyQ', price: '$3.000' },
    ],
  },
  {
    title: 'PIZZAS & EMPANADAS',
    items: [
      { name: 'Pizza mozzarella', price: '$7.200' },
      { name: 'Pizza con jamón', price: '$7.800' },
      { name: 'Empanadas', description: '(unidad)', price: '$3.000' },
    ],
  },
  {
    title: 'CAZUELAS',
    items: [
      { name: 'Maní', price: '$2.500' },
      { name: 'Papas fritas', price: '$2.500' },
      { name: 'Jamón', price: '$3.000' },
      { name: 'Queso', price: '$3.000' },
      { name: 'Salame', price: '$3.000' },
    ],
  },
  {
    title: 'POSTRES',
    items: [
      { name: 'Duraznos en almíbar', price: '$4.000' },
      { name: 'Duraznos con crema o DDL', price: '$4.500' },
      { name: 'Flan', price: '$3.000' },
      { name: 'Flan con crema o DDL', price: '$3.500' },
    ],
  },
  {
    title: 'COMBOS',
    highlight: true,
    items: [
      { name: '2 Medialunas + Café con leche', price: '$7.500' },
      { name: '2 Medialunas JyQ + Café c/leche', price: '$9.500' },
      { name: '2 Medialunas JyQ + Exprimido', price: '$11.000' },
      { name: 'Medio tostado + Café con leche', price: '$8.500' },
      { name: 'Medio tostado + Gaseosa', price: '$8.000' },
      { name: 'Medio tostado + Exprimido', price: '$10.000' },
      { name: 'Arabe JyQ + Gaseosa', price: '$11.000' },
      { name: 'Arabe JyQ + Café con leche', price: '$12.000' },
      { name: 'Pizza mozzarella + Cerveza', price: '$11.500' },
      { name: 'Pizza mozzarella + Gaseosa', price: '$10.000' },
      { name: 'Pizza con jamón + Cerveza', price: '$12.000' },
      { name: 'Pizza con jamón + Gaseosa', price: '$10.500' },
      { name: '3 Empanadas + Cerveza', price: '$13.000' },
      { name: '3 Empanadas + Gaseosa', price: '$12.000' },
    ],
  },
];

export default function Page() {
  return <CartaPage sede="Hurlingham" sections={sections} />;
}
