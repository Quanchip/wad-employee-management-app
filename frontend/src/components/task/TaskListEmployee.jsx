import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  columnsforEmployee,
  TaskButtonsEmployee,
} from '../../utils/TaskHelper.jsx'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const TaskListEmployee = () => {
  const [tasks, setTasks] = useState([])
  const [taskloading, setTaskLoading] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [taskType, setTaskType] = useState('personalTask')
  const { id } = useParams()
  const [isLeader, setIsLeader] = useState(false)

  const fetchTasks = async () => {
    setTaskLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `http://localhost:5000/api/task/${taskType}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        let sno = 1
        const data = response.data.task.map((task) => {
          const task_for = taskType === 'teamTask' ? 'team' : 'personal'
          return {
            _id: task._id,
            sno: sno++,
            task_name: task.task_name,
            complete: task.complete,
            task_for,
            isLeader,
            action: (
              <TaskButtonsEmployee
                _id={task._id}
                onTaskUpdateComplete={onTaskUpdateComplete}
                task_for={task_for}
                isLeader={isLeader}
              />
            ),
          }
        })
        setTasks(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setTaskLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [taskType, isLeader])


  useEffect(() => {
    const checkLeaderStatus = async () => {
      if (taskType === 'teamTask') {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get(
            `http://localhost:5000/api/team/check-leader/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          if (response.data.success) {
            setIsLeader(response.data.isLeader)
          }
        } catch (error) {
          console.error('Failed to check leader status', error)
          setIsLeader(false)
        }
      } else {
        setIsLeader(false)
      }
    }

    checkLeaderStatus()
  }, [taskType, id])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTasks(tasks)
    } else {
      setFilteredTasks(
        tasks.filter((task) =>
          task.task_name.toLowerCase().includes(searchQuery)
        )
      )
    }
  }, [tasks, searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const onTaskUpdateComplete = async (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id
          ? {
              ...task,
              complete: (
                <span className='text-2xl text-green-600'>✅</span>
              ),
            }
          : task
      )
    )
  }

  return (
    <>
      {taskloading ? (
        <div className='text-center text-lg font-semibold'>Loading...</div>
      ) : (
        <div className='p-6 bg-gray-50 min-h-screen'>
          <div className='p-5'>
            <div className='text-center mb-4'>
              <h3 className='text-2xl font-bold'>Manage Tasks</h3>
            </div>

            {/* Switch buttons */}
            <div className='flex gap-3 mb-4 justify-center'>
              <button
                onClick={() => setTaskType('personalTask')}
                className={`px-4 py-2 rounded ${
                  taskType === 'personalTask'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                Personal Tasks
              </button>
              <button
                onClick={() => setTaskType('teamTask')}
                className={`px-4 py-2 rounded ${
                  taskType === 'teamTask'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                Team Tasks
              </button>
            </div>

            {/* Search */}
            <div className='flex justify-between items-center my-4'>
              <input
                type='text'
                placeholder='Search by Task Name'
                className='px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            {/* Data Table */}
            <div className='mt-5'>
              <DataTable
                columns={columnsforEmployee}
                data={filteredTasks}
                pagination
                highlightOnHover
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskListEmployee
