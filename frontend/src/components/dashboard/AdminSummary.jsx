import React, { useEffect, useState } from 'react'
import SummaryCard from '../dashboard/SummaryCard'
import axios from 'axios'

import {
  FaBuilding,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaUsers,
  FaUserTie,
} from 'react-icons/fa'

const AdminSummary = () => {
    const [summary, setSummary] = useState(null)
    useEffect(()=> {
        const fetchSummary =async() => {
            try {
                const summary = await axios.get('http://localhost:5000/api/dashboard/summary',{
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                    
                })
                setSummary(summary.data)
            } catch(error) {
                if(error.response) {
                    alert(error.response.data.error)
                }

                console.log(error.message)
            }
        }

        fetchSummary()
    },[])

    if(!summary) {
        return <div>loading</div>
    }

  return (
    <div className='p-6 bg-gray-200 min-h-screen'>
      <h3 className='text-2x1 font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard
          icon={<FaUserTie />}
          text='Total Employee'
          number={summary.totalEmployees}
          color='bg-red-600'
        />
        <SummaryCard
          icon={<FaBuilding />}
          text='Total Department'
          number={summary.totalDepartments}
          color='bg-teal-600'
        />
        <SummaryCard
          icon={<FaUsers />}
          text='Total Salaries'
          number={summary.totalSalary}
          color='bg-yellow-500'
        />
      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2x1 font-bold'>Leave Details</h4>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
          <SummaryCard
            icon={<FaUserTie />}
            text='Leave applied'
            number={summary.leaveSummary.appliedFor}
            color='bg-blue-600'
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text='Leave Approved'
            number={summary.leaveSummary.approved}
            color='bg-green-600'
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text='Total Pending'
            number={summary.leaveSummary.pending}
            color='bg-red-600'
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text='Total Rejected'
            number={summary.leaveSummary.rejected}
            color='bg-violet-600'
          />
        </div>
      </div>
    </div>
  )
}

export default AdminSummary
