import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx';
import AdminSummary from './components/dashboard/AdminSummary.jsx';
import DepartmentList from './components/departments/DepartmentList.jsx';
import LeavesList from './components/leaves/List.jsx';
import List from './components/employee/list.jsx';
import AddDepartment from './components/departments/AddDepartment.jsx';
import EditDepartment from './components/departments/EditDepartment.jsx';
import Add from './components/Employee/Add.jsx';
import View from './components/employee/View.jsx';
import Edit from './components/employee/Edit.jsx';
import AddSalary from './components/Salary/Add.jsx';
import ViewSalary from './components/Salary/View.jsx';
import Summary from './components/employeeDashboard/Summary.jsx';
import AddLeave from './components/leaves/Add.jsx';
import Setting from './components/employeeDashboard/Setting.jsx';
import Table from './components/leaves/Table.jsx';
import Detail from './components/leaves/Detail.jsx';
import MarkAttendance from './components/attendance/MarkAttendance.jsx';
import AttendanceReport from './components/attendance/AttendanceReport.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
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
          <Route path='salary' element={<AddSalary />} />
          <Route path='/admin-dashboard/employees' element={<List />} />
          <Route path='/admin-dashboard/add-employee' element={<Add />} />
          <Route path='/admin-dashboard/employees/:id' element={<View />} />
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />} />
          <Route path='/admin-dashboard/salary/add' element={<AddSalary />} />
          <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />} />
          <Route path="/admin-dashboard/leaves" element={<Table />} />
          <Route path="/admin-dashboard/leaves/:id" element={<Detail />} />
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeavesList />} />
          <Route path="/admin-dashboard/setting" element={<Setting />} />
          <Route path="/admin-dashboard/attendance" element={<MarkAttendance />} />
          <Route path="/admin-dashboard/attendance-report" element={<AttendanceReport />} />
        </Route>
        <Route
          path='/employee-dashboard'
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin', 'employee']}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />} />
          <Route path="/employee-dashboard/profile/:id" element={<View />} />
          <Route path="/employee-dashboard/leaves/:id" element={<LeavesList />} />
          <Route path="/employee-dashboard/add-leave/" element={<AddLeave />} />
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
          <Route path="/employee-dashboard/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;