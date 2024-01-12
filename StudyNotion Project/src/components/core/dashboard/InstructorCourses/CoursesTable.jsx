import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody,Td,Tr,Th,Thead } from "react-super-responsive-table";
import ConfirmationModal from '../../../common/ConfirmationModal';
import {deleteCourse,fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI'
import { COURSE_STATUS } from '../../../../utils/constants';
import { setCourse } from "../../../../slices/courseSlice";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../../utils/dateFormatter";
import { MdEdit,MdDelete } from "react-icons/md";
import { FaCheckCircle,FaClock } from "react-icons/fa";


export default function CoursesTable( {courses,setCourses} ){
    const dispatch = useDispatch();
    const {token} = useSelector( (state) => state.auth );
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null)
    const navigate = useNavigate();

    const handleCourseDelete = async(courseId) => {
        setLoading(true);
        await deleteCourse({courseId:courseId},token);
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourse(result)
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    return(
        <div className="mt-8 w-[95%] mx-auto ">
            <Table>
                <Thead className='text-richblack-100 text-[16px] border border-dashed border-richblack-600'>
                    <Tr>
                        <Th className='flex items-start px-12'>
                            Courses
                        </Th>
                        <Th>
                            Duration
                        </Th>
                        <Th>
                            Price
                        </Th>
                        <Th>
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody className='border border-dashed border-richblack-600'>
                    {
                        courses.length === 0 ? 
                        (
                            <Tr className='flex text-richblack-5'>
                                <Td>
                                    No Courses Found
                                </Td>
                            </Tr>
                        )
                        :courses?.map( (course) => (
                            <Tr key={course._id}>
                                <Td className="flex gap-x-10 border-richblack-800 p-8">
                                    <img src={course?.thumbnail}
                                    className="h-[150px] w-[220px] rounded-lg object-cover" alt="course Thumbnail" />

                                    <div className="flex flex-col gap-4">
                                        <p className="text-richblack-5 text-[20px] font-[600]">{course?.courseName}</p>
                                        <p className="text-richblack-100 text-[16px] font-[400]">{course.courseDescription}</p>
                                        <p className="text-richblack-100 text-[14px] font-[500]">Created At: {formattedDate(course?.createdAt)}</p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (
                                                <div className="lg:w-fit flex items-center gap-2 bg-richblack-700 px-3 py-1
                                                text-[#F37290] text-[14px] rounded-xl">
                                                    <FaCheckCircle />
                                                    DRAFTED
                                                </div>
                                            ) :
                                            (
                                                <div className="lg:w-fit flex items-center gap-2 bg-richblack-700 px-3 py-1
                                                                text-yellow-100 text-[14px] rounded-xl">
                                                    <FaClock />
                                                    PUBLISHED
                                            </div>
                                            )
                                        }
                                    </div>
                                </Td>
                                
                                <Td className="text-richblack-100 text-[16px] font-[400] pl-6">
                                    2hr 30min
                                </Td>

                                <Td className="text-richblack-100 text-[16px] font-[400] pl-4">
                                    Rs. {course.price}
                                </Td>

                                <Td className="text-richblack-100 text-[20px] font-[400] pl-4 space-x-4">
                                    <button
                                    disabled={loading} 
                                    onClick={ () => {
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    } }>
                                        <MdEdit />
                                    </button>

                                    <button
                                    disabled={loading}
                                    onClick={ () => {
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course ?",
                                            text2:"All the data related to this course will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                            btn2Handler: setConfirmationModal(null)
                                        })
                                    } }>
                                        <MdDelete />
                                    </button>
                                </Td>
                            </Tr>
                        ) )
                    }
                </Tbody>
            </Table>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    )
}

