import {
  Activity,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  ClipboardCheck,
  Gauge,
  LayoutDashboard,
  RadioTower,
  ScanLine,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import type { StaffRole } from '../auth/demoAuth';

export interface NavigationItem { label:string; path:string; icon:LucideIcon; roles:StaffRole[]; }
const allOperationalRoles:StaffRole[]=['system-admin','branch-manager','service-advisor','technician','fleet-manager'];
export const navigationItems:NavigationItem[]=[
 {label:'Dashboard',path:'/dashboard',icon:LayoutDashboard,roles:allOperationalRoles},
 {label:'Tyre Health Centre',path:'/lifecycle',icon:Stethoscope,roles:['system-admin','branch-manager','service-advisor','fleet-manager']},
 {label:'Customers',path:'/customers',icon:Users,roles:['system-admin','branch-manager','service-advisor']},
 {label:'Vehicles',path:'/vehicles',icon:Car,roles:allOperationalRoles},
 {label:'Tyres',path:'/tyres',icon:Gauge,roles:allOperationalRoles},
 {label:'Inspections',path:'/inspections',icon:ClipboardCheck,roles:allOperationalRoles},
 {label:'Job Cards',path:'/job-cards',icon:BriefcaseBusiness,roles:['system-admin','branch-manager','service-advisor','technician']},
 {label:'Customer Scan Review',path:'/scan-review',icon:ScanLine,roles:['system-admin','branch-manager','service-advisor','technician']},
 {label:'Devices & TPMS',path:'/devices-tpms',icon:Wifi,roles:['system-admin','branch-manager','technician','fleet-manager']},
 {label:'Fleet & Branches',path:'/fleet',icon:Building2,roles:['system-admin','branch-manager','fleet-manager']},
 {label:'Bookings',path:'/bookings',icon:CalendarDays,roles:['system-admin','branch-manager','service-advisor']},
 {label:'Warranty',path:'/warranty',icon:ShieldCheck,roles:['system-admin','branch-manager']},
 {label:'Notifications',path:'/notifications',icon:Bell,roles:['system-admin','branch-manager','service-advisor','fleet-manager']},
 {label:'Reports',path:'/reports',icon:Activity,roles:['system-admin','branch-manager','fleet-manager']},
 {label:'Integrations',path:'/integrations',icon:RadioTower,roles:['system-admin','branch-manager']},
];
export const settingsNavigationItem:NavigationItem={label:'Settings',path:'/settings',icon:Settings,roles:['system-admin','branch-manager']};
export function getNavigationForRole(role:StaffRole){return navigationItems.filter(item=>item.roles.includes(role));}
export function canRoleAccessPath(role:StaffRole,pathname:string){
 if(pathname.startsWith('/tyres/')) return allOperationalRoles.includes(role);
 if(pathname.startsWith('/inspections/')) return allOperationalRoles.includes(role);
 if(pathname.startsWith('/job-cards/')) return ['system-admin','branch-manager','service-advisor','technician'].includes(role);
 if(pathname===settingsNavigationItem.path) return settingsNavigationItem.roles.includes(role);
 const route=navigationItems.find(item=>item.path===pathname);return route?route.roles.includes(role):pathname==='/dashboard';
}
