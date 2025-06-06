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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSummary = async() => {
            try {
                console.log('Starting to fetch dashboard summary...');
                setLoading(true)
                setError(null)

                const token = localStorage.getItem('token');
                console.log('Token available:', !!token);
                
                if (!token) {
                    throw new Error('No authentication token found');
                }

                console.log('Making API call to dashboard summary...');
                const response = await axios.get('http://localhost:5000/api/dashboard/summary', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                console.log('Dashboard summary response:', response.data);
                if (response.data.success) {
                    console.log('Setting summary data:', response.data);
                    setSummary(response.data);
                } else {
                    throw new Error(response.data.error || 'Failed to fetch dashboard data');
                }
            } catch(error) {
                console.error('Error fetching dashboard summary:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                }
                setError(error.response?.data?.error || error.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false)
            }
        }

        console.log('Initializing AdminSummary component...');
        fetchSummary();
    }, [])

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        )
    }

    if(!summary) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Failed to load dashboard data</p>
            </div>
        )
    }

    console.log('Rendering dashboard with summary:', summary);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome to your employee management dashboard</p>
            </div>

            {/* Main Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Employees</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{summary.totalEmployees}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FaUserTie className="text-2xl text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Departments</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{summary.totalDepartments}</p>
                        </div>
                        <div className="p-3 bg-teal-50 rounded-lg">
                            <FaBuilding className="text-2xl text-teal-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Salaries</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">${summary.totalSalary.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <FaUsers className="text-2xl text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Leave Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Leave Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">Applied</p>
                                <p className="text-2xl font-bold text-blue-700 mt-1">{summary.leaveSummary.appliedFor}</p>
                            </div>
                            <FaUserTie className="text-2xl text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600">Approved</p>
                                <p className="text-2xl font-bold text-green-700 mt-1">{summary.leaveSummary.approved}</p>
                            </div>
                            <FaCheckCircle className="text-2xl text-green-600" />
                        </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-yellow-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-700 mt-1">{summary.leaveSummary.pending}</p>
                            </div>
                            <FaHourglassHalf className="text-2xl text-yellow-600" />
                        </div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-600">Rejected</p>
                                <p className="text-2xl font-bold text-red-700 mt-1">{summary.leaveSummary.rejected}</p>
                            </div>
                            <FaTimesCircle className="text-2xl text-red-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSummary
