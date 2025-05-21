import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getEmployees } from '../../utils/EmployeeHelper.jsx'

const AddTeam = () => {
  const [team, setTeam] = useState({
    team_name: '',
    leaderId: '',
  })
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments()
  }, [])

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setTeam({ ...team, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/team/add',
        team,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (response.data.success) {
        navigate('/admin-dashboard/teams')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }
  return (
    <>
      {departments ? (
        <div className='p-6 bg-gray-100 min-h-screen'>
          <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add team</h2>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='team_name'
                    className='block text-gray-700 font-medium mb-1'
                  >
                    Team Name
                  </label>
                  <input
                    type='text'
                    name='team_name'
                    onChange={handleChange}
                    placeholder='Enter Team Name'
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Department
                  </label>
                  <select
                    name='department'
                    onChange={handleDepartment}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    required
                  >
                    <option value=''>Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.dep_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Employee */}
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Leader
                  </label>
                  <select
                    name='leaderId'
                    onChange={handleChange}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    required
                  >
                    <option value=''>Select Leader</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.employeeId} - {emp.userId?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'
                >
                  Add team
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading.....</div>
      )}
    </>
  )
}

export default AddTeam
