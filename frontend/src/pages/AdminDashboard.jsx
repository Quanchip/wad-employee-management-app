import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';

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
    <div>  
      <AdminSidebar />
    </div>
  );
};

export default AdminDashboard;
