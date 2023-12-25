import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const location = useLocation()

    const formHandler = (data) =>{
        const {password,confirmPassword} = data;
        const token = location.pathname.split("/").at(-1);
        console.log(password,confirmPassword,token);
        dispatch(resetPassword(password,confirmPassword,token,navigate));
    }

    return (
        <div className='lg:h-[100vh] flex flex-col justify-center items-center text-richblack-100 font-inter'>
            <div className='flex flex-col'>
                <h2 className='text-3xl font-bold text-richblack-5'>Choose New Password</h2>
                <p className='text-base w-[89%] my-3'>Almost Done. Enter your new password and you're all set.</p>

                <form className='flex flex-col' onSubmit={handleSubmit(formHandler)}>

                    <div className='my-2 relative'>      
                        <label className='my-2'>New Password <sup className='text-[red]'>*</sup> </label>
                        <input required style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" 
                                type= {showPassword ? 'text' : 'password' }
                                name='password'
                                {...register('password')}
                            />
                    
                        <div className='absolute top-8 right-5'
                            onClick={ () => {setShowPassword(!showPassword)} }>
                            <IconContext.Provider value={{size:"30px"}}>
                            {
                                showPassword ?  <AiOutlineEyeInvisible /> : <AiOutlineEye />
                            }
                            </IconContext.Provider>
                        </div>

                    </div>

                    <div className='my-2 relative'>
                        <label className='mt-4 mb-2'>Confirm Password <sup className='text-[red]'>*</sup> </label>
                        <input required style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                type= {showConfirmPassword ? 'text' : 'password' }
                                name='confirmPassword'
                                {...register('confirmPassword')}
                            />
                                          
                        <div className='absolute top-8 right-5'
                            onClick={ () => {setShowConfirmPassword(!showConfirmPassword)} }>
                            <IconContext.Provider value={{size:"30px"}}>
                            {
                                showConfirmPassword ?  <AiOutlineEyeInvisible /> : <AiOutlineEye />
                            }
                            </IconContext.Provider>
                        </div>

                    </div>
                    
                    <button type='submit' className="text-center text-[13px] px-6 py-3 rounded-md font-bold
                    bg-yellow-50 text-black hover:scale-95 transition-all duration-200 mt-8" 
                    >
                        Reset Password
                    </button>

                </form>

                <Link to="/login">
                    <div className='mt-3 text-[blue] underline'>
                        Back to Login
                    </div>
                </Link>

            </div>
        </div>
    )
}
