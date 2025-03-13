import React from 'react'
import { useAuth } from '../context/authContext'



const EmployeeDashboard = () => {
  const {user} = useAuth()

  return (
    <div className="flex-1 ml-64 bg-grey-100 h-screen">
      <div>Employee Dashboard {user.Name}</div>
    </div>
  )
}

export default EmployeeDashboard
