
import React, { useEffect, useState } from 'react'
import { LeaveButtons } from "../../utils/LeaveHelper.jsx";
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper.jsx';
import axios from 'axios';



const Table = () => {


    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null)

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
            setFilteredLeaves(data)


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

    const filterByInput = (e) => {
        const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredLeaves(data)
    }

    const filterByButton = (status) => {
        const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
        setFilteredLeaves(data)
    }


  return (
    <>
    {filteredLeaves ? (
    <div className='p-6 bg-gray-50 min-h-screen'>
    <div className='p-6'>
        <div className='text-center'>
            <h1 className='text-2xl font-bold'>Manage leaves</h1>
        </div>
        <div className='flex justify-between items-center'>
            <input type="text" placeholder='Search by Employee ID' className='px-4 py-0.5 border' 
                    onChange={filterByInput}
            />
            <div className='space-x-3'>
                <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg"
                onClick={() => filterByButton("Pending")}
                >
                Pending</button>
                <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg"
                onClick={() => filterByButton("Approved")}
                >    
                Approved</button>
                <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg"
                onClick={() => filterByButton("Rejected")}
                >
                Rejected</button>
                <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg"
                onClick={() => setFilteredLeaves(leaves)}
                >
                View All</button>
            </div>    
        </div>
        
        <div className='mt-5'>
            <DataTable columns={columns} data={filteredLeaves} pagination/>
        </div>
    </div>
    </div>
    ) : <div>Loading ...</div>}
    </>
  )
}

export default Table;
