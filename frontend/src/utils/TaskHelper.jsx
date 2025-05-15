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
    sortable : true
  },

  {
    name: 'Responsible Employee',
    selector: (row) => row.employee_name,
    sortable : true
  },

  {
    name: 'Action',
    selector: (row) => row.action,
  },
];

export const TaskButtons = ({ _id, onTaskDelete}) => {
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete")
    if(confirm) {
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
        className='px-3 py-1 bg-teal-600 text-white'
        onClick={() => navigate(`/admin-dashboard/task/${_id}`)}
      >
        {' '}
        Edit
      </button>

      <button
        className='px-3 py-1 bg-red-600 text-white'
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  )
};
