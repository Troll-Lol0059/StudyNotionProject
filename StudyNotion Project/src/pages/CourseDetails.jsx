import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApi';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import  GetAvgRating   from '../utils/avgRating';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import {formattedDate} from '../utils/dateFormatter'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';

function CourseDetails() {
    const {user} = useSelector((state) => state.profile );
    const {token} = useSelector( (state) => state.auth );
    const {loading} = useSelector( (state) => state.profile );
    const {paymentLoading} = useSelector( (state) => state.course );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [confirmationModal,setConfirmationModal] = useState(null);

    const [courseData,setCourseData] = useState(null);

    useEffect( ()=> {
        const getCourseFullDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
            }catch(error){
                console.log("Could not fetch course details",error);
            }
        }
        getCourseFullDetails();
    },[courseId] )

    const [totalNoOfLecture,setTotalNoOfLecture] = useState(0);
    useEffect( () => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach( (sec) => {
            lectures += sec.subSection.length || 0
        } )
        setTotalNoOfLecture(lectures);
    },[courseData] )

    const [averageReviewCount,setAverageReviewCount] = useState(0);
    useEffect( () => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews)
        setAverageReviewCount(count)
    },[courseData] )

    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }else{
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

    if(loading || !courseData){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(!courseData.success){
        <div>
            <Error />
        </div>
    }

    const {
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingsAndReviews,
        instructor,
        studentsEnrolled,
        createdAt
    } = courseData.data?.courseDetails;

    const totalReviews = ratingsAndReviews.length;
    const totalStudents = studentsEnrolled.length;

  return (
    <div className='text-white'>
        <div>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div>
                {/* <span>{averageReviewCount}</span> */}
                <RatingStars Review_Count={averageReviewCount} Star_Size={24} />
                <span>{`(${totalReviews} reviews)`}</span>
                <span>{`(${totalStudents} ) students enrolled`}</span>
            </div>

            <div>
                <div>Created By: {instructor.firstName} {instructor.lastName}</div>
                <div>
                    <p>Created At: { formattedDate(createdAt) }</p>
                    <p>Language: ENGLISH</p>
                </div>
            </div>
        </div>

        <div>
            <CourseDetailsCard 
            course = {courseData?.data.courseDetails}
            setConfirmationModal = {setConfirmationModal}
            handleBuyCourse = {handleBuyCourse}
            />
        </div>
        {confirmationModal && ( <ConfirmationModal modalData={confirmationModal} /> )}
    </div>
  )
}

export default CourseDetails