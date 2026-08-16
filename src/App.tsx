import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import BookingsPage from './pages/BookingsPage';
import CustomerAccessPage from './pages/CustomerAccessPage';
import CustomerPortalPage from './pages/CustomerPortalPage';
import CustomersPage from './pages/CustomersPage';
import DashboardPage from './pages/DashboardPage';
import GenericPage from './pages/GenericPage';
import InspectionsPage from './pages/InspectionsPage';
import LifecycleCentrePage from './pages/LifecycleCentrePage';
import LoginPage from './pages/LoginPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import TyrePassportPage from './pages/TyrePassportPage';
import TyresPage from './pages/TyresPage';
import VehiclesPage from './pages/VehiclesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/customer-access" element={<CustomerAccessPage />} />
      <Route path="/customer-portal" element={<CustomerPortalPage />} />

      {/* AppShell currently provides the frontend route guard until backend identity is connected. */}
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/lifecycle" element={<LifecycleCentrePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/tyres" element={<TyresPage />} />
        <Route path="/tyres/:tyreId" element={<TyrePassportPage />} />
        <Route path="/inspections" element={<InspectionsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/warranty" element={<GenericPage title="Warranty management" description="Review tyre warranty coverage, evidence, claims and manufacturer decisions." />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<GenericPage title="System settings" description="Manage branches, users, permissions, reminder rules and organisation preferences." />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
