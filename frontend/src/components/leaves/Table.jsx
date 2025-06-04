import React, { useEffect, useState } from 'react';
import { LeaveButtons, columns as leaveColumns } from "../../utils/LeaveHelper.jsx"; // Renamed 'columns'
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Table = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log("API Response:", response.data);

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId?.employeeId || "N/A",
                    name: leave.employeeId?.userId?.name || "N/A",
                    leaveType: leave.leaveType,
                    department: leave.employeeId?.department?.dep_name || "N/A",
                    days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1,
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />,
                }));

                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByInput = (e) => {
        const value = e.target.value.toLowerCase();
        const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(value));
        setFilteredLeaves(data);
    };

    const filterByButton = (status) => {
        const data = leaves.filter(leave => leave.status.toLowerCase() === status.toLowerCase());
        setFilteredLeaves(data);
    };

    return (
        <>
            {loading ? (
                <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            ) : (
                <div className='p-6 bg-gray-50 min-h-screen'>
                    <div className='p-6'>
                        <div className='text-center'>
                            <h1 className='text-2xl font-bold'>Manage Leaves</h1>
                        </div>

                        <div className='flex justify-between items-center mt-6'>
                            <input
                                type="text"
                                placeholder='Search by Employee ID'
                                className='px-4 py-1 border rounded-md'
                                onChange={filterByInput}
                            />

                            <div className='space-x-3'>
                                <button
                                    className="px-3 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-lg"
                                    onClick={() => filterByButton("Pending")}
                                >
                                    Pending
                                </button>
                                <button
                                    className="px-3 py-1 bg-green-600 text-white hover:bg-green-700 rounded-lg"
                                    onClick={() => filterByButton("Approved")}
                                >
                                    Approved
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white hover:bg-red-700 rounded-lg"
                                    onClick={() => filterByButton("Rejected")}
                                >
                                    Rejected
                                </button>
                                <button
                                    className="px-3 py-1 bg-gray-600 text-white hover:bg-gray-700 rounded-lg"
                                    onClick={() => setFilteredLeaves(leaves)}
                                >
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <DataTable
                                columns={leaveColumns}
                                data={filteredLeaves}
                                pagination
                                highlightOnHover
                                pointerOnHover
                                responsive
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Table;
