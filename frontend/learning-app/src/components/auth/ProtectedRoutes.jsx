import React from 'react'
import { Navigate,Outlet} from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { useAuth } from "../../context/AuthContext"; 

const ProtectedRoutes = ({}) => {
  const {isAuthenticated,loading}=useAuth();

console.log("Auth state:", { isAuthenticated, loading });

if(loading){
    return<div>loading...</div>;
}

  return isAuthenticated? (
   <AppLayout>
    <Outlet/>
   </AppLayout>
  ):(<Navigate to="/login" replace/>

  );
};

export default ProtectedRoutes;
