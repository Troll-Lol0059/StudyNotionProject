import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import {ACCOUNT_TYPE} from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import { set } from 'react-hook-form';

function CourseDetailsCard( {course, setConfirmationModal, handleBuyCourse} ) {
    const {
        thumbnail:thumbnailImage,
        price:currentPrice,
    } = course;

    const {user} = useSelector( (state) => state.profile );
    const {token} = useSelector( (state) => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are a instructor, you cant buy a course")
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"Your are not logged in.",
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
    <div>
        <img src={thumbnailImage} alt='course thumbnail' 
        className='max-h-[300px] min-h-[100px] w-[400px] rounded-xl'
        />

        <div>
            Rs. {currentPrice}
        </div>

        <div>
            <button
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
                <button onClick={handleAddToCart}>
                    Add to Cart
                </button>
               )
            }
        </div>

        <div>
            <p>30-Day Money Back Guarantee</p>
            <p>
                This Course Includes:
            </p>

            <div className='flex flex-col'>
                {
                    course?.instructions.map( (item,index) => (
                        <p key={index}>
                            <span>
                                {item}
                            </span>
                        </p>
                    ) )
                }
            </div>

            <div>
                <button
                onClick={handleShare}>
                    Share
                </button>
            </div>
        </div>
    </div>
  )
}

export default CourseDetailsCard