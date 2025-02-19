import React from 'react'
import { useAuth } from '../context/authContext'



const EmployeeDashboard = () => {
  const {user} = useAuth()

  return (
    <div>
      <div>Employee Dashboard {user.Name}</div>
    </div>
  )
}

export default EmployeeDashboard
