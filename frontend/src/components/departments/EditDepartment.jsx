import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {
  const { id } = useParams()
  const [department, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const navigate  = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setDepartments({ ...department, [name]: value })
  }
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log(response.error)
        if (response.data.success) {
          setDepartments(response.data.department)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setDepLoading(false)
      }
    }
    fetchDepartments()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Dữ liệu đã gửi', department)
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (response.data.success) {
        navigate('/admin-dashboard/departments')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }

  return (
    <>
      {depLoading ? (
        <div> Loading........</div>
      ) : (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
          <div className='bg-white shadow-lg rounded-xl p-6 w-full max-w-md'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
              Edit Department
            </h3>

            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* Department Name */}
              <div>
                <label
                  htmlFor='dep_name'
                  className='block text-gray-700 font-medium mb-1'
                >
                  Department Name
                </label>
                <input
                  type='text'
                  name='dep_name'
                  onChange={handleChange}
                  value={department.dep_name}
                  placeholder='Enter Department Name'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  required
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
                  value={department.description}
                  className='w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  rows='4'
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Edit Department
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default EditDepartment
