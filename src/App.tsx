import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import BookingCreatePage from './pages/BookingCreatePage';
import BookingWorkspacePage from './pages/BookingWorkspacePage';
import BookingsPage from './pages/BookingsPage';
import CustomerAccessPage from './pages/CustomerAccessPage';
import CustomerPortalPage from './pages/CustomerPortalPage';
import CustomerWorkspacePage from './pages/CustomerWorkspacePage';
import CustomersPage from './pages/CustomersPage';
import DashboardPage from './pages/DashboardPage';
import DevicesTpmsPage from './pages/DevicesTpmsPage';
import FleetOperationsPage from './pages/FleetOperationsPage';
import InspectionWorkspacePage from './pages/InspectionWorkspacePage';
import InspectionsPage from './pages/InspectionsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import JobCardsPage from './pages/JobCardsPage';
import JobCardWorkspacePage from './pages/JobCardWorkspacePage';
import LifecycleCentrePage from './pages/LifecycleCentrePage';
import LifecycleOperationsPage from './pages/LifecycleOperationsPage';
import LoginPage from './pages/LoginPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import ScanReviewPage from './pages/ScanReviewPage';
import SettingsPage from './pages/SettingsPage';
import TyreFitmentPage from './pages/TyreFitmentPage';
import TyrePassportPage from './pages/TyrePassportPage';
import TyresPage from './pages/TyresPage';
import VehicleCreatePage from './pages/VehicleCreatePage';
import VehicleInspectionPage from './pages/VehicleInspectionPage';
import VehicleWorkspacePage from './pages/VehicleWorkspacePage';
import VehiclesPage from './pages/VehiclesPage';
import WarrantyCreatePage from './pages/WarrantyCreatePage';
import WarrantyClaimPage from './pages/WarrantyClaimPage';
import WarrantyPage from './pages/WarrantyPage';

export default function App(){return <Routes>
 <Route path="/" element={<Navigate to="/login" replace/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/customer-access" element={<CustomerAccessPage/>}/><Route path="/customer-portal" element={<CustomerPortalPage/>}/>
 <Route element={<AppShell/>}>
  <Route path="/dashboard" element={<DashboardPage/>}/><Route path="/lifecycle" element={<LifecycleCentrePage/>}/><Route path="/lifecycle-operations" element={<LifecycleOperationsPage/>}/>
  <Route path="/customers" element={<CustomersPage/>}/><Route path="/customers/:customerId" element={<CustomerWorkspacePage/>}/>
  <Route path="/vehicles" element={<VehiclesPage/>}/><Route path="/vehicles/new" element={<VehicleCreatePage/>}/><Route path="/vehicles/:vehicleId" element={<VehicleWorkspacePage/>}/>
  <Route path="/tyres" element={<TyresPage/>}/><Route path="/tyres/fitment/new" element={<TyreFitmentPage/>}/><Route path="/tyres/:tyreId" element={<TyrePassportPage/>}/>
  <Route path="/inspections" element={<InspectionsPage/>}/><Route path="/inspections/vehicle/new" element={<VehicleInspectionPage/>}/><Route path="/inspections/:inspectionId" element={<InspectionWorkspacePage/>}/>
  <Route path="/job-cards" element={<JobCardsPage/>}/><Route path="/job-cards/:jobCardId" element={<JobCardWorkspacePage/>}/>
  <Route path="/scan-review" element={<ScanReviewPage/>}/><Route path="/devices-tpms" element={<DevicesTpmsPage/>}/><Route path="/fleet" element={<FleetOperationsPage/>}/>
  <Route path="/bookings" element={<BookingsPage/>}/><Route path="/bookings/new" element={<BookingCreatePage/>}/><Route path="/bookings/:bookingId" element={<BookingWorkspacePage/>}/>
  <Route path="/warranty" element={<WarrantyPage/>}/><Route path="/warranty/new" element={<WarrantyCreatePage/>}/><Route path="/warranty/:claimId" element={<WarrantyClaimPage/>}/><Route path="/notifications" element={<NotificationsPage/>}/><Route path="/reports" element={<ReportsPage/>}/><Route path="/integrations" element={<IntegrationsPage/>}/><Route path="/settings" element={<SettingsPage/>}/>
 </Route><Route path="*" element={<Navigate to="/login" replace/>}/>
 </Routes>}
