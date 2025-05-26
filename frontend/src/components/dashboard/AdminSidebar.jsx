import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCog, FaChartLine, FaRegCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';


const AdminSidebar = () => {
    const { user } = useAuth();
    
    return (
        <div className="bg-white text-gray-800 h-screen w-64 fixed left-0 top-0 border-r shadow-sm">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-bold text-xl py-6">
                Admin Panel
            </div>

            <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUsers className="text-blue-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>

            <nav className="flex flex-col space-y-1 p-4">
                <NavLink 
                    to="/admin-dashboard" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                    end
                >
                    <FaTachometerAlt className="text-lg" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/employees" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                >
                    <FaUsers className="text-lg" />
                    <span>Employees</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/departments" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                >
                    <FaBuilding className="text-lg" />
                    <span>Departments</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/leaves" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                >
                    <FaCalendarAlt className="text-lg" />
                    <span>Leaves</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/salary/add" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                >
                    <FaMoneyBillWave className="text-lg" />
                    <span>Salaries</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/attendance" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                >
                    <FaRegCalendarAlt className="text-lg" />
                    <span>Attendance</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/attendance-report" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                >
                    <FaChartLine className="text-lg" />
                    <span>Attendance Reports</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/setting" 
                    className={({isActive}) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                            isActive 
                                ? "bg-blue-50 text-blue-600" 
                                : "text-gray-600 hover:bg-gray-50"
                        }`
                    }
                >
                    <FaCog className="text-lg" />
                    <span>Settings</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default AdminSidebar;