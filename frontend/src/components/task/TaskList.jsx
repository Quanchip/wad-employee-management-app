import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { columns, TaskButtons } from '../../utils/TaskHelper.jsx'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [taskloading, setTaskLoading] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchTasks = async () => {
      setTaskLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/task', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.data.success) {
          let sno = 1
          const data = response.data.tasks.map((task) => ({
            _id: task._id,
            sno: sno++,
            task_name: task.task_name,
            task_for: task.task_for, // new
            employee_name:
              task.task_for === 'team'
                ? 'Multiple / Team'
                : task.employeeId?.userId?.name || 'Unassigned',
            action: <TaskButtons _id={task._id} onTaskDelete={onTaskDelete} />,
          }))

          setTasks(data)
          setFilteredTasks(data)
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
  }, [searchQuery, tasks])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const onTaskDelete = async (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id))
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
              <Link
                to='/admin-dashboard/add-task'
                className='px-4 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition'
              >
                Add New Task
              </Link>
            </div>

            <div className='mt-5'>
              <DataTable
                columns={columns}
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

export default TaskList
