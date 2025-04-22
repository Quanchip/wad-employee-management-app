
import React, { useEffect, useState } from 'react'
import { LeaveButtons } from "../../utils/LeaveHelper.jsx";
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper.jsx';
import axios from 'axios';



const Table = () => {


    const [leaves, setLeaves] = useState(null)

    const fetchLeaves = async (params) => {
        try {
            const response = await axios.get('http://localhost:5000/api/leave', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            })

            console.log("API Response:", response.data);


            if (response.data.success) {
            let sno = 1
            const data = response.data.leaves.map((leave) => ({
                _id: leave._id,
                sno: sno++,
                employeeId: leave.employeeId.employeeId,
                name: leave.employeeId.userId.name,
                leaveType: leave.leaveType,
                department: leave.employeeId.department.dep_name,
                days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)),
                status: leave.status,
                action: 
                <LeaveButtons Id={leave._id} />,
            }));
            setLeaves(data)


            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
            }
        }
    }
    useEffect(() =>{
        fetchLeaves()

    }, [])

  return (
    <>
    {leaves ? (
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2x1 font-bold'>Manage leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input type="text" placeholder='Search by leave' className='px-4 py-0.5 border' />
            <div className='space-x-3'>
                <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg">Pending</button>
                <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg">Approved</button>
                <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg">Rejected</button>
            </div>    
        </div>
        
        <div className='mt-5'>
            <DataTable columns={columns} data={leaves} pagination/>
        </div>
    </div>
    ) : <div>Loading ...</div>}
    </>
  )
}

export default Table;
