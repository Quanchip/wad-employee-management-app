import React from 'react';
import { useAuth } from "../../context/authContext";
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-between items-center h-16 bg-white px-6 text-gray-800 shadow-sm border-b">
            <div className="flex items-center space-x-4">
                <FaUserCircle className="text-2xl text-blue-600" />
                <div>
                    <p className="font-semibold text-lg text-gray-800">Welcome, {user?.name || "Guest"}!</p>
                    <p className="text-sm text-gray-500">{user?.role || "User"}</p>
                </div>
            </div>

            <button 
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Navbar;
