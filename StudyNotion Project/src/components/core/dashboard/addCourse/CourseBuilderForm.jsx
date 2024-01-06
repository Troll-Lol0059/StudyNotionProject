import React, { useState } from 'react'
import { IoAddCircle, IoEditCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../services/operations/courseDetailsAPI';
import IconBtn from '../../../common/IconBtn';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import NestedView from './NestedView';


const CourseBuilderForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editSectionName, setEditSectionName] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    
    // CREATES / EDITS THE SECTION
    const submitHandler = async(data) => {
        setLoading(true);
        let result = null;

        if(editSectionName){
            // editing section
            result = await updateSection({
                sectionName:data.sectionName,
                sectionId: editSectionName,
                courseId:course._id,
            },token)
        }
        else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId:course._id,
            },token);
        }

        // update values
        if(result){
            // console.log("Logging result",result);
            dispatch(setCourse(result.data));
            setEditSectionName(null);
            setValue("");
        }
        setLoading(false);
    }

    const cancelEdit = () => {
        setEditSectionName(false);
        setValue("sectionName", "");
    }

    const handleNext = () => {
        if(course.courseContent.length === 0){
            toast.error("Please Add atleast One Section");
            return;
        }
        if(course.courseContent.some( (section) => section.subSection.length === 0 )){
            toast.error("Please add atleast One Sub-Section to proceed");
            return;
        }

        dispatch(setStep(3));
    }

    const handleBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    // doubt in logic
    const handleChangeEditSectionName = (sectionId,sectionName) => {
        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }
        
        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }

    return (
        <div className='bg-richblack-800 border border-richblack-600 px-6 py-4 gap-4 rounded-md'>
            <div className='text-richblack-5 text-[24px] font-semibold'>Course Builder</div>
                <form onSubmit={handleSubmit(submitHandler)} className='bg-richblack-800 px-6 py-4 flex flex-col gap-4 rounded-md' >
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
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
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

        </div>

    )
}

export default CourseBuilderForm;
