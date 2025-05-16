import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTask = () => {
  const { id } = useParams()
  const [task, setTasks] = useState([])
  const [taskLoading, setTaskLoading] = useState(false)
  const navigate  = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setTasks({ ...task, [name]: value })
  }

  useEffect(() => {
    const fetchTasks = async () => {
        setTaskLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/task/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (response.data.success) {
            setTasks(response.data.task)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setTaskLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/${id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (response.data.success) {
        navigate('/admin-dashboard/tasks')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }

  return (
    <>
      {taskLoading ? (
        <div> Loading........</div>
      ) : (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
          <div className='bg-white shadow-lg rounded-xl p-6 w-full max-w-md'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
              Edit Task
            </h3>

            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='task_name'
                  className='block text-gray-700 font-medium mb-1'
                >
                  Department Name
                </label>
                <input
                  type='text'
                  name='task_name'
                  onChange={handleChange}
                  value={task.task_name}
                  placeholder='Enter Task Name'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor='description'
                  className='block text-gray-700 font-medium mb-1'
                >
                  Description
                </label>
                <textarea
                  name='description'
                  placeholder='Enter Description'
                  onChange={handleChange}
                  value={task.description}
                  className='w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  rows='4'
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Edit Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default EditTask
