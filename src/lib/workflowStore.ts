export type DemoCustomer = { id:string; name:string; mobile:string; email:string; status:'Active'|'Inactive' };
export type DemoVehicle = { id:string; customerId:string; registration:string; make:string; model:string; year:number; mileage:number; status:'Active'|'Inactive'; branchId?:string; fleetId?:string };
export type DemoBooking = { id:string; bookingNumber?:number; customer:string; registration:string; service:string; date:string; time:string; status:'Confirmed'|'Checked in'|'Pending'|'Cancelled'|'Completed' };
export type MeasurementSource='Manual gauge'|'Phone camera'|'TPMS'|'Connected device'|'Drive-over scanner';
export type DemoInspection = { id:string; registration:string; customer:string; technician:string; status:'Booked'|'In progress'|'Awaiting technician'|'Completed'; tyreId?:string; odometer?:number; position?:string; inner?:number; centre?:number; outer?:number; pressure?:number; tpmsPressure?:number; measurementSource?:MeasurementSource; deviceName?:string; wearPattern?:string; defects?:string[]; notes?:string; recommendation?:string };
export type DemoWarrantyClaim = { id:string; tyreId:string; issue:string; type:string; status:string; eligibility:string; supplier:string; notes?:string };
export type DemoTyreScan = {
  id:string; tyreId:string; inspectionId:string; registration:string; position:string; capturedAt:string;
  source:'Phone camera'; analysisMode:'Prototype AI analysis'; fileName:string; estimatedTreadMm?:number;
  wearPattern:'Even'|'Inner-edge wear'|'Outer-edge wear'|'Centre wear'|'Cupping'|'Unknown'; defects:string[];
  confidence:number; verification:'Pending technician review'|'Technician confirmed'; recommendation:string;
  submittedBy?:'Customer'|'Technician'; reviewStatus?:'Awaiting review'|'Confirmed'|'Retake requested'|'Workshop inspection required'; reviewNotes?:string;
};
export type DemoTpmsReading={id:string;registration:string;position:string;pressurePsi:number;temperatureC?:number;sensorBattery?:'Good'|'Low'|'Unknown';capturedAt:string;source:string;status:'Normal'|'Low'|'High'|'Unavailable'};
export type DemoDevice={id:string;name:string;type:'TPMS reader'|'Digital tread gauge'|'Pressure gauge'|'Drive-over scanner'|'Alignment machine';branchId:string;status:'Connected'|'Offline'|'Attention';lastSync:string};
export type DemoBranch={id:string;name:string;region:string;vehicles:number;workshopBays:number;status:'Active'|'Attention'};
export type DemoFleet={id:string;name:string;branchId:string;vehicles:number;criticalTyres:number;attentionTyres:number;manager:string};
export type JobCardStatus='Draft'|'Quote sent'|'Approved'|'Declined'|'In workshop'|'Completed'|'Cancelled';
export type QuoteDecision='Pending'|'Approved'|'Declined';
export type DemoJobCardItem={id:string;type:'Tyre replacement'|'Alignment'|'Balancing'|'Rotation'|'Puncture repair'|'Inspection';description:string;position?:string;sku?:string;quantity:number;unitPrice:number;approved:boolean};
export type DemoJobCard={
 id:string;registration:string;customer:string;branch:string;inspectionIds:string[];createdAt:string;status:JobCardStatus;
 quoteNumber:string;quoteDecision:QuoteDecision;quoteSentAt?:string;decisionAt?:string;customerNote?:string;
 items:DemoJobCardItem[];vatRate:number;technician?:string;workshopBay?:string;completedAt?:string;
};

const CUSTOMER_KEY='tyretrack.demo.customers';
const VEHICLE_KEY='tyretrack.demo.vehicles';
const BOOKING_KEY='tyretrack.demo.bookings';
const INSPECTION_KEY='tyretrack.demo.inspections';
const WARRANTY_KEY='tyretrack.demo.warranty';
const TYRE_SCAN_KEY='tyretrack.demo.tyreScans';
const TPMS_KEY='tyretrack.demo.tpms';
const DEVICE_KEY='tyretrack.demo.devices';
const BRANCH_KEY='tyretrack.demo.branches';
const FLEET_KEY='tyretrack.demo.fleets';
const JOB_CARD_KEY='tyretrack.demo.jobCards';

const seedCustomers:DemoCustomer[]=[
  {id:'CUS-1001',name:'Thando Mkhize',mobile:'082 555 0134',email:'thando@example.com',status:'Active'},
  {id:'CUS-1002',name:'Sibusiso Dlamini',mobile:'083 555 0271',email:'sibusiso@example.com',status:'Active'},
  {id:'CUS-1003',name:'Lerato Molefe',mobile:'072 555 0418',email:'lerato@example.com',status:'Active'},
  {id:'CUS-1004',name:'Priya Naidoo',mobile:'071 555 0652',email:'priya@example.com',status:'Active'},
];
const seedVehicles:DemoVehicle[]=[
  {id:'VEH-2001',customerId:'CUS-1001',registration:'ND 452-981',make:'Toyota',model:'Corolla Cross',year:2021,mileage:68240,status:'Active',branchId:'BR-DBN',fleetId:'FLT-RETAIL'},
  {id:'VEH-2002',customerId:'CUS-1002',registration:'NU 193-442',make:'Ford',model:'Ranger',year:2020,mileage:84420,status:'Active',branchId:'BR-DBN',fleetId:'FLT-LOG'},
  {id:'VEH-2003',customerId:'CUS-1003',registration:'ND 812-774',make:'Volkswagen',model:'Polo',year:2022,mileage:41980,status:'Active',branchId:'BR-PTN',fleetId:'FLT-RETAIL'},
  {id:'VEH-2004',customerId:'CUS-1004',registration:'ND 667-220',make:'Hyundai',model:'Creta',year:2022,mileage:55210,status:'Active',branchId:'BR-DBN',fleetId:'FLT-SALES'},
];
const seedBookings:DemoBooking[]=[
  {id:'BKG-3001',bookingNumber:1,customer:'Thando Mkhize',registration:'ND 452-981',service:'Tyre inspection',date:'2026-08-17',time:'08:30',status:'Checked in'},
  {id:'BKG-3002',bookingNumber:2,customer:'Lerato Molefe',registration:'ND 812-774',service:'Rotation & balancing',date:'2026-08-17',time:'09:15',status:'Confirmed'},
  {id:'BKG-3003',bookingNumber:3,customer:'Sibusiso Dlamini',registration:'NU 193-442',service:'Replacement assessment',date:'2026-08-17',time:'10:30',status:'Confirmed'},
];
const seedInspections:DemoInspection[]=[
  {id:'INS-1048',registration:'ND 452-981',customer:'Thando Mkhize',technician:'S. Dlamini',status:'In progress'},
  {id:'INS-1047',registration:'NU 193-442',customer:'Sibusiso Dlamini',technician:'Unassigned',status:'Awaiting technician'},
  {id:'INS-1046',registration:'ND 667-220',customer:'Priya Naidoo',technician:'T. Mkhize',status:'Booked'},
  {id:'INS-1045',registration:'ND 812-774',customer:'Lerato Molefe',technician:'S. Dlamini',status:'Completed',odometer:41980,position:'Rear right',inner:4.0,centre:4.1,outer:4.0,pressure:32,measurementSource:'Manual gauge',wearPattern:'Even',defects:[],recommendation:'Monitor at next service'},
];
const seedWarranty:DemoWarrantyClaim[]=[
  {id:'WAR-2041',tyreId:'TYR-3004',issue:'Sidewall separation',type:'Manufacturer warranty',status:'Evidence review',eligibility:'Likely eligible',supplier:'Continental'},
  {id:'WAR-2038',tyreId:'TYR-3010',issue:'Pothole impact',type:'Road-hazard plan',status:'Awaiting supplier',eligibility:'Plan dependent',supplier:'Bridgestone'},
];
const seedTyreScans:DemoTyreScan[]=[];
const seedTpms:DemoTpmsReading[]=[
 {id:'TPMS-1',registration:'ND 452-981',position:'Front Left',pressurePsi:34,temperatureC:31,sensorBattery:'Good',capturedAt:'2026-08-18T06:10:00Z',source:'Vehicle TPMS gateway',status:'Normal'},
 {id:'TPMS-2',registration:'ND 452-981',position:'Front Right',pressurePsi:34,temperatureC:32,sensorBattery:'Good',capturedAt:'2026-08-18T06:10:00Z',source:'Vehicle TPMS gateway',status:'Normal'},
 {id:'TPMS-3',registration:'ND 452-981',position:'Rear Left',pressurePsi:31,temperatureC:30,sensorBattery:'Good',capturedAt:'2026-08-18T06:10:00Z',source:'Vehicle TPMS gateway',status:'Low'},
 {id:'TPMS-4',registration:'ND 452-981',position:'Rear Right',pressurePsi:33,temperatureC:30,sensorBattery:'Low',capturedAt:'2026-08-18T06:10:00Z',source:'Vehicle TPMS gateway',status:'Normal'},
];
const seedDevices:DemoDevice[]=[
 {id:'DEV-01',name:'Bay 1 TPMS Reader',type:'TPMS reader',branchId:'BR-DBN',status:'Connected',lastSync:'2 min ago'},
 {id:'DEV-02',name:'Tread Gauge TG-08',type:'Digital tread gauge',branchId:'BR-DBN',status:'Connected',lastSync:'1 min ago'},
 {id:'DEV-03',name:'Drive-over Scanner A',type:'Drive-over scanner',branchId:'BR-PTN',status:'Attention',lastSync:'48 min ago'},
 {id:'DEV-04',name:'Alignment Bay 2',type:'Alignment machine',branchId:'BR-DBN',status:'Offline',lastSync:'Yesterday'},
];
const seedBranches:DemoBranch[]=[
 {id:'BR-DBN',name:'Durban Central',region:'KwaZulu-Natal',vehicles:1240,workshopBays:8,status:'Active'},
 {id:'BR-PTN',name:'Pinetown',region:'KwaZulu-Natal',vehicles:680,workshopBays:5,status:'Active'},
 {id:'BR-PMB',name:'Pietermaritzburg',region:'KwaZulu-Natal',vehicles:415,workshopBays:4,status:'Attention'},
];
const seedFleets:DemoFleet[]=[
 {id:'FLT-LOG',name:'KZN Logistics Fleet',branchId:'BR-DBN',vehicles:620,criticalTyres:18,attentionTyres:77,manager:'S. Khumalo'},
 {id:'FLT-SALES',name:'Regional Sales Fleet',branchId:'BR-DBN',vehicles:240,criticalTyres:4,attentionTyres:28,manager:'P. Naidoo'},
 {id:'FLT-RETAIL',name:'Retail Customer Vehicles',branchId:'BR-PTN',vehicles:680,criticalTyres:12,attentionTyres:63,manager:'L. Mthembu'},
];
const seedJobCards:DemoJobCard[]=[
 {id:'JOB-4001',registration:'ND 452-981',customer:'Thando Mkhize',branch:'Durban Central',inspectionIds:['INS-1048'],createdAt:'2026-08-18T07:30:00Z',status:'Quote sent',quoteNumber:'QT-260818-001',quoteDecision:'Pending',quoteSentAt:'2026-08-18T07:42:00Z',vatRate:15,items:[
  {id:'ITEM-1',type:'Tyre replacement',description:'Continental UltraContact 205/55 R16 - rear right replacement',position:'Rear Right',sku:'CON-UC-2055516',quantity:1,unitPrice:1850,approved:true},
  {id:'ITEM-2',type:'Alignment',description:'Four-wheel alignment after uneven wear finding',quantity:1,unitPrice:650,approved:true},
  {id:'ITEM-3',type:'Balancing',description:'Wheel balancing for replacement tyre',position:'Rear Right',quantity:1,unitPrice:180,approved:true},
 ]},
];

function read<T>(key:string, seed:T):T{if(typeof window==='undefined') return seed;const value=window.localStorage.getItem(key);if(!value){window.localStorage.setItem(key,JSON.stringify(seed));return seed;}try{return JSON.parse(value) as T;}catch{return seed;}}
function write<T>(key:string,value:T){if(typeof window!=='undefined') window.localStorage.setItem(key,JSON.stringify(value));return value;}
export function getNextBookingNumber(bookings:DemoBooking[],date:string){const used=bookings.filter(item=>item.date===date).map(item=>item.bookingNumber??0);return Math.max(0,...used)+1;}
export function formatBookingNumber(booking:DemoBooking){return `#${String(booking.bookingNumber??1).padStart(2,'0')}`;}
export function jobCardSubtotal(card:DemoJobCard){return card.items.filter(i=>i.approved).reduce((sum,i)=>sum+i.quantity*i.unitPrice,0);}
export function jobCardVat(card:DemoJobCard){return jobCardSubtotal(card)*(card.vatRate/100);}
export function jobCardTotal(card:DemoJobCard){return jobCardSubtotal(card)+jobCardVat(card);}

export const workflowStore={
 customers:()=>read(CUSTOMER_KEY,seedCustomers),saveCustomers:(v:DemoCustomer[])=>write(CUSTOMER_KEY,v),
 vehicles:()=>read(VEHICLE_KEY,seedVehicles),saveVehicles:(v:DemoVehicle[])=>write(VEHICLE_KEY,v),
 bookings:()=>read(BOOKING_KEY,seedBookings),saveBookings:(v:DemoBooking[])=>write(BOOKING_KEY,v),
 inspections:()=>read(INSPECTION_KEY,seedInspections),saveInspections:(v:DemoInspection[])=>write(INSPECTION_KEY,v),
 warranty:()=>read(WARRANTY_KEY,seedWarranty),saveWarranty:(v:DemoWarrantyClaim[])=>write(WARRANTY_KEY,v),
 tyreScans:()=>read(TYRE_SCAN_KEY,seedTyreScans),saveTyreScans:(v:DemoTyreScan[])=>write(TYRE_SCAN_KEY,v),
 tpms:()=>read(TPMS_KEY,seedTpms),saveTpms:(v:DemoTpmsReading[])=>write(TPMS_KEY,v),
 devices:()=>read(DEVICE_KEY,seedDevices),saveDevices:(v:DemoDevice[])=>write(DEVICE_KEY,v),
 branches:()=>read(BRANCH_KEY,seedBranches),saveBranches:(v:DemoBranch[])=>write(BRANCH_KEY,v),
 fleets:()=>read(FLEET_KEY,seedFleets),saveFleets:(v:DemoFleet[])=>write(FLEET_KEY,v),
 jobCards:()=>read(JOB_CARD_KEY,seedJobCards),saveJobCards:(v:DemoJobCard[])=>write(JOB_CARD_KEY,v),
};
