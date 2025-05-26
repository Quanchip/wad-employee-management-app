import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewTask = () => {
  const { task_for, id } = useParams()
  const [task, setTask] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const url =
          task_for === 'team'
            ? `http://localhost:5000/api/task/team/${id}`
            : `http://localhost:5000/api/task/${id}`

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.data.success) {
          setTask(response.data.task)
        } else {
          console.error('Error:', response.data.error)
        }
      } catch (error) {
        console.error('Error fetching task:', error)
        alert(error.response?.data?.error || 'An error occurred')
      }
    }

    fetchTask()
  }, [id, task_for])

  if (!task) {
    return <div className='text-center mt-20 text-xl'>Loading ...</div>
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
        <h2 className='text-3xl font-bold mb-8 text-center text-teal-700'>
          Task Details
        </h2>

        <div className='space-y-5'>
          <DetailRow label='Task Name' value={task.task_name} />
          <DetailRow label='Description' value={task.description} />
          <DetailRow
            label={task_for === 'team' ? 'Assigned Team' : 'Assigned Employee'}
            value={
              task_for === 'team'
                ? `${task.teamId?.team_name || 'No team assigned'} - Leader: ${
                    task.teamId?.leaderId?.userId?.name || 'No leader'
                  }`
                : task.employeeId?.userId?.name || 'No employee assigned'
            }
          />
          <DetailRow
            label='Assign At'
            value={
              task.assignAt
                ? new Date(task.assignAt).toLocaleString()
                : 'Not assigned'
            }
          />
          <DetailRow
            label='Deadline At'
            value={
              task.deadlineAt
                ? new Date(task.deadlineAt).toLocaleString()
                : 'No deadline'
            }
          />
          <DetailRow
            label='Return At'
            value={
              task.returnAt
                ? new Date(task.returnAt).toLocaleString()
                : 'Not returned'
            }
          />
          <DetailRow label='Status' value={task.status} />
          <DetailRow
            label='Created At'
            value={
              task.createAt ? new Date(task.createAt).toLocaleString() : 'N/A'
            }
          />
          <DetailRow
            label='Updated At'
            value={
              task.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'N/A'
            }
          />
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

export default ViewTask
