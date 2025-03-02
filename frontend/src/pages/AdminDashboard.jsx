import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar'; 
import Navbar from "../components/dashboard/Navbar"; 
import AdminSummary from '../components/dashboard/AdminSummary';

const AdminDashboard = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();

  // // Redirect to login if no user
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate('/login', { replace: true });
  //   } 
  // }, [user, loading, navigate]);

  // if (loading) {
  //   return <div>Loading....</div>;
  // }

  return (
    <div className="flex"> 
    
      <AdminSidebar /> 
        <div className="flex-1 ml-64 bg-grey-100 h-screen">
          <Navbar />  
          <AdminSummary /> 
          <Outlet />
        </div>

    </div>
  );
};

export default AdminDashboard;
