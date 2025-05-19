import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const navigate = useNavigate()

  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({})
  const [showEmailBox, setShowEmailBox] = useState(false)
  const [personalEmail, setPersonalEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmationKey, setConfirmationKey] = useState('')

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const password = Math.random().toString(36).slice(-8)
    const key = Math.floor(100000 + Math.random() * 900000).toString()

    setNewPassword(password)
    setConfirmationKey(key)

    setShowEmailBox(true)
  }

  const handleConfirmEmail = async () => {
    if (!personalEmail) {
      alert('Please enter personal email')
      return
    }

    try {
      await axios.post(
        'http://localhost:5000/api/mail/set-email',
        { email: personalEmail },
        { withCredentials: true }
      )

      await axios.post(
        'http://localhost:5000/api/mail/send-new-password',
        {
          password: newPassword,
          key: confirmationKey,
        },
        { withCredentials: true }
      )

      const formDataObj = new FormData()
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key])
      })

      formDataObj.append('password', newPassword)
      formDataObj.append('key', confirmationKey)

      const response = await axios.post(
        'http://localhost:5000/api/employee/add',
        formDataObj,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )

      if (response.data.success) {
        alert('Employee added and email sent successfully!')
        setShowEmailBox(false)
        const setSessionClient = await axios.get(
          'http://localhost:5000/api/mail/getSessionServer',
          {
            withCredentials: true,
          }
        )
        sessionStorage.setItem('userEmail', setSessionClient.data.email)
        navigate('/admin-dashboard/employees')
      } else {
        alert('Failed to add employee')
      }
    } catch (error) {
      if (error.response?.data?.error?.includes('already registered')) {
        alert('Employee already exists!')
      } else {
        alert(error.response?.data?.error || 'Something went wrong')
      }
    }
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Các input như bạn đã có */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              placeholder='Insert Name'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              placeholder='Insert Email'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            />
          </div>
          {/* Employee ID */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Employee ID
            </label>
            <input
              type='text'
              name='employeeId'
              onChange={handleChange}
              placeholder='Employee ID'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            />
          </div>
          {/* Date of birth */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Date of birth
            </label>
            <input
              type='date'
              name='dob'
              onChange={handleChange}
              placeholder='DOB'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Gender
            </label>
            <select
              name='gender'
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          {/* Marital Status */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Marital Status
            </label>
            <select
              name='maritalStatus'
              onChange={handleChange}
              placeholder='Marital Status'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            >
              <option value=''>Select Status</option>
              <option value='single'>Single</option>
              <option value='married'>Married</option>
            </select>
          </div>
          {/* Designation */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Designation
            </label>
            <input
              type='text'
              name='designation'
              onChange={handleChange}
              placeholder='Designation'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            />
          </div>
          {/* Department */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Department
            </label>
            <select
              name='department'
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            >
              <option value=''>Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          {/* Salary */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Salary
            </label>
            <input
              type='number'
              name='salary'
              onChange={handleChange}
              placeholder='Salary'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            />
          </div>
          {/* Role */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Role
            </label>
            <select
              name='role'
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            >
              <option value=''>Select Role</option>
              <option value='admin'>Admin</option>
              <option value='employee'>Employee</option>
            </select>
          </div>
          {/* Image Upload */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Upload Image
            </label>
            <input
              type='file'
              name='image'
              onChange={handleChange}
              placeholder='Upload Image'
              accept='image/*'
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            />
          </div>
        </div>
        <button
          type='submit'
          className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'
        >
          Add Employee
        </button>
      </form>

      {/* Popup nhập email cá nhân */}
      {showEmailBox && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center'>
          <div className='bg-white p-6 rounded shadow-md w-96'>
            <h3 className='text-lg font-bold mb-4'>Enter Personal Email</h3>
            <input
              type='email'
              placeholder='Personal Email'
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mb-4'
            />
            <div className='flex justify-end space-x-4'>
              <button
                onClick={() => setShowEmailBox(false)}
                className='px-4 py-2 rounded border border-gray-300 hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEmail}
                className='px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Add
