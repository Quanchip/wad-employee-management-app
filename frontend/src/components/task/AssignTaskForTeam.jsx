import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AssignTaskForTeam = () => {
  const { id } = useParams()
  const [task, setTask] = useState({
    teamId: '',
    assignAt: '',
    deadlineAt: '',
  })
  const [teams, setTeams] = useState([])
  const [taskLoading, setTaskLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/team', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (res.data.success) {
          setTeams(res.data.teams)
        }
      } catch (error) {
        console.error('Failed to fetch teams', error)
      }
    }

    const fetchTask = async () => {
      setTaskLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/task/team/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (response.data.success) {
          setTask((prevTask) => ({
            ...prevTask,
            ...response.data.task,
            assignAt: response.data.task.assignAt
              ? new Date(response.data.task.assignAt).toISOString().slice(0, 16)
              : new Date().toISOString().slice(0, 16),
          }))
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setTaskLoading(false)
      }
    }

    fetchTeams()
    fetchTask()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Data before sending:', task)
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/assign/team/${id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.data.success) {
        try {
          await axios.post(
            `http://localhost:5000/api/mail/send-task-notify/team/${id}`,
            task,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
        } catch (error) {}
        navigate('/admin-dashboard/tasks')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Assign Task to Team</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Team */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Team
              </label>
              <select
                name='teamId'
                onChange={handleChange}
                value={task.teamId}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                required
              >
                <option value=''>Select Team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assign At */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Assign At
              </label>
              <input
                type='datetime-local'
                name='assignAt'
                value={task.assignAt}
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Deadline
              </label>
              <input
                type='datetime-local'
                name='deadlineAt'
                value={task.deadlineAt}
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                required
              />
            </div>
          </div>

          <div className='mt-6'>
            <button
              type='submit'
              className='w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'
            >
              Assign Team
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssignTaskForTeam
