import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn'
import CoursesTable from './InstructorCourses/CoursesTable'
import { IoIosAddCircle } from "react-icons/io";

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token);
            if (result) {
                setCourses(result);
            }
        }
        fetchCourses();
    }, [])

    return (
        <div className="mr-20 p-8">
            <div className="flex justify-between">
                <h1 className="text-richblack-5 text-3xl font-[500]">My Courses</h1>

                <div>
                    <IconBtn
                        children={<IoIosAddCircle />}
                        text={"Add Course"}
                        onclick={() => navigate('/dashboard/add-course')}
                        customClasses={'flex flex-row-reverse icon-btn'}
                    />
                </div>
            </div>

            {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
        </div>
    )
}

export default MyCourses;