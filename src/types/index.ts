export type TyreStatus = 'Good' | 'Attention' | 'Critical' | 'Unknown';

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  vehicles: number;
  lastVisit: string;
}

export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  customer: string;
  mileage: number;
  activeTyres: number;
}

export interface Tyre {
  id: string;
  reference: string;
  brand: string;
  model: string;
  size: string;
  position: string;
  vehicle: string;
  mileage: number;
  tread: number;
  status: TyreStatus;
  fittedOn: string;
}
