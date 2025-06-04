import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCog, FaChartLine, FaRegCalendarAlt, FaTasks, FaPeopleArrows  } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const navItems = [
  { to: "/admin-dashboard", icon: <FaTachometerAlt />, label: "Dashboard", end: true },
  { to: "/admin-dashboard/employees", icon: <FaUsers />, label: "Employees" },
  { to: "/admin-dashboard/departments", icon: <FaBuilding />, label: "Departments" },
  { to: "/admin-dashboard/leaves", icon: <FaCalendarAlt />, label: "Leaves" },
  { to: "/admin-dashboard/salary/add", icon: <FaMoneyBillWave />, label: "Salaries" },
  { to: "/admin-dashboard/attendance", icon: <FaRegCalendarAlt />, label: "Attendance" },
  { to: "/admin-dashboard/attendance-report", icon: <FaChartLine />, label: "Attendance Reports" },
  { to: "/admin-dashboard/tasks", icon: <FaTasks />, label: "Tasks" },
  { to: "/admin-dashboard/teams", icon: <FaPeopleArrows />, label: "Team" },
  { to: "/admin-dashboard/setting", icon: <FaCog />, label: "Settings" },
];

const AdminSidebar = ({ expanded, setExpanded }) => {
  const { user } = useAuth();

  return (
    <div
      className={`bg-white text-gray-800 h-screen fixed left-0 top-0 border-r shadow-sm z-20
        transition-all duration-300
        ${expanded ? 'w-64' : 'w-16'}
      `}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-bold text-xl py-6 transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
        Admin Panel
      </div>
      <div className={`p-4 border-b flex items-center transition-all duration-300 ${expanded ? 'space-x-3' : 'justify-center'}`}>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <FaUsers className="text-blue-600" />
        </div>
        {expanded && (
          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        )}
      </div>
      <nav className="flex flex-col space-y-1 p-4">
        {navItems.map((item, idx) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center rounded-lg transition-colors duration-200
              ${expanded ? 'space-x-3 p-3' : 'justify-center p-3'}
              ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}
              `
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className={`transition-all duration-200 ${expanded ? 'opacity-100 ml-2' : 'opacity-0 w-0 overflow-hidden'}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;