import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect( () =>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue('public',true);
        }
    },[]);

    const submitHandler = () => {
        handleCoursePublic();
    }

    const goBack = ()=> {
        dispatch(setStep(2));
    }

    const handleCoursePublic = async() => {
        if( (course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true ) ||
           (course.status === COURSE_STATUS.DRAFT && getValues('public') === false) ){
            // no updation in form
            goToCourses();
            return
        }
        const formData = new FormData();
        formData.append('courseId',course._id);
        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append('status',courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData,token);

        if(result){
            goToCourses();
        }
        setLoading(false);

    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        // navigate('/dashboard/my-courses');
    }

    return (
        <div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700">
            <p>Publish Course</p>

            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="public">
                        <input
                            type="checkbox"
                            id="public"
                            {...register('public', { required: true })}
                        />

                    Make this course as Public</label>
                </div>

                <div className="flex gap-x-3 justify-end">
                    <button disabled={loading}
                    type="button"
                    onClick={goBack}
                    className="bg-richblack-300 px-4 py-1 rounded-md"
                    >
                        Back
                    </button>

                    <IconBtn disabled={loading}
                        text={"Save Changes"}
                        customClasses={"bg-yellow-50 px-2 py-1 rounded-md"}
                    />
                </div>
            </form>
        </div>
    )
}

export default PublishCourse;