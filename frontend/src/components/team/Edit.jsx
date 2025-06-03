import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx'
import { getEmployees } from '../../utils/EmployeeHelper.jsx'

const EditTeam = () => {
  const { id } = useParams()
  const [team, setTeams] = useState({
    team_name : "",
    leaderId: "",
  })
  const [teamLoading, setTeamLoading] = useState(false)
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setTeams({ ...team, [name]: value })
  }

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }

    const fetchTeams = async () => {
      setTeamLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/team/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (response.data.success) {
          setTeams(response.data.team)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setTeamLoading(false)
      }
    }
    fetchTeams()
    getDepartments()
  }, [])

  const handleDepartmentChange = async (e) => {
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put(
        `http://localhost:5000/api/team/${id}`,
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
      {teamLoading ?(
        <div>Loading.....</div>
      ): (
        <div className='p-6 bg-gray-100 min-h-screen'>
          <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Edit team</h2>
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
                    value={team.team_name}
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
                    onChange={handleDepartmentChange}
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
                    value={team.leaderId}
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
                  Edit team
                </button>
              </div>
            </form>
          </div>
        </div>
      ) }
    </>
  )
}
export default EditTeam
