import React from 'react';  
import SummaryCard from './SummaryCard'; 
import { FaBuilding, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaUsers, FaUserTie } from 'react-icons/fa'

const AdminSummary = () => { 
    return (
        <div className='p-6 bg-gray-200 min-h-screen'>
           <h3 className='text-2x1 font-bold'>Dashboard Overview</h3>   
           <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'> 
                <SummaryCard icon={<FaUserTie/>} text="Total Manager" number={15} color="bg-red-600" /> 
                <SummaryCard icon={<FaBuilding/>} text="Total Department" number={4} color="bg-teal-600" />
                <SummaryCard icon={<FaUsers/>} text="Total Employees" number={13} color="bg-yellow-500" />
           </div> 

           <div className="mt-12">
            <h4 className="text-center text-2x1 font-bold">Leave Details</h4> 

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"> 

                <SummaryCard icon={<FaUserTie/>} text="Total Leaves" number={15} color="bg-blue-600" /> 
                <SummaryCard icon={<FaCheckCircle/>} text="Leave Balance" number={4} color="bg-green-600" />
                <SummaryCard icon={<FaHourglassHalf/>} text="Total Leaves Taken" number={13} color="bg-red-600" /> 
                <SummaryCard icon={<FaTimesCircle/>} text="Total Leaves Taken" number={13} color="bg-violet-600" /> 

            </div>
           </div>
        </div> 

        
    )
} 

export default AdminSummary