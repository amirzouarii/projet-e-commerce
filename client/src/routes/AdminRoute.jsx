import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

    const AdminRoute = () => {
        const user = useSelector(state=> state.authReducer.user)
        // console.log(user.isAdmin);
    
  return  user.isAdmin? <Outlet/> //laisser passer la route 
    :
    <Navigate to='/login' />;

    
  
};

export default AdminRoute