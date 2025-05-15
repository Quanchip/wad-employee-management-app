import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
const AddTask = () => {
    const [task, setTask] = useState({
        task_name:'',
        description:''

    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask({...task, [name] :value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/task/add', task, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/tasks")
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-xl p-6 w-full max-w-md'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
          Add Task
        </h3>

        <form className='space-y-4' onSubmit={handleSubmit}>
          {/* Task Name */}
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
              placeholder='Enter Task Name'
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
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
