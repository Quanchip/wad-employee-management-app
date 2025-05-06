import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { columns, AttendanceHelper } from '../../utils/AttendenceHelper';
import DataTable from 'react-data-table-component'
import axios from 'axios';


const Attendance = () => { 

    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterAttendance, setFilterAttendance] = useState([])

    const fetchAttendance = async () => {
        setLoading(true)
    try {
        const response = await axios.get('http://localhost:5000/api/attendance', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        })

        console.log("API Response:", response.data);


        if (response.data.success) {
        let sno = 1
        const data = response.data.attendance.map((att) => ({
            employeeId: att.employeeId.employeeId,
            sno: sno++,
            department: att.employeeId.department.dep_name,
            name: att.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
           
            action: (
            <AttendanceHelper status={att.employeeId.employeeId} /> 
            // fix this place
            ),
        }))
        setAttendance(data)
        setFilterAttendance(data)

        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
        }
    } finally {
        setLoading(false)
    }
    };

    useEffect(() => {
        
        fetchAttendance();
    }, []) 
    //space

    const handleFilter = (e) => {
        const records = attendance.filter((emp) => (
            emp.employeeId.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilterAttendance(records)
    }
     
    if(!filterAttendance) { 
        return <div>Loading ... </div>
    }
    
    return ( 
        <div className='p-6 bg-gray-50 min-h-screen'>
        <div className='p-6' >
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Attendance</h3>
            </div>
        
            <div className='flex justify-between items-center my-4 '>
                <input
                type='text'
                placeholder='Search by Department Name'
                className='px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                onChange={handleFilter}
                />
                <Link
                to='/admin-dashboard/add-employee'
                className='px-4 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition'
                >
                Add New Attendance
                </Link>
            </div>
            <div>
                <DataTable columns={columns} data={filteredEmployee} pagination/>
            </div>

        </div>
        </div>
    )
} 

export default Attendance