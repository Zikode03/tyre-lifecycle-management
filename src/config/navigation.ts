import {
  Activity,
  Bell,
  CalendarDays,
  Car,
  ClipboardCheck,
  Gauge,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { StaffRole } from '../auth/demoAuth';

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: StaffRole[];
}

const allStaffRoles: StaffRole[] = ['system-admin', 'branch-manager', 'service-advisor', 'technician'];

/**
 * Navigation is defined once here so desktop and mobile menus always enforce
 * the same role visibility rules during frontend prototyping.
 */
export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: allStaffRoles },
  { label: 'Customers', path: '/customers', icon: Users, roles: ['system-admin', 'branch-manager', 'service-advisor'] },
  { label: 'Vehicles', path: '/vehicles', icon: Car, roles: allStaffRoles },
  { label: 'Tyres', path: '/tyres', icon: Gauge, roles: allStaffRoles },
  { label: 'Inspections', path: '/inspections', icon: ClipboardCheck, roles: allStaffRoles },
  { label: 'Bookings', path: '/bookings', icon: CalendarDays, roles: ['system-admin', 'branch-manager', 'service-advisor'] },
  { label: 'Warranty', path: '/warranty', icon: ShieldCheck, roles: ['system-admin', 'branch-manager'] },
  { label: 'Notifications', path: '/notifications', icon: Bell, roles: ['system-admin', 'branch-manager', 'service-advisor'] },
  { label: 'Reports', path: '/reports', icon: Activity, roles: ['system-admin', 'branch-manager'] },
];

export const settingsNavigationItem: NavigationItem = {
  label: 'Settings',
  path: '/settings',
  icon: Settings,
  roles: ['system-admin', 'branch-manager'],
};

export function getNavigationForRole(role: StaffRole) {
  return navigationItems.filter((item) => item.roles.includes(role));
}
