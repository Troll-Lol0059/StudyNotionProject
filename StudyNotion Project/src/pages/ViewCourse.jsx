import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
  } from "../slices/viewCourseSlice";
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';


const ViewCourse = () => {
    const [reviewModal,setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector( (state) => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        ;(async () => {
          const courseData = await getFullDetailsOfCourse(courseId, token)
          // console.log("Course Data here... ", courseData.courseDetails)
          dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
          dispatch(setEntireCourseData(courseData.courseDetails))
          dispatch(setCompletedLectures(courseData.completedVideos))
          let lectures = 0
          courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length
          })
          dispatch(setTotalNoOfLectures(lectures))
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
  return (
    <>
      <div className="relative lg:flex lg:min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="lg:h-[calc(100vh-3.5rem)] lg:flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      
      <div className='text-[50px] text-white'>{reviewModal}</div>
      {
        reviewModal &&( <CourseReviewModal setReviewModal={setReviewModal} />  )
      }
      
    </>
  )
}

export default ViewCourse;
