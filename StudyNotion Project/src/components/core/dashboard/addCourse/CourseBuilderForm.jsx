import React, { useState } from 'react'
import { IoAddCircle, IoEditCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSection } from '../../../../services/operations/courseDetailsAPI';
import IconBtn from '../../../common/IconBtn';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { setEditCourse, setStep } from '../../../../slices/courseSlice';


const CourseBuilderForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editSectionName, setEditSectionName] = useState(true);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)
    const submitHandler = async (data) => {
        // console.log(data);
        // setLoading(true);
        // const response = await createSection(data,token);
        // console.log(response);
        // setLoading(false);
    }

    const cancelEdit = () => {
        setEditSectionName(false);
        setValue("sectionName", "");
    }

    const handleNext = () => {
        dispatch(setStep(3));

    }

    const handleBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    return (
        <>
            <form className='bg-richblack-800 border border-richblack-700 px-6 py-4 flex flex-col gap-4 rounded-md'
                onSubmit={handleSubmit(submitHandler)}>
                <div className='text-richblack-5 text-[24px] font-semibold'>Course Builder</div>

                <input type='text' className='form-style' name='sectionName'
                    placeholder='Add a section to build your course'
                    {...register('sectionName', { required: true })}
                />
                {errors.sectionName && (<span className='form-error-span'>Section Name is required</span>)}


                {
                    !editSectionName ?
                        <button className='text-yellow-50 flex justify-start items-center gap-2 border border-yellow-50 w-fit
                        py-2 px-4 rounded-md my-6 cursor-pointer' type='submit'>
                            <IoAddCircle />
                            <div className='text-base font-500'>
                                Create Section
                            </div>
                        </button> :
                        <div className='flex items-center gap-4 my-6'>
                            <button className='text-yellow-50 flex justify-start items-center gap-2 border border-yellow-50 w-fit
                            py-2 px-4 rounded-md cursor-pointer' type='submit'>
                                <FaEdit />
                                <div className='text-base font-500'>
                                    Edit Section
                                </div>
                            </button>
                            <button className=' underline text-richblack-400 cursor-pointer' type='button'
                                onClick={cancelEdit} >
                                Cancel Edit
                            </button>
                        </div>
                }

            </form>

            {
                course.courseContent.length > 0 && (
                    <div>

                    </div>
                )
            }

            <div className='flex gap-4 my-20 justify-end px-4'>
                <IconBtn customClasses={"bg-richblack-800 py-2 px-4 items-center"}
                    children={
                        <div className='flex rounded-md items-center gap-2'>
                            <FaAngleLeft />
                            <div>Back</div>
                        </div>
                    }
                    onclick={handleBack}
                />
                <IconBtn customClasses={"bg-yellow-50 py-2 px-4 "}
                    children={
                        <div className='flex rounded-md items-center gap-2'>
                            <div>Next</div>
                            <FaAngleRight />
                        </div>
                    }
                    onclick={handleNext}
                />
            </div>

        </>


    )
}

export default CourseBuilderForm;
