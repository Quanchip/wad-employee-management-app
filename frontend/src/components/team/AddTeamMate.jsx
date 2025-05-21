import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AddTeammate = () => {
  const { id } = useParams() // team id
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [currentTeamMemberIds, setCurrentTeamMemberIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch departments
        const depList = await fetchDepartments()
        setDepartments(depList)

        // Fetch team members
        const res = await axios.get(`http://localhost:5000/api/team/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (res.data.success) {
          const team = res.data.team
          const memberIds = team.employeeIds.map((emp) => emp._id)
          setSelectedEmployees(memberIds)
          setCurrentTeamMemberIds(memberIds)
        }
      } catch (error) {
        console.error('Error loading team or departments', error)
      }
    }

    fetchData()
  }, [id])

  const handleDepartmentChange = async (e) => {
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
  }

  const toggleEmployeeSelection = (empId) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:5000/api/team/updateEmployees/${id}`,
        { employeeIds: selectedEmployees },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (response.data.success) {
        alert('Team members updated successfully!')
        navigate('/admin-dashboard/teams')
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Error updating teammates.')
    }
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Manage Team Members</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block font-medium mb-1'>Select Department</label>
            <select
              className='w-full border p-2 rounded'
              onChange={handleDepartmentChange}
              required
            >
              <option value=''>-- Select Department --</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {employees.length > 0 && (
            <div className='mb-4'>
              <label className='block font-medium mb-2'>
                Select Employees to be in Team
              </label>
              <div className='border rounded p-3 max-h-64 overflow-y-auto bg-white'>
                {employees.map((emp) => (
                  <div key={emp._id} className='flex items-center mb-2'>
                    <input
                      type='checkbox'
                      id={emp._id}
                      value={emp._id}
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => toggleEmployeeSelection(emp._id)}
                      className='mr-2'
                    />
                    <label htmlFor={emp._id}>
                      {emp.employeeId} - {emp.userId?.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTeammate
