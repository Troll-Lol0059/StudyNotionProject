import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn';
import { FaRegEdit } from "react-icons/fa";


function MyProfile() {

    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    
    return (
        <div className='text-white p-4 lg:w-[100%]'>
            <div className='font-Inter px-4'>
                {/* todo - add paths */}
                {/* <div>
                <div>Home/Dashboard/{}</div>
            </div> */}
                <h1 className='text-3xl font-[500] text-richblack-5'>My Profile</h1>
            </div>

            <div className='flex flex-col justify-center gap-4 lg:w-[65%] bg-richblack-800 p-6 mx-12 my-12 rounded-md'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <img src={user?.image}
                            alt={`profile-${user?.firstName}`}
                            className='aspect-square w-[78px] rounded-full object-cover'
                        />
                        <div>
                            <p className='text-[18px] text-richblack-5 font-[600]'>
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <p className='text-[14px] text-richblack-300 font-[400]'>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div>
                        <IconBtn
                            text={"Edit"}
                            onclick={() => { navigate("/dashboard/settings") }}
                            customClasses={'bg-yellow-50 flex flex-row-reverse justify-center items-center text-richblack-900 text-[14px] font-[500] gap-2 p-1 px-3 rounded-md'}
                            children={<FaRegEdit />}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center gap-4 lg:w-[65%] bg-richblack-800 p-6 mx-12 my-12 rounded-md font-Inter'>
                <div className='flex justify-between items-center'>
                    <div className='richblack-5 font-[600] text-[18px]'>
                        Personal Details
                    </div>

                    <div>
                        <IconBtn
                            text={"Edit"}
                            onclick={() => { navigate("/dashboard/settings") }}
                            customClasses={'bg-yellow-50 flex flex-row-reverse justify-center items-center text-richblack-900 text-[14px] font-[500] gap-2 p-1 px-3 rounded-md'}
                            children={<FaRegEdit />}
                        />
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-between lg:w-[50%] mb-4'>
                        <div>
                            <div className='text-[14px] font-[400] text-richblack-600'>First Name</div>
                            <div className='text-[14px] font-[500] text-richblack-5'>{user?.firstName}</div>
                        </div>
                        <div>
                            <div className='text-[14px] font-400 text-richblack-600'>Last Name</div>
                            <div className='text-[14px] font-[500] text-richblack-5'>{user?.lastName}</div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between lg:w-[50%]'>
                        <div>
                            <div className='text-[14px] font-[400] text-richblack-600'>Email</div>
                            <div className='text-[14px] font-[500] text-richblack-5'>{user?.email}</div>
                        </div>
                        <div>
                            <div className='text-[14px] font-400 text-richblack-600'>Phone No.</div>
                            <div className='text-[14px] font-[500] text-richblack-5'>
                                            { (user?.additionalDetails?.contactNumber) ? (user?.additionalDetails?.contactNumber) : <span>Not Set</span> }
                                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile