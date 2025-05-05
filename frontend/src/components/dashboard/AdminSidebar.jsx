import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCog, FaRegCalendarAlt } from 'react-icons/fa'; // Added FaRegCalendarAlt
import { AiOutlineFileText } from 'react-icons/ai'; // Added AiOutlineFileText

const AdminSidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen w-64 fixed left-0 top-0">
      {/* Full header background green */}
      <div className="bg-blue-500 text-white text-center font-bold text-lg py-4">
        Employee MS
      </div>

      <nav className="flex flex-col space-y-4 mt-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end
        >
          <FaTachometerAlt className="text-lg" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end
        >
          <FaUser className="text-lg" />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end
        >
          <FaBuilding className="text-lg" />
          <span>Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end
        >
          <FaCalendarAlt className="text-lg" />
          <span>Leave</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end
        >
          <FaMoneyBillWave className="text-lg" />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/attendance"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end // Added end prop
        >
          <FaRegCalendarAlt />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/attendance-report"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end // Added end prop
        >
          <AiOutlineFileText />
          <span>Attendance Report</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`
          }
          end
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;