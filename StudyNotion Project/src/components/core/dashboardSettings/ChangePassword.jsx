import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from "../../common/IconBtn";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { updatePassword } from '../../../services/operations/profileAPI';


function ChangePassword({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => (state.auth));

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const submitHandler = async(data) => {
        console.log(data);
        try{
            const response = dispatch(updatePassword(token,data));

        }catch(error){
            console.log("Error while calling Api",error)
        }
    }


    return (
        <div className="bg-richblack-800 text-richblack-700 p-4 gap-2 rounded-md flex flex-col">
            <div className="text-richblack-5 text-[18px] font-[600] mb-2">
                Password
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
                <div className="flex gap-12">

                    {/* current password */}
                    <div className="flex flex-col gap-1 lg:w-[45%] relative">
                        <div className="text-richblack-5 text-[14px] font-[400]">
                            Current Password
                        </div>
                        <input type={showPassword ? "text" : "password"} className="form-style" name='oldPassword'
                            {...register('oldPassword',
                                {
                                    required: true,
                                    message: "Please enter your Old Password",
                                })
                            } />
                        {errors.oldPassowrd && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.oldPassowrd.message}
                            </span>
                        )}


                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[40px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>

                    </div>

                    {/* change password */}
                    <div className="flex flex-col gap-1 lg:w-[45%] relative">
                        <div className="text-richblack-5 text-[14px] font-[400]">
                            New Password
                        </div>

                        <input type={showNewPassword ? "text" : "password"} className="form-style" name='newPassword'
                            {...register('newPassword',
                                {
                                    required: true,
                                    message: "Please Enter the New Password"
                                })
                            } />
                        {errors.newPassword && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                {errors.newPassword.message}
                            </span>
                        )}

                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-[40px] z-[10] cursor-pointer"
                        >
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>

                    </div>
                </div>

                <div className='flex gap-4 my-4 justify-end mr-4'>
                    <IconBtn text={"Cancel"} type={'button'} onclick={() => { navigate(-1) }}
                        customClasses={"text-richblack-100 text-base px-4 py-1 rounded-md border border-richblack-500"} />

                    <IconBtn text={"Save"} customClasses={"bg-yellow-50 text-richblack-900 text-base px-4 py-1 rounded-md"}
                            type={'submit'}
                    />
                </div>
            </form >

        </div>

    )
}

export default ChangePassword