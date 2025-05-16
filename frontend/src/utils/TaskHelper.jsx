import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const columns = [
  {
    name: 'S NO',
    selector: (row) => row.sno,
  },
  {
    name: 'Task Name',
    selector: (row) => row.task_name,
    sortable: true,
  },

  {
    name: 'Responsible Employee',
    selector: (row) => row.employee_name,
    sortable: true,
  },

  {
    name: 'Action',
    selector: (row) => row.action,
  },
]


export const columnsforEmployee = [
  {
    name: 'S NO',
    selector: (row) => row.sno,
  },
  {
    name: 'Task Name',
    selector: (row) => row.task_name,
    sortable: true,
  },

  {
    name: 'Action',
    selector: (row) => row.action,
  },
]

export const TaskButtons = ({ _id, onTaskDelete }) => {
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const confirm = window.confirm('Do you want to delete')
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/task/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.data.success) {
          onTaskDelete(id)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    }
  }

  return (
    <div className='flex space-x-3'>
      <button
        className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded'
        onClick={() => navigate(`/admin-dashboard/task/${_id}`)}
      >
        Edit
      </button>

      <button
        className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded'
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>

      <button
        className='px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded'
        onClick={() => navigate(`/admin-dashboard/task/assign/${_id}`)}
      >
        Assign
      </button>

      <button
        className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded'
        onClick={() => navigate(`/admin-dashboard/task/view/${_id}`)}
      >
        View
      </button>
    </div>
  )
}

export const TaskButtonsEmployee = ({ _id, onTaskUpdateComplete }) => {
  const navigate = useNavigate()
  const handleAssign = async(_id) => {
    const confirm = window.confirm('Do you want to mark the task as completed?')
    if(confirm) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/task/emp/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.data.success) {
          onTaskUpdateComplete(id)
        }
      } catch (error) {
        
      }
    }
  }

  return (
    <div className='flex space-x-3'>
      <button
        className='px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded'
        onClick={() => handleAssign(_id)}
      >
        Assign
      </button>

      <button
        className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded'
        onClick={() => navigate(`/admin-dashboard/task/view/${_id}`)}
      >
        View
      </button>
    </div>
  )
}

