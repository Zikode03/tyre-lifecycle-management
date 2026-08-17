export type DemoCustomer = { id:string; name:string; mobile:string; email:string; status:'Active'|'Inactive' };
export type DemoVehicle = { id:string; customerId:string; registration:string; make:string; model:string; year:number; mileage:number; status:'Active'|'Inactive' };
export type DemoBooking = { id:string; customer:string; registration:string; service:string; date:string; time:string; status:'Confirmed'|'Checked in'|'Pending'|'Cancelled'|'Completed' };
export type DemoInspection = { id:string; registration:string; customer:string; technician:string; status:'Booked'|'In progress'|'Awaiting technician'|'Completed'; odometer?:number; position?:string; inner?:number; centre?:number; outer?:number; pressure?:number; wearPattern?:string; defects?:string[]; notes?:string; recommendation?:string };
export type DemoWarrantyClaim = { id:string; tyreId:string; issue:string; type:string; status:string; eligibility:string; supplier:string; notes?:string };

const CUSTOMER_KEY='tyretrack.demo.customers';
const VEHICLE_KEY='tyretrack.demo.vehicles';
const BOOKING_KEY='tyretrack.demo.bookings';
const INSPECTION_KEY='tyretrack.demo.inspections';
const WARRANTY_KEY='tyretrack.demo.warranty';

const seedCustomers:DemoCustomer[]=[
  {id:'CUS-1001',name:'Thando Mkhize',mobile:'082 555 0134',email:'thando@example.com',status:'Active'},
  {id:'CUS-1002',name:'Sibusiso Dlamini',mobile:'083 555 0271',email:'sibusiso@example.com',status:'Active'},
  {id:'CUS-1003',name:'Lerato Molefe',mobile:'072 555 0418',email:'lerato@example.com',status:'Active'},
  {id:'CUS-1004',name:'Priya Naidoo',mobile:'071 555 0652',email:'priya@example.com',status:'Active'},
];
const seedVehicles:DemoVehicle[]=[
  {id:'VEH-2001',customerId:'CUS-1001',registration:'ND 452-981',make:'Toyota',model:'Corolla Cross',year:2021,mileage:68240,status:'Active'},
  {id:'VEH-2002',customerId:'CUS-1002',registration:'NU 193-442',make:'Ford',model:'Ranger',year:2020,mileage:84420,status:'Active'},
  {id:'VEH-2003',customerId:'CUS-1003',registration:'ND 812-774',make:'Volkswagen',model:'Polo',year:2022,mileage:41980,status:'Active'},
  {id:'VEH-2004',customerId:'CUS-1004',registration:'ND 667-220',make:'Hyundai',model:'Creta',year:2022,mileage:55210,status:'Active'},
];
const seedBookings:DemoBooking[]=[
  {id:'BKG-3001',customer:'Thando Mkhize',registration:'ND 452-981',service:'Tyre inspection',date:'2026-08-17',time:'08:30',status:'Checked in'},
  {id:'BKG-3002',customer:'Lerato Molefe',registration:'ND 812-774',service:'Rotation & balancing',date:'2026-08-17',time:'09:15',status:'Confirmed'},
  {id:'BKG-3003',customer:'Sibusiso Dlamini',registration:'NU 193-442',service:'Replacement assessment',date:'2026-08-17',time:'10:30',status:'Confirmed'},
];
const seedInspections:DemoInspection[]=[
  {id:'INS-1048',registration:'ND 452-981',customer:'Thando Mkhize',technician:'S. Dlamini',status:'In progress'},
  {id:'INS-1047',registration:'NU 193-442',customer:'Sibusiso Dlamini',technician:'Unassigned',status:'Awaiting technician'},
  {id:'INS-1046',registration:'ND 667-220',customer:'Priya Naidoo',technician:'T. Mkhize',status:'Booked'},
  {id:'INS-1045',registration:'ND 812-774',customer:'Lerato Molefe',technician:'S. Dlamini',status:'Completed',odometer:41980,position:'Rear right',inner:4.0,centre:4.1,outer:4.0,pressure:32,wearPattern:'Even',defects:[],recommendation:'Monitor at next service'},
];
const seedWarranty:DemoWarrantyClaim[]=[
  {id:'WAR-2041',tyreId:'TYR-3004',issue:'Sidewall separation',type:'Manufacturer warranty',status:'Evidence review',eligibility:'Likely eligible',supplier:'Continental'},
  {id:'WAR-2038',tyreId:'TYR-3010',issue:'Pothole impact',type:'Road-hazard plan',status:'Awaiting supplier',eligibility:'Plan dependent',supplier:'Bridgestone'},
];

function read<T>(key:string, seed:T):T{
  if(typeof window==='undefined') return seed;
  const value=window.localStorage.getItem(key);
  if(!value){ window.localStorage.setItem(key,JSON.stringify(seed)); return seed; }
  try{return JSON.parse(value) as T;}catch{return seed;}
}
function write<T>(key:string,value:T){ if(typeof window!=='undefined') window.localStorage.setItem(key,JSON.stringify(value)); return value; }

export const workflowStore={
  customers:()=>read(CUSTOMER_KEY,seedCustomers),
  saveCustomers:(value:DemoCustomer[])=>write(CUSTOMER_KEY,value),
  vehicles:()=>read(VEHICLE_KEY,seedVehicles),
  saveVehicles:(value:DemoVehicle[])=>write(VEHICLE_KEY,value),
  bookings:()=>read(BOOKING_KEY,seedBookings),
  saveBookings:(value:DemoBooking[])=>write(BOOKING_KEY,value),
  inspections:()=>read(INSPECTION_KEY,seedInspections),
  saveInspections:(value:DemoInspection[])=>write(INSPECTION_KEY,value),
  warranty:()=>read(WARRANTY_KEY,seedWarranty),
  saveWarranty:(value:DemoWarrantyClaim[])=>write(WARRANTY_KEY,value),
};
