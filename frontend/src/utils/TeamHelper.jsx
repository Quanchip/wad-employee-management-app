import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const columns = [
  {
    name: 'S NO',
    selector: (row) => row.sno,
    width: '100px',
  },
  {
    name: 'Team Name',
    selector: (row) => row.team_name,
    sortable: true,
    width: '200px',
  },

  {
    name: 'Leader Name',
    selector: (row) => row.leader_name,
    sortable: true,
    width: '240px',
  },

  {
    name: 'Number of Members',
    selector: (row) => row.no_of_memebers,
    sortable: true,
    width: '180px',
  },

  {
    name: 'Action',
    selector: (row) => row.action,
    width: '500px',
  },
]

export const TeamButtons = ({ _id, onTeamDelete }) => {
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const confirm = window.confirm('Do you want to delete')
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/team/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.data.success) {
          onTeamDelete(id)
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
        onClick={() => navigate(`/admin-dashboard/team/${_id}`)}
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
        onClick={() => navigate(`/admin-dashboard/add-teammate/${_id}`)}
      >
        Adding teammate
      </button>

      <button
        className='px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded'
        onClick={() => navigate(`/admin-dashboard/team/view/${_id}`)}
      >
        View
      </button>

      <button
        className='px-3 py-1 bg-pink-600 hover:bg-green-700 text-white rounded'
        onClick={() => navigate(`/admin-dashboard/team/addingTeammate/${_id}`)}
      >
        Adding teammate
      </button>
    </div>
  )
}
