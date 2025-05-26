import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddTask = () => {
  const [task, setTask] = useState({
    task_name: '',
    description: '',
  })

  const [mode, setMode] = useState('personal') // "personal" or "team"

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask({ ...task, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const endpoint =
        mode === 'team'
          ? 'http://localhost:5000/api/task/add-team'
          : 'http://localhost:5000/api/task/add'

      const response = await axios.post(endpoint, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.data.success) {
        alert('Add task successfully!')
        navigate('/admin-dashboard/tasks')
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding task')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-xl p-6 w-full max-w-md'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
          Add Task
        </h3>

        <form className='space-y-4' onSubmit={handleSubmit}>
          {/* Switch Task Mode */}
          <div className='flex justify-center gap-4 mb-4'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='mode'
                value='personal'
                checked={mode === 'personal'}
                onChange={() => setMode('personal')}
                className='mr-2'
              />
              Personal
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='mode'
                value='team'
                checked={mode === 'team'}
                onChange={() => setMode('team')}
                className='mr-2'
              />
              Team
            </label>
          </div>

          {/* Task Name */}
          <div>
            <label
              htmlFor='task_name'
              className='block text-gray-700 font-medium mb-1'
            >
              Task Name
            </label>
            <input
              type='text'
              name='task_name'
              onChange={handleChange}
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
              className='w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none'
              rows='4'
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTask
