import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTask = () => {
  const { id } = useParams()
  const [task, setTask] = useState({
    task_name: '',
    description: '',
    deadlineAt: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:5000/api/task/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        if (res.data.success) {
          const t = res.data.task
          setTask({
            task_name: t.task_name || '',
            description: t.description || '',
            deadlineAt: t.deadlineAt ? t.deadlineAt.slice(0, 16) : '',
          })
        }
      } catch (err) {
        alert('Error fetching task')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `http://localhost:5000/api/task/${id}`,
        task,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      if (res.data.success) {
        alert('Task updated successfully')
        navigate('/admin-dashboard/tasks')
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Update failed')
    }
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
          <div className='bg-white shadow-lg rounded-xl p-6 w-full max-w-md'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
              Edit Task
            </h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Task Name
                </label>
                <input
                  type='text'
                  name='task_name'
                  value={task.task_name}
                  onChange={handleChange}
                  placeholder='Enter Task Name'
                  required
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={task.description}
                  onChange={handleChange}
                  placeholder='Enter Description'
                  rows={4}
                  className='w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Deadline
                </label>
                <input
                  type='datetime-local'
                  name='deadlineAt'
                  value={task.deadlineAt}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default EditTask
