import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { columns, AttendanceHelper } from '../../utils/AttendenceHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Attendance = () => { 
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterAttendance, setFilterAttendance] = useState([]);
    const statusChange = () => { 
        fetchAttendance(); 
    }

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/attendance', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log("Full API Response:", response.data);
            console.log("First attendance record:", response.data.message[0]);
            console.log("Employee data:", response.data.message[0]?.employeeId);

            if (response.data.success) {
                let sno = 1;
                const data = response.data.message.map((att) => {
                    const emp = att.employeeId || {};
                    const dept = emp.department || {};
                    
                    // console.log("Processing employee:", emp);
                    // console.log("Department data:", dept);

                    // console.log("att:", att);
                    // console.log("att.employeeId:", att.employeeId);
                    // console.log("att.employeeId.department:", dept.dep_name);

                    return {
                        sno: sno++,
                        name: att.employeeId.userId.name || 'No Name',
                        employeeId: att.employeeId.employeeId || 'N/A',
                        department: att.employeeId.department.dep_name || 'N/A',
                        action: <AttendanceHelper status={att.status} employeeId={att.employeeId._id} statusChange={statusChange} />,
                    };
                });

                console.log("Processed data:", data);
                setAttendance(data);
                setFilterAttendance(data);
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
            alert(error.response?.data?.message || 'Server error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleFilter = (e) => {
        const keyword = e.target.value.toLowerCase();
        const records = attendance.filter((emp) => 
            emp.name.toLowerCase().includes(keyword) || 
            emp.department.toLowerCase().includes(keyword)
        );
        setFilterAttendance(records);
    };

    return ( 
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='p-6'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Manage Attendance</h3>
                </div>

                <div className='flex justify-between items-center my-4'>
                    <input
                        type='text'
                        placeholder='Search by Name or Department'
                        className='px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        onChange={handleFilter}
                    /> 
                    <p className="text-2x1"> 
                        Mark Employees for <span className="text-2x1 font-bold underline">{new Date().toISOString().split("T")[0]}</span>
                    </p>
                    <Link
                        to='/admin-dashboard/attendance-report'
                        className='px-4 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition'
                    >
                        Attendance Report
                    </Link>
                </div>
                
                <div>
                    <DataTable
                        columns={columns}
                        data={filterAttendance}
                        progressPending={loading}
                        pagination
                    />
                </div>
            </div>
        </div>
    );
};

export default Attendance;
