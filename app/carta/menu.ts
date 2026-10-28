import { MenuSection } from './CartaPage';

// Carta única para las 4 salas (PDF de octubre 2026).
export const sections: MenuSection[] = [
  {
    title: 'CAFETERÍA',
    items: [
      { name: 'Café pocillo', price: '$3.500' },
      { name: 'Café americano', price: '$4.000' },
      { name: 'Cortado', price: '$4.200' },
      { name: 'Café con leche', price: '$4.500' },
      { name: 'Té', price: '$2.500' },
    ],
  },
  {
    title: 'BEBIDAS',
    items: [
      { name: 'Gaseosa', description: '(Línea Coca-Cola · Vaso)', price: '$3.500' },
      { name: 'Agua mineral', price: '$2.900' },
      { name: 'Agua con gas', description: '(Vaso)', price: '$2.000' },
    ],
  },
  {
    title: 'BEBIDAS CON ALCOHOL',
    items: [
      { name: 'Cerveza', description: '(lata)', price: '$6.800' },
      { name: 'Fernet', description: '(medida)', price: '$10.700' },
      { name: 'Fernet cola', price: '$12.700' },
    ],
  },
  {
    title: 'PARA COMER',
    items: [
      { name: 'Pizzeta mozzarella', price: '$9.000' },
      { name: 'Medialuna', price: '$2.000' },
      { name: 'Medialuna con JyQ', price: '$3.500' },
      { name: 'Miga/Arabe de JyQ', description: '(Tostado · Medio)', price: '$8.500' },
      { name: 'Miga de JyQ', description: '(Tostado · Entero)', price: '$17.000' },
      { name: 'Adicional Jamón', price: '$2.000' },
    ],
  },
  {
    title: 'COMBOS',
    highlight: true,
    items: [
      { name: '2 Medialunas + Café con leche', price: '$7.000' },
      { name: '2 Medialunas con JyQ + Pocillo', price: '$8.500' },
      { name: 'Medio tostado Miga/Arabe de JyQ', description: '+ Pocillo, Gaseosa o Agua', price: '$10.500' },
      { name: 'Tostado entero de Miga JyQ', description: '+ Pocillo, Gaseosa o Agua', price: '$20.000' },
      { name: 'Pizzeta de mozzarella individual', description: '+ Pocillo, Gaseosa o Agua', price: '$12.000' },
    ],
  },
];
