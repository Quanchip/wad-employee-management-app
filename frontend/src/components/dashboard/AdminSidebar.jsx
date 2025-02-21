import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import { FaTachometerAlt, FaUser, FaBuilding, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa'; // ✅ Imported icons

const AdminSidebar = () => { 
    return ( 
        <div className="bg-gray-900 text-white h-screen w-64 fixed left-0 top-0">  
            
            {/* ✅ Full header background green */}
            <div className="bg-blue-500 text-white text-center font-bold text-lg py-4">
                Employee MS
            </div>

            <nav className="flex flex-col space-y-4 mt-4"> 
                <NavLink to="/admin-dashboard" className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700">
                    <FaTachometerAlt className="text-lg" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin-dashboard/employees" className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700">
                    <FaUser className="text-lg" />
                    <span>Employee</span>
                </NavLink> 

                <NavLink to="/admin-dashboard/departments" className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700">
                    <FaBuilding className="text-lg" />
                    <span>Department</span>
                </NavLink> 

                <NavLink to="/admin-dashboard/leaves" className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700">
                    <FaCalendarAlt className="text-lg" />
                    <span>Leave</span>
                </NavLink> 

                <NavLink to="/admin-dashboard/salaries" className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700">
                    <FaMoneyBillWave className="text-lg" />
                    <span>Salary</span>
                </NavLink>
            </nav>
        </div>
    );
}; 

export default AdminSidebar;
