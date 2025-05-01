import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const View = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        
        if (response.data.success) {
          setEmployee(response.data.employee)
        } else {
          console.error("Error:", response.data.error)
        }
      } catch (error) {
        console.error("Error fetching employee:", error)
        if (error.response) {
          alert(error.response.data.error || 'An error occurred');
        } else {
          alert('Network error');
        }
      }
    }

    fetchEmployee()
  }, [id])

  if (!employee) {
    return <div>Loading ...</div>
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-xl">
        <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Check if profile image exists before rendering */}
            {employee.userId?.profileImage ? (
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Employee Profile"
                className="rounded-full border w-72"
              />
            ) : (
              <div>No profile image available</div>
            )}
          </div>

          <div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Name:</p>
              <p className="font-medium">{employee.userId?.name || 'N/A'}</p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Employee ID:</p>
              <p className="font-medium">{employee.employeeId || 'N/A'}</p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Date of Birth:</p>
              <p className="font-medium">
                {employee.dob ? new Date(employee.dob).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Gender:</p>
              <p className="font-medium">{employee.gender || 'N/A'}</p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Department:</p>
              <p className="font-medium">
                {employee.department?.dep_name || 'No department assigned'}
              </p>
            </div>
            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Marital Status:</p>
              <p className="font-medium">{employee.maritalStatus || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View
