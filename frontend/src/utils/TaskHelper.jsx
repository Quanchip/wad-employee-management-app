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
    name: 'Task For',
    selector: (row) => (row.task_for === 'team' ? 'Team' : 'Personal'),
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
    name: 'Task For',
    selector: (row) => (row.task_for === 'team' ? 'Team' : 'Personal'),
    sortable: true,
  },

  {
    name: 'Completed',
    selector: (row) => row.task_complete,
    sortable: true,
  },

  {
    name: 'Action',
    selector: (row) => row.action,
  },
]

export const TaskButtons = ({ _id, task_for, onTaskDelete }) => {
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const confirm = window.confirm('Do you want to delete')
    if (confirm) {
      try {
        const url =
          task_for === 'team'
            ? `http://localhost:5000/api/task/team/${id}`
            : `http://localhost:5000/api/task/${id}`

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.data.success) {
          onTaskDelete(id)
        }
      } catch (error) {
        alert(error?.response?.data?.error || 'Delete failed')
      }
    }
  }

  return (
    <div className='flex space-x-3'>
      <button
        className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded'
        onClick={() => navigate(`/admin-dashboard/task/${task_for}/${_id}`)}
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
        onClick={() =>
          navigate(
            task_for === 'team'
              ? `/admin-dashboard/task/assign/team/${_id}`
              : `/admin-dashboard/task/assign/${_id}`
          )
        }
      >
        Assign
      </button>

      <button
        className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded'
        onClick={() =>
          navigate(`/admin-dashboard/task/view/${task_for}/${_id}`)
        }
      >
        View
      </button>
    </div>
  )
}

export const TaskButtonsEmployee = ({
  _id,
  onTaskUpdateComplete,
  task_for,
}) => {
  const navigate = useNavigate()
  const handleAssign = async (id) => {
    const confirm = window.confirm('Do you want to mark the task as completed?')
    if (confirm) {
      try {
        const url =
          task_for === 'team'
            ? `http://localhost:5000/api/task/team/emp/markDone/${id}`
            : `http://localhost:5000/api/task/emp/markDone/${id}`

        const response = await axios.put(
          url,
          {},
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
        alert(error?.response?.data?.error || 'Mark done failed')
      }
    }
  }

  return (
    <div className='flex space-x-3'>
      <button
        className='px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded'
        onClick={() => handleAssign(_id)}
      >
        Mark done
      </button>

      <button
        className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded'
        onClick={() =>
          navigate(
            task_for === 'team'
              ? `/employee-dashboard/task/view/team/${_id}`
              : `/employee-dashboard/task/view/${_id}`
          )
        }
      >
        View Detail
      </button>
    </div>
  )
}
