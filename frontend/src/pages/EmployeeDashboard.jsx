import React from 'react'
import { useAuth } from '../context/authContext'
import Sidebar from '../components/employeeDashboard/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar.jsx'
const EmployeeDashboard = () => {
  const {user} = useAuth()

  return (
    <div className="flex"> 
      <Sidebar /> 
        <div className="flex-1 ml-64 bg-grey-100 h-screen">
          <Navbar />  
          <Outlet />
        </div>

    </div>
  )
}

export default EmployeeDashboard
