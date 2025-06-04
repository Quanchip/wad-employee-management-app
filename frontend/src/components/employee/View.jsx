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
    return <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">Loading ...</div>
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-blue-700 tracking-tight">Employee Details</h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex flex-col items-center w-full md:w-1/3">
            {employee.userId?.profileImage ? (
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Employee Profile"
                className="rounded-full border-4 border-blue-300 shadow-lg w-48 h-48 object-cover mb-4"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center rounded-full bg-gray-200 text-gray-400 text-2xl mb-4">
                No image
              </div>
            )}
            <p className="text-xl font-semibold text-blue-800 mt-2">{employee.userId?.name || 'N/A'}</p>
            {/* <p className="text-sm text-gray-500">{employee.department?.dep_name || 'No department assigned'}</p> */}
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <span className="w-40 font-bold text-gray-700">Employee ID:</span>
              <span className="text-gray-800 font-medium">{employee.employeeId || 'N/A'}</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <span className="w-40 font-bold text-gray-700">Date of Birth:</span>
              <span className="text-gray-800 font-medium">{employee.dob ? new Date(employee.dob).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <span className="w-40 font-bold text-gray-700">Gender:</span>
              <span className="text-gray-800 font-medium">{employee.gender || 'N/A'}</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <span className="w-40 font-bold text-gray-700">Department:</span>
              <span className="text-gray-800 font-medium">{employee.department?.dep_name || 'No department assigned'}</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <span className="w-40 font-bold text-gray-700">Marital Status:</span>
              <span className="text-gray-800 font-medium">{employee.maritalStatus || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View
