import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to Login first if user is not authenticated */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          } 
        />

        <Route 
          path="/employee-dashboard" 
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
