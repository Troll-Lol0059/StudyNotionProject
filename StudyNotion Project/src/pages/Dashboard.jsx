import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/dashboard/Sidebar';


function Dashboard() {

    const {loading:authLoading} = useSelector( (state) => state.auth );
    const {loading:profileLoading} = useSelector( (state) => state.profile );

    if(authLoading || profileLoading){
        return(
            <div className='mt-10'>
                Loading ...
            </div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar />

        <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard