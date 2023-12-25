import React, { useEffect } from 'react';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from "../services/operations/authAPI";


function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const { loading, signupData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
            navigate("/signup")
        }
    }, []);

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        const {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        } = signupData;
    
        dispatch(
          signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
          )
        );
      };


    return (
        <div className='lg:h-[100vh] flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center text-richblack-100'>
                <h1 className='text-3xl font-bold text-richblack-5'>Verify Email</h1>
                <p className='text-base w-[89%] my-3'>
                    A verification code has been sent to you. Enter the code below
                </p>

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                        <input
                            {...props}
                            placeholder="-"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />
                    )}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
                />


                <button type='submit' className="text-center text-[13px] px-6 py-3 rounded-md font-bold
                    bg-yellow-50 text-black hover:scale-95 transition-all duration-200 mt-8"
                    onClick={handleVerifyAndSignup} >
                    Verify and Register
                </button>

                <div className="mt-6 flex items-center justify-between">
                    <Link to="/signup">
                        <p className="text-richblack-5 flex items-center gap-x-2">
                            <BiArrowBack /> Back To Signup
                        </p>
                    </Link>
                    <button
                        className="flex items-center text-blue-100 gap-x-2"
                        onClick={() => dispatch(sendOtp(signupData.email))}
                    >
                        <RxCountdownTimer />
                        Resend it
                    </button>
                </div>

            </div>
        </div>
    )
}

export default VerifyEmail