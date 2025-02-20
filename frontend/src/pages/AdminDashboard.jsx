import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

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
      <div>Admin Dashboard...  {user && user.name} </div>
    </div>
  );
};

export default AdminDashboard;
