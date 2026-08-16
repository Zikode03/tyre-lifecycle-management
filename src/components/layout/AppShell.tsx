import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getDemoStaffSession } from '../../auth/demoAuth';
import { canRoleAccessPath } from '../../config/navigation';
import { MobileDrawer } from './MobileDrawer';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = getDemoStaffSession();

  // Frontend route guard for the prototype. The backend will later enforce the same rule server-side.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canRoleAccessPath(user.role, location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-canvas">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className={`transition-[margin] duration-300 ${collapsed ? 'lg:ml-[84px]' : 'lg:ml-[264px]'}`}>
        <Topbar onOpenMobileMenu={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
