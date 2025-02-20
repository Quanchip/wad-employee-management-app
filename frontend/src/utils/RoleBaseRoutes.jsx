import React from 'react';
import { useAuth } from '../context/authContext.jsx'; 
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole = [] }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // ✅ Ensure authentication is completed
    }

    console.log("RoleBaseRoutes - User role:", user?.role);
    console.log("Required roles:", requiredRole);
    console.log("Is role valid?", Array.isArray(requiredRole) && requiredRole.includes(user?.role));

    if(!requiredRole.includes(user?.role)){ 
        <Navigate to ="/unauthorized"/>
    }
  

    return user ? children : <Navigate to="/login"/>; // ✅ Allow access if role matches
};

export default RoleBaseRoutes;
