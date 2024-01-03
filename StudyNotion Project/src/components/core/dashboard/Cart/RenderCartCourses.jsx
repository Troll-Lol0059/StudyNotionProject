import react from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { TiStarFullOutline } from "react-icons/ti";
import {RiDeleteBin6Line} from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';


const RenderCartCourses = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector( (state) => state.cart );
    <div className="flex flex-1 flex-col">
        {
            cart.map( (course,index) => {
                <div key={index}  
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                    index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                  } ${index !== 0 && "mt-6"} `}>
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        <img src={course?.thumbnail} alt='course thumbnail' />

                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                            <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                            <div className="flex items-center gap-2">
                                {/* Connect get average rating API */}
                                <span  className="text-yellow-5">4.8</span>

                                <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor={"#ffd700"}
                                emptyIcon={<TiStarFullOutline />}
                                fullIcon={<TiStarFullOutline />}
                                />

                                <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>

                            </div>

                            <div className="flex flex-col items-end space-y-2">
                                <button onClick={ () => dispatch(removeFromCart(course._id)) }>
                                    <RiDeleteBin6Line />
                                    <span>Remove</span>
                                </button>

                                <p className="mb-6 text-3xl font-medium text-yellow-100">
                                    Rs. {course?.price} 
                                </p>   
                            </div>

                        </div>
                    </div>
                </div>
            } )
        }
    </div>
}

export default RenderCartCourses;