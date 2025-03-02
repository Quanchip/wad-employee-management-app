import React from 'react';   
import { useAuth } from "../context/authContext.jsx";
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => { 
   const { user, loading } = useAuth();  

   if (loading) { 
     <div>Loading...</div>; // ✅ Ensure authentication is completed before rendering
   } 

   return user ? children : <Navigate to="/login" />; // ✅ Allow access if user exists
}; 

export default PrivateRoutes;
