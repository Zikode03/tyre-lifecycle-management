export type StaffRole = 'system-admin' | 'branch-manager' | 'service-advisor' | 'technician';

export interface DemoStaffUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  password: string;
  role: StaffRole;
  roleLabel: string;
  branch: string;
}

/**
 * Frontend-only users used while the ASP.NET Core identity backend is not connected.
 * These accounts make it possible to test role journeys and navigation now.
 * Passwords must be removed from the frontend once real authentication is introduced.
 */
export const demoStaffUsers: DemoStaffUser[] = [
  {
    id: 'USR-ADMIN-001',
    name: 'System Administrator',
    initials: 'SA',
    email: 'admin@tyretrack.co.za',
    password: 'TyreTrack@2026',
    role: 'system-admin',
    roleLabel: 'System Administrator',
    branch: 'Platform Administration',
  },
  {
    id: 'USR-MANAGER-001',
    name: 'N. Mthembu',
    initials: 'NM',
    email: 'manager@tyretrack.co.za',
    password: 'TyreTrack@2026',
    role: 'branch-manager',
    roleLabel: 'Branch Manager',
    branch: 'Durban Central',
  },
  {
    id: 'USR-ADVISOR-001',
    name: 'L. Dlamini',
    initials: 'LD',
    email: 'advisor@tyretrack.co.za',
    password: 'TyreTrack@2026',
    role: 'service-advisor',
    roleLabel: 'Service Advisor',
    branch: 'Durban Central',
  },
  {
    id: 'USR-TECH-001',
    name: 'S. Khumalo',
    initials: 'SK',
    email: 'technician@tyretrack.co.za',
    password: 'TyreTrack@2026',
    role: 'technician',
    roleLabel: 'Technician / Tyre Fitter',
    branch: 'Durban Central',
  },
];

const STORAGE_KEY = 'tyretrack-demo-user';

export function authenticateDemoStaff(email: string, password: string) {
  return demoStaffUsers.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
  ) ?? null;
}

export function saveDemoStaffSession(user: DemoStaffUser) {
  // Never persist the demo password in browser storage.
  const { password: _password, ...safeUser } = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
}

export function getDemoStaffSession(): Omit<DemoStaffUser, 'password'> | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Omit<DemoStaffUser, 'password'>;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearDemoStaffSession() {
  localStorage.removeItem(STORAGE_KEY);
}
