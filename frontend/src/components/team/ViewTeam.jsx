import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewTeam = () => {
  const { id } = useParams()
  const [team, setTeam] = useState(null)

  useEffect(() => {
    const fetchTeam = async () => {
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
          setTeam(response.data.team)
        } else {
          console.error('Error:', response.data.error)
        }
      } catch (error) {
        console.error('Error fetching team:', error)
        alert(error.response?.data?.error || 'An error occurred')
      }
    }

    fetchTeam()
  }, [id])

  if (!team) {
    return <div className='text-center mt-20 text-xl'>Loading ...</div>
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
        <h2 className='text-3xl font-bold mb-8 text-center text-teal-700'>
          Team Details
        </h2>

        <div className='space-y-5'>
          <DetailRow label='Team Name' value={team.team_name} />
          <DetailRow label='Leader' value={team.leaderId?.userId?.name} />
          <DetailRow label='No of Members' value={team.noOfMembers} />

          <div className='mb-4'>
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Team Members:
            </h3>
            {Array.isArray(team.employeeIds) && team.employeeIds.length > 0 ? (
              <ul className='list-disc list-inside'>
                {team.employeeIds.map((emp) => (
                  <li key={emp._id}>
                    {emp.userId?.name || 'Unnamed'} ({emp.employeeId || 'No ID'}
                    )
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members assigned.</p>
            )}
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Tasks Assigned:
            </h3>
            {Array.isArray(team.tasks) && team.tasks.length > 0 ? (
              <ul className='list-disc list-inside'>
                {team.tasks.map((task) => (
                  <li key={task._id}>{task.task_name || 'Unnamed Task'}</li>
                ))}
              </ul>
            ) : (
              <p>No tasks assigned.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailRow = ({ label, value }) => (
  <div className='flex justify-between border-b pb-2'>
    <span className='font-semibold text-gray-700'>{label}:</span>
    <span className='text-gray-900'>{value || 'N/A'}</span>
  </div>
)

export default ViewTeam
