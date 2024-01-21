import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import { set } from 'react-hook-form';
import { FaClock, FaMobile, FaFile } from "react-icons/fa";
import { GiArrowCursor } from "react-icons/gi";


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const {
        thumbnail: thumbnailImage,
        price: currentPrice,
    } = course;

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are a instructor, you cant buy a course")
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "Your are not logged in.",
            text2: "Please login to add to cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        // copies the current url to clipboard
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }

    return (
        <div className='bg-richblack-500 lg:w-[370px] w-[95%] mx-auto rounded-md pb-4'>
            <img src={thumbnailImage} alt='course thumbnail'
                className='max-h-[300px] min-h-[100px] w-full h-[200px] rounded-md'
            />

            <div className='lg:w-[90%] lg:mx-auto mx-8 flex flex-col gap-4'>
                <div className='w-full'>
                    <div className='text-richblack-5 font-inter font-[700] text-[30px] mt-2'>
                        Rs. {currentPrice}
                    </div>
                    <button
                        className='text-center text-[16px] text-richblack-900 px-6 py-2 my-2 rounded-md font-bold
                        bg-yellow-50 hover:scale-95 transition-all duration-200 w-full'
                        onClick={
                            user && course?.studentsEnrolled.includes(user?._id) ?
                                () => navigate("/dashboard/enrolled-courses") :
                                handleBuyCourse
                        }
                    >
                        {
                            user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                        }
                    </button>

                    {
                        (!course?.studentsEnrolled.includes(user?._id) &&
                            <button onClick={handleAddToCart}
                                className='text-center ext-[16px] text-richblack-900 px-6 py-2 my-1 rounded-md font-bold
                                bg-yellow-50 hover:scale-95 transition-all duration-200 w-full'>
                                Add to Cart
                            </button>
                        )
                    }
                </div>

                <div className='w-full'>
                    <p className='text-center text-[14px] font-[400] text-richblack-25 mb-2'>30-Day Money Back Guarantee</p>
                    <p className='text-[16px] font-[500] text-richblack-5'>
                        This Course Includes:
                    </p>

                    <div className='flex flex-col gap-1'>
                        <div className='flex capitalize text-[14px] text-[#06D6A0] font-[500] items-center gap-2'>
                            <span> <FaClock /> </span>
                            <span>
                                8 hours on-demand video
                            </span>
                        </div>

                        <div className='flex capitalize text-[14px] text-[#06D6A0] font-[500] items-center gap-2'>
                            <span> <GiArrowCursor /> </span>
                            <span>
                                Full Lifetime access
                            </span>
                        </div>

                        <div className='flex capitalize text-[14px] text-[#06D6A0] font-[500] items-center gap-2'>
                            <span> <FaMobile /> </span>
                            <span>
                                Access on Mobile and TV
                            </span>
                        </div>

                        <div className='flex capitalize text-[14px] text-[#06D6A0] font-[500] items-center gap-2'>
                            <span> <FaFile /> </span>
                            <span>
                                Certificate of completion
                            </span>
                        </div>
                    </div>

                    <div className='w-full text-center text-yellow-50 py-2 px-8 mt-8 border border-yellow-50 rounded-md'>
                        <button
                            onClick={handleShare}>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsCard