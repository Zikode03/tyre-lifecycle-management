import type { Customer, Tyre, Vehicle } from '../types';

export const customers: Customer[] = [
  { id: 'CUS-1001', name: 'Thando Mkhize', mobile: '082 451 9721', email: 'thando.mkhize@example.co.za', vehicles: 2, lastVisit: '14 Aug 2026' },
  { id: 'CUS-1002', name: 'Lerato Molefe', mobile: '073 188 4023', email: 'lerato.molefe@example.co.za', vehicles: 1, lastVisit: '12 Aug 2026' },
  { id: 'CUS-1003', name: 'Sibusiso Dlamini', mobile: '071 905 6632', email: 'sibusiso.d@example.co.za', vehicles: 3, lastVisit: '09 Aug 2026' },
  { id: 'CUS-1004', name: 'Priya Naidoo', mobile: '083 672 1190', email: 'priya.naidoo@example.co.za', vehicles: 1, lastVisit: '06 Aug 2026' },
  { id: 'CUS-1005', name: 'Ayanda Zulu', mobile: '078 331 8850', email: 'ayanda.zulu@example.co.za', vehicles: 2, lastVisit: '01 Aug 2026' },
];

export const vehicles: Vehicle[] = [
  { id: 'VEH-2001', registration: 'ND 452-981', make: 'Toyota', model: 'Corolla Cross', year: 2024, customer: 'Thando Mkhize', mileage: 38420, activeTyres: 4 },
  { id: 'VEH-2002', registration: 'ND 812-774', make: 'Volkswagen', model: 'Polo', year: 2022, customer: 'Lerato Molefe', mileage: 61580, activeTyres: 4 },
  { id: 'VEH-2003', registration: 'NU 193-442', make: 'Ford', model: 'Ranger', year: 2023, customer: 'Sibusiso Dlamini', mileage: 72930, activeTyres: 5 },
  { id: 'VEH-2004', registration: 'ND 667-220', make: 'Hyundai', model: 'Creta', year: 2025, customer: 'Priya Naidoo', mileage: 18240, activeTyres: 4 },
];

export const tyres: Tyre[] = [
  { id: 'TYR-3001', reference: 'TTP-8H4L92', brand: 'Continental', model: 'UltraContact', size: '205/55 R16', position: 'Front Left', vehicle: 'ND 452-981', mileage: 18420, tread: 5.2, status: 'Good', fittedOn: '18 Nov 2025' },
  { id: 'TYR-3002', reference: 'TTP-8H4L93', brand: 'Continental', model: 'UltraContact', size: '205/55 R16', position: 'Front Right', vehicle: 'ND 452-981', mileage: 18420, tread: 4.1, status: 'Attention', fittedOn: '18 Nov 2025' },
  { id: 'TYR-3003', reference: 'TTP-8H4L94', brand: 'Continental', model: 'UltraContact', size: '205/55 R16', position: 'Rear Left', vehicle: 'ND 452-981', mileage: 18420, tread: 5.8, status: 'Good', fittedOn: '18 Nov 2025' },
  { id: 'TYR-3004', reference: 'TTP-8H4L95', brand: 'Continental', model: 'UltraContact', size: '205/55 R16', position: 'Rear Right', vehicle: 'ND 452-981', mileage: 18420, tread: 2.1, status: 'Critical', fittedOn: '18 Nov 2025' },
  { id: 'TYR-3010', reference: 'TTP-KQ1192', brand: 'Bridgestone', model: 'Turanza', size: '195/55 R16', position: 'Front Left', vehicle: 'ND 812-774', mileage: 9200, tread: 6.4, status: 'Good', fittedOn: '02 Apr 2026' },
];

export const recentActivity = [
  { title: 'Tyre inspection completed', meta: 'ND 452-981 · Thando Mkhize', time: '18 min ago', type: 'inspection' },
  { title: 'Rotation reminder sent', meta: 'ND 812-774 · Lerato Molefe', time: '42 min ago', type: 'reminder' },
  { title: 'Replacement recommended', meta: 'NU 193-442 · Rear right tyre', time: '1 hr ago', type: 'critical' },
  { title: 'New customer registered', meta: 'Ayanda Zulu · 2 vehicles', time: '2 hrs ago', type: 'customer' },
];
