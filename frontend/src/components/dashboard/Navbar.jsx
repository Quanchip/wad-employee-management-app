import React from 'react';
import { useAuth } from "../../context/authContext";

const Navbar = () => {
    const { user } = useAuth(); // Ensure 'logout' function exists in authContext

    return (
        <div className="flex justify-between items-center h-16 bg-blue-600 px-6 text-white shadow-md">
            <p className="font-semibold text-lg">Welcome, {user?.name || "Guest"}!</p> 

            <button className="px-4 py-1 bg-blue-700">
                Logout
            </button>
        </div>
    );
};

export default Navbar;
