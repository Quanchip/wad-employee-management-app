import React, { useEffect, useState } from 'react'; 
import { FaUser, FaTasks } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const SummaryCard = () => { 
    const {user} = useAuth();
    const [taskStats, setTaskStats] = useState({
        total: 0,
        completed: 0,
        pending: 0
    });


    useEffect(() => {
        const fetchTaskStats = async () => {
            try {
                // Get employee ID first
                const employeeResponse = await axios.get(
                    `http://localhost:5000/api/employee/${user._id}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }
                );
                console.log(employeeResponse.data);

                if (!employeeResponse.data.success) {
                    console.error('Failed to get employee data');
                    return;
                }

                const employeeId = employeeResponse.data.employee._id;

                // Get personal tasks
                const personalResponse = await axios.get(
                    `http://localhost:5000/api/task/personalTask/${user._id}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }
                );

                let teamTasks = [];
                try {
                    const teamResponse = await axios.get(
                        `http://localhost:5000/api/task/teamTask/${employeeId}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                    );
                    if (teamResponse.data.success) {
                        teamTasks = teamResponse.data.task || [];
                    }
                } catch (err) {
                    // Không có team task cũng không sao, chỉ lấy task cá nhân
                    teamTasks = [];
                }

                if (personalResponse.data.success) {
                    const personalTasks = personalResponse.data.task || [];
                    const allTasks = [...personalTasks, ...teamTasks];

                    setTaskStats({
                        total: allTasks.length,
                        completed: allTasks.filter(task => task.complete).length,
                        pending: allTasks.filter(task => !task.complete).length
                    });
                }
            } catch (error) {
                console.error('Error fetching task stats:', error);
            }
        };

        if (user && user._id) {
            fetchTaskStats();
        } else {
            console.log('user._id is missing, not fetching tasks');
        }
    }, [user]);

    return ( 
        <div className='p-6 space-y-4'>
            {/* Welcome Card */}
            {/* <div className="rounded flex bg-white shadow-sm"> 
                <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4 py-3`}> 
                    <FaUser /> 
                </div> 

                <div className="pl-4 py-3"> 
                    <p className="text-lg font-semibold">Welcome back</p> 
                    <p className="text-xl font-bold">{user.name}</p>
                </div>
            </div> */}

            {/* Task Stats Card */}
            <div className="rounded flex bg-white shadow-sm">
                <div className={`text-3xl flex justify-center items-center bg-blue-600 text-white px-4 py-3`}>
                    <FaTasks />
                </div>

                <div className="pl-4 py-3">
                    <p className="text-lg font-semibold">Your Tasks</p>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-xl font-bold">{taskStats.total}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-xl font-bold text-green-600">{taskStats.completed}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-xl font-bold text-yellow-600">{taskStats.pending}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default SummaryCard;  