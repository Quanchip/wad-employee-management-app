import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx';
import AdminSummary from './components/dashboard/AdminSummary.jsx'; // ✅ Fixed missing import
import DepartmentList from './components/departments/DepartmentList.jsx';
import LeavesList from './components/leaves/LeavesList.jsx';
import Salary from './components/Salary/Salary.jsx';
import Employee from './components/Employee/Employee.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to Login if user is not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard - Protected Route */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        /> 

        <Route index element={<AdminSummary />} />

        {/* Admin Summary - Protected Route (inside Admin Dashboard) */}
        <Route
          path="/admin-dashboard/departments"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <DepartmentList />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        />  

        <Route
          path="/admin-dashboard/leaves"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <LeavesList />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        />  

        <Route
          path="/admin-dashboard/salaries"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <Salary />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        />   

        <Route
          path="/admin-dashboard/salaries"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <Salary />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        /> 
{/* employees */}  

        <Route
          path="/admin-dashboard/employees"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <Employee />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        /> 
        {/* Employee Dashboard - Protected Route */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['employee']}>
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
