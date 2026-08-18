import {
  Activity,
  Bell,
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
const allStaffRoles:StaffRole[]=['system-admin','branch-manager','service-advisor','technician'];
export const navigationItems:NavigationItem[]=[
 {label:'Dashboard',path:'/dashboard',icon:LayoutDashboard,roles:allStaffRoles},
 {label:'Tyre Health Centre',path:'/lifecycle',icon:Stethoscope,roles:['system-admin','branch-manager','service-advisor']},
 {label:'Customers',path:'/customers',icon:Users,roles:['system-admin','branch-manager','service-advisor']},
 {label:'Vehicles',path:'/vehicles',icon:Car,roles:allStaffRoles},
 {label:'Tyres',path:'/tyres',icon:Gauge,roles:allStaffRoles},
 {label:'Inspections',path:'/inspections',icon:ClipboardCheck,roles:allStaffRoles},
 {label:'Customer Scan Review',path:'/scan-review',icon:ScanLine,roles:['system-admin','branch-manager','service-advisor','technician']},
 {label:'Devices & TPMS',path:'/devices-tpms',icon:Wifi,roles:['system-admin','branch-manager','technician']},
 {label:'Fleet & Branches',path:'/fleet',icon:Building2,roles:['system-admin','branch-manager']},
 {label:'Bookings',path:'/bookings',icon:CalendarDays,roles:['system-admin','branch-manager','service-advisor']},
 {label:'Warranty',path:'/warranty',icon:ShieldCheck,roles:['system-admin','branch-manager']},
 {label:'Notifications',path:'/notifications',icon:Bell,roles:['system-admin','branch-manager','service-advisor']},
 {label:'Reports',path:'/reports',icon:Activity,roles:['system-admin','branch-manager']},
 {label:'Integrations',path:'/integrations',icon:RadioTower,roles:['system-admin','branch-manager']},
];
export const settingsNavigationItem:NavigationItem={label:'Settings',path:'/settings',icon:Settings,roles:['system-admin','branch-manager']};
export function getNavigationForRole(role:StaffRole){return navigationItems.filter(item=>item.roles.includes(role));}
export function canRoleAccessPath(role:StaffRole,pathname:string){
 if(pathname.startsWith('/tyres/')) return allStaffRoles.includes(role);
 if(pathname.startsWith('/inspections/')) return allStaffRoles.includes(role);
 if(pathname===settingsNavigationItem.path) return settingsNavigationItem.roles.includes(role);
 const route=navigationItems.find(item=>item.path===pathname);return route?route.roles.includes(role):pathname==='/dashboard';
}
