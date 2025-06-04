import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar'; 
import Navbar from "../components/dashboard/Navbar"; 

const AdminDashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex">
      <AdminSidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-16'} bg-grey-100 h-screen flex flex-col`}>
        <Navbar sidebarExpanded={sidebarExpanded} />
        <div className="flex-1">
          <Outlet context={{ sidebarExpanded }} />
        </div>
        <footer className="bg-gray-200 text-center py-3 text-gray-600 text-sm">
          © {new Date().getFullYear()} Employee Management App by Team 1. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
