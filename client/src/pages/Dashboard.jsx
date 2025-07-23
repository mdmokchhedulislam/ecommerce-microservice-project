import React from 'react'
import { useSelector } from 'react-redux';
import SellerDashboard from '../components/dashboard/sellerdashboard/SellerDashboard';
import UserDashboard from '../components/dashboard/userdashboard/UserDashboard';

function Dashboard() {
    const {currentUser,isAuthenticated} = useSelector((state)=>state.user)
    const role = currentUser.data.data.user.role
  
    
    
    
    
  return (
    <>
    {
        isAuthenticated && role==="seller"?<SellerDashboard />:<UserDashboard />
    }

    </>
  )
}

export default Dashboard


