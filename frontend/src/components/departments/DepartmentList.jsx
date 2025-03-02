import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper.jsx'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [deploading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response.data.success) {
          let sno = 1
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                _id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }))

          setDepartments(data)
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

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredDepartments(departments)
    } else {
      setFilteredDepartments(
        departments.filter((dep) => dep.dep_name.toLowerCase().includes(searchQuery))
      )
    }
  }, [departments, searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const onDepartmentDelete = async (id) => {
    setDepartments((prevDepartments) => prevDepartments.filter((dep) => dep._id !== id))
  }

  return (
    <>
      {deploading ? (
        <div className='text-center text-lg font-semibold'>Loading...</div>
      ) : (
        <div className='p-5'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Departments</h3>
          </div>

          <div className='flex justify-between items-center my-4'>
            <input
              type='text'
              placeholder='Search by Department Name'
              className='px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              value={searchQuery}
              onChange={handleSearch}
            />
            <Link
              to='/admin-dashboard/add-department'
              className='px-4 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition'
            >
              Add New Department
            </Link>
          </div>

          <div className='mt-5'>
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DepartmentList
