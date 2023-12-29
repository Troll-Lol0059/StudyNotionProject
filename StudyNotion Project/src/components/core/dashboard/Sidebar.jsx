import React, { useState } from 'react'
import {SidebarLinks, sidebarLinks} from "../../../data/dashboard-links";
import {logout} from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

function Sidebar() {

    const {user,loading:profileLoading} = useSelector( (state) => state.profile );
    const {loading:authLoading} = useSelector( (state) => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);


    if(authLoading || profileLoading){
        return(
            <div className='mt-10'>
                Loading ...
            </div>
        )
    }

  return (
    <div>
        <div className='flex lg:min-w-[120px] flex-col border-r-[1px] border-richblack-800
                h-[calc(100vh-3.5rem)] bg-richblack-700'>
            <div className='flex flex-col'>
                    {
                        sidebarLinks.map( (link,index) => {
                            if(link.type && user?.accountType !== link.type) return null;

                            return(
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })
                    }
            </div>

            <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-500'></div>
            
            <div className='flex flex-col'>
                    <SidebarLink link={ {name:"Settings",
                                        path:"dashboard/settings"}}
                                        iconName={"VscSettingsGear"}
                    />

                    <button
                        onClick={ () => setConfirmationModal(
                            {
                                text1:"Are You Sure ?",
                                text2: "You will be Logged out of Your Account",
                                btn1Text:"LogOut",
                                btn2Text:"Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            } 
                        )}
                        className='text-sm font-medium text-richblack-200 relative px-8 py-2'>
                        
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </div>
                    </button>
            </div>
            
            {/* if state is not null it will render and set data will be passed 
            else it will not render on null */}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    </div>
  )
}

export default Sidebar