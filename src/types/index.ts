export type TyreStatus = 'Good' | 'Attention' | 'Critical' | 'Unknown';
export type MileageSource = 'Telematics' | 'Workshop' | 'Customer' | 'GPS' | 'Estimated';
export type MileageVerification = 'Automated' | 'Verified' | 'Self-reported' | 'Estimated';
export type IntegrationStatus = 'Connected' | 'Disconnected' | 'Not connected' | 'Attention';

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

/**
 * A mileage reading records where the odometer value came from, not only the value itself.
 * This lets the UI distinguish live telematics from workshop-verified and customer-reported data.
 */
export interface MileageReading {
  id: string;
  vehicleId: string;
  odometerKm: number;
  capturedAt: string;
  source: MileageSource;
  verification: MileageVerification;
  provider?: string;
  note?: string;
}

export interface TelematicsConnection {
  id: string;
  provider: string;
  status: IntegrationStatus;
  connectedVehicles: number;
  lastSync?: string;
  description: string;
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
