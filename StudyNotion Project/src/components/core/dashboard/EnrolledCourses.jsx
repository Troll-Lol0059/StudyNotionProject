import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
        try {
            const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses
            setEnrolledCourses(res);
        } catch (error) {
            console.log("Unable to fetch Courses", error);
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, [])

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
                            <div className="flex flex-col items-between rounded-md lg:w-[90%] my-4 mx-2 bg-richblack-900
                                border border-richblack-700">
                                <div className="flex justify-between border bg-richblack-700 rounded-md text-richblack-100">
                                    <p className="w-[45%] px-5 py-3">Course Name</p>
                                    <p className="w-1/4 px-2 py-3">Duration</p>
                                    <p className="flex-1 px-2 py-3">Progress</p>
                                </div>

                                <div className="lg:w-[85%] my-3 mx-4" >
                                    {
                                        enrolledCourses.map((course, index) => (
                                            <div className={`flex justify-between items-center ${index === course.length - 1 ? "rounded-b-lg" : "rounded-none"
                                                }`} key={index} 
                                                onClick={() => {
                                                    navigate(
                                                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                    )
                                                  }} >
                                                <div className="flex gap-4">
                                                    <img src={course.thumbnail} alt="course thumbnail" className="h-16 w-16 rounded-lg object-cover" />

                                                    <div className="flex max-w-xs flex-col gap-2">
                                                        <p className="font-semibold text-richblack-5">
                                                            {course.courseName}
                                                        </p>
                                                        <p className="text-xs text-richblack-300">
                                                            {course.courseDescription}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="px-10 py-3 text-richblack-50">
                                                    {course?.totalDuration}
                                                </div>

                                                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                                    <p className="text-richblack-50">Progress: {course.progressPercentage || 0}</p>
                                                    <ProgressBar completed={course.progressPercentage || 0}
                                                        height="8px"
                                                        isLabelVisible={false}
                                                    />
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
            }
        </div>
    )
}

export default EnrolledCourses