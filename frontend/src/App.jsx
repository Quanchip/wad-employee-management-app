import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'
import AdminSummary from './components/dashboard/AdminSummary.jsx'
import DepartmentList from './components/departments/DepartmentList.jsx'
import LeavesList from './components/leaves/LeavesList.jsx'
// import Salary from './components/Salary/Salary.jsx'
import List from './components/employee/list.jsx'
import AddDepartment from './components/departments/AddDepartment.jsx'
import EditDepartment from './components/departments/EditDepartment.jsx'
import Add from './components/Employee/Add.jsx'
import View from './components/employee/View.jsx'
import Edit from './components/employee/Edit.jsx'
import AddSalary from './components/Salary/Add.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to Login if user is not authenticated */}
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Dashboard - Nested Routes */}
        <Route
          path='/admin-dashboard'
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path='departments' element={<DepartmentList />} />
          <Route path='add-department' element={<AddDepartment />} />
          <Route path='department/:id' element={<EditDepartment />} />
          <Route path='leaves' element={<LeavesList />} />
          <Route path='salary' element={<AddSalary />} />

      
          <Route path='/admin-dashboard/employees' element={<List />} />
          <Route path='/admin-dashboard/add-employee' element={<Add />} />
          <Route path='/admin-dashboard/employees/:id' element={<View />} />
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />} /> 
          <Route path='/admin-dashboard/salary/add' element={<AddSalary />} />

        </Route>

        {/* Employee Dashboard - Protected Route */}
        <Route
          path='/employee-dashboard'
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
  )
}

export default App
