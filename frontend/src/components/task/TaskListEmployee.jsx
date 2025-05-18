import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  columnsforEmployee,
  TaskButtonsEmployee,
} from '../../utils/TaskHelper.jsx'
import { Link, useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { useAuth } from '../../context/authContext.jsx'

const TaskListEmployee = () => {
  const [tasks, setTasks] = useState([])
  const [taskloading, setTaskLoading] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuth()
  const { id } = useParams()
  let sno = 1
  useEffect(() => {
    const fetchTasks = async () => {
      setTaskLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/task/${id}/${user.role}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        if (response.data.success) {
          let sno = 1
          const data = response.data.task.map((task) => ({
            _id: task._id,
            sno: sno++,
            task_name: task.task_name,
            task_complete: (
              <span
                className={`text-2xl ${
                  task.complete ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {task.complete ? '✅' : '❌'}
              </span>
            ),
            action: (
              <TaskButtonsEmployee
                _id={task._id}
                onTaskUpdateComplete={onTaskUpdateComplete}
              />
            ),
          }))

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
    fetchTasks()
  }, [])

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
              task_complete: (
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
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>Manage Tasks</h3>
            </div>

            <div className='flex justify-between items-center my-4'>
              <input
                type='text'
                placeholder='Search by Task Name'
                className='px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

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
