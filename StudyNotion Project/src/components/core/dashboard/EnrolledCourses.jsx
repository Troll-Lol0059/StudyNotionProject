import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import {getUserEnrolledCourses} from "../../../services/operations/profileAPI"

const EnrolledCourses = () => {
    const dispatch = useDispatch();
    const {token} = useSelector( (state) => state.auth );
    const [enrolledCourses,setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() =>{
        try{
            const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses
    
            setEnrolledCourses(res);
        }catch(error){
            console.log("Unable to fetch Courses",error);
        }
    }

    useEffect( () => {
        getEnrolledCourses();
    },[] )

    return (
        <div>
            <div className="text-3xl text-richblack-50">Enrolled Courses</div> 
            {
                !enrolledCourses ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    Loading...
                </div>
                ) 
                :
                enrolledCourses.length === 0 ? 
                (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                    You have not enrolled in any course
                </p>)
                :
                (
                    <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>

                        {
                            enrolledCourses.map( (course,index) => (
                                <div className={`flex items-center border border-richblack-700 ${
                                    index === course.length - 1 ? "rounded-b-lg" : "rounded-none"
                                  }`} key={index} >
                                    <img src={course.thumbnail} alt="course thumbnail" className="h-14 w-14 rounded-lg object-cover" />
                                
                                    <div className="flex max-w-xs flex-col gap-2">
                                        <p className="font-semibold">
                                            {course.courseName}
                                        </p>
                                        <p className="text-xs text-richblack-300">
                                            {course.courseDescription}
                                        </p>
                                    </div>

                                    <div className="w-1/4 px-2 py-3">
                                        {course?.totalDuration}
                                    </div>

                                    <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                        <p>Progress: {course.progressPercentage || 0}</p>
                                        <ProgressBar completed={course.progressPercentage || 0}
                                                     height="8px"
                                                     isLabelVisible={false} 
                                        />
                                    </div>

                                </div>
                            ) )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default EnrolledCourses