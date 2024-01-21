import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApi';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { formattedDate } from '../utils/dateFormatter'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosGlobe } from "react-icons/io";
import CourseAccordion from '../components/core/Course/CourseAccordion';
import ReviewSlider from '../components/common/ReviewSlider';

function CourseDetails() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
            } catch (error) {
                console.log("Could not fetch course details", error);
            }
        }
        getCourseFullDetails();
    }, [courseId])

    const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLecture(lectures);
    }, [courseData])

    const [averageReviewCount, setAverageReviewCount] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews)
        setAverageReviewCount(count)
    }, [courseData])

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        } else {
            setConfirmationModal(
                {
                    text1: "You are not logged in",
                    text2: "Please login to purchase the course",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1Handler: () => navigate('/login'),
                    btn2Handler: () => setConfirmationModal(null)
                }
            )
        }
    }

    if (loading || !courseData) {
        return (
            <div className='spinner'>

            </div>
        )
    }

    if (!courseData.success) {
        <div>
            <Error />
        </div>
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingsAndReviews,
        instructor,
        category,
        studentsEnrolled,
        createdAt
    } = courseData.data?.courseDetails;

    const totalReviews = ratingsAndReviews.length;
    const totalStudents = studentsEnrolled.length;
    const courseDuration = courseData?.data?.totalDuration;

    return (
        <div>
            <div className='relative bg-richblack-800 pb-4'>
                <div className='w-[90%] mx-auto flex flex-col gap-4'>
                    <div className='py-4'>
                            <span className='text-richblack-300 font-[400] text-[14px]'>
                                Home / Learning /
                            </span>

                            <span className='text-yellow-50 font-[400] text-[14px]'>
                                 {category.name}
                            </span>
                    </div>

                    <p className='text-[30px] font-inter font-[500] text-richblack-5'>{courseName}</p>
                    <p className='text-richblack-200 text-[14px] font-[400]'>{courseDescription}</p>
                    <div className='flex gap-4'>
                        {/* <span>{averageReviewCount}</span> */}
                        <RatingStars Review_Count={averageReviewCount} Star_Size={24} />
                        <span className='text-[16px] text-richblack-25 font-[400]'>{`(${totalReviews} Reviews)`}</span>
                        <span className='text-[16px] text-richblack-25 font-[400]'>{`(${totalStudents} Students Enrolled)`}</span>
                    </div>

                    <div>
                        <div className='text-[16px] text-richblack-25 font-[400]'>Created By: {instructor.firstName} {instructor.lastName}</div>
                        <div className='flex items-center text-[16px] text-richblack-25 font-[400] gap-12'>
                            <p className='flex items-center gap-2'>
                                <span> <FaCircleInfo /> </span>
                                <span>Created At: {formattedDate(createdAt)}</span>
                            </p>
                            <p className='flex items-center gap-2'>
                                <span> <IoIosGlobe /> </span>
                                <span>English</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='lg:absolute lg:top-[15%] lg:right-[5%] mt-2'>
                <CourseDetailsCard
                    course={courseData?.data.courseDetails}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                />
            </div>

            <div className='lg:w-[90%] mx-auto my-6 text-richblack-5'>
                {/* what will you learn section */}
                <div className='lg:w-[65%] border border-dashed border-richblack-700 flex flex-col gap-4 px-4 py-6'>
                    <div className='text-[30px] font=[500]'>
                        What you'll learn
                    </div>

                    <div>
                        {whatYouWillLearn}
                    </div>                     
                </div>

                <div className='lg:w-[65%] border border-dashed border-richblack-700 flex flex-col gap-4 px-4 py-6 my-8'>
                    <div className='text-[24px] font-[600] text-richblack-5'>
                        Course Contents
                    </div>
                    
                    <div className='flex gap-2 tex-[14px] text-richblack-50 font-[400]'>
                        <div>
                            {courseContent.length} Sections
                        </div>

                        <div>|</div>

                        <div> 
                            {totalNoOfLecture} Lectures 
                        </div>

                        <div>|</div>

                        <div>Duration: {courseDuration}</div>

                    </div>
                    
                    <CourseAccordion courseContent={courseContent} className="w-full" />

                </div>

                <div className='lg:w-[60%] flex flex-col gap-4 px-4'>
                    <div className='text-[24px] font-[600]'>
                        Author
                    </div>

                    <div className='flex items-center gap-4'>
                        <div >
                            <img src={instructor?.image} alt='instructorImage' 
                            className='aspect-square rounded-full h-[40px] w-[40px]'/>
                        </div>

                        <div className='text-[16px] font-[500]'>
                            <span>{instructor.firstName} {instructor.lastName}</span>
                        </div>
                    </div>

                    <div className='font-[400] text-[14px] text-richblack-50'>
                        I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!
                    </div>
                </div>

                <div className='flex flex-col mt-16'>
                    <div className='text-richblack-5 text-[30px] font-[600]'>
                        See What Other Say About this Course
                    </div>
                    <ReviewSlider />
                </div>
            </div>

            {confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)}
        </div>
    )
}

export default CourseDetails