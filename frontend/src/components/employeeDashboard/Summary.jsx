import React, { useEffect, useState } from 'react'; 
import { FaUser, FaTasks, FaMoneyBillWave } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SummaryCard = () => { 
    const {user} = useAuth();
    const [taskStats, setTaskStats] = useState({
        total: 0,
        completed: 0,
        pending: 0
    });
    const [salaryInfo, setSalaryInfo] = useState({
        currentMonth: 0,
        lastMonth: 0,
        change: 0
    });
    const [salaryHistory, setSalaryHistory] = useState({
        labels: [],
        data: []
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

                // Fetch salary information
                const salaryResponse = await axios.get(
                    `http://localhost:5000/api/salary/${user._id}/${user.role}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }
                );

                if (salaryResponse.data.success) {
                    const salaries = salaryResponse.data.salary;
                    const now = new Date();
                    const currentMonth = now.getMonth();
                    const currentYear = now.getFullYear();
                    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

                    // Prepare data for chart
                    const last6Months = [];
                    const salaryData = [];
                    
                    for (let i = 5; i >= 0; i--) {
                        const month = (currentMonth - i + 12) % 12;
                        const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
                        
                        // Find all salaries for this month
                        const monthSalaries = salaries.filter(s => {
                            const payDate = new Date(s.payDate);
                            return payDate.getMonth() === month && payDate.getFullYear() === year;
                        });

                        // Calculate total salary for this month
                        const totalMonthSalary = monthSalaries.reduce((sum, s) => sum + s.netSalary, 0);

                        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        last6Months.push(`${monthNames[month]} ${year}`);
                        salaryData.push(totalMonthSalary);
                    }

                    // Update current and last month salary info
                    const currentMonthSalaries = salaries.filter(s => {
                        const payDate = new Date(s.payDate);
                        return payDate.getMonth() === currentMonth && payDate.getFullYear() === currentYear;
                    });

                    const lastMonthSalaries = salaries.filter(s => {
                        const payDate = new Date(s.payDate);
                        return payDate.getMonth() === lastMonth && payDate.getFullYear() === lastYear;
                    });

                    const currentMonthTotal = currentMonthSalaries.reduce((sum, s) => sum + s.netSalary, 0);
                    const lastMonthTotal = lastMonthSalaries.reduce((sum, s) => sum + s.netSalary, 0);

                    setSalaryInfo({
                        currentMonth: currentMonthTotal,
                        lastMonth: lastMonthTotal,
                        change: lastMonthTotal > 0 
                            ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1)
                            : 0
                    });

                    setSalaryHistory({
                        labels: last6Months,
                        data: salaryData
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (user && user._id) {
            fetchTaskStats();
        } else {
            console.log('user._id is missing, not fetching tasks');
        }
    }, [user]);

    const chartData = {
        labels: salaryHistory.labels,
        datasets: [
            {
                label: 'Monthly Salary',
                data: salaryHistory.data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Salary History (Last 6 Months)'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    };

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

            {/* Salary Stats Card */}
            <div className="rounded flex bg-white shadow-sm">
                <div className={`text-3xl flex justify-center items-center bg-green-600 text-white px-4 py-3`}>
                    <FaMoneyBillWave />
                </div>

                <div className="pl-4 py-3">
                    <p className="text-lg font-semibold">Monthly Salary</p>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                            <p className="text-sm text-gray-600">Current Month</p>
                            <p className="text-xl font-bold">${salaryInfo.currentMonth.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Last Month</p>
                            <p className="text-xl font-bold">${salaryInfo.lastMonth.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Change</p>
                            <p className={`text-xl font-bold ${salaryInfo.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {salaryInfo.change}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Salary Chart Card */}
            <div className="rounded bg-white shadow-sm p-4">
                <div style={{ height: '300px', width: '100%' }}>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    )
} 

export default SummaryCard;  