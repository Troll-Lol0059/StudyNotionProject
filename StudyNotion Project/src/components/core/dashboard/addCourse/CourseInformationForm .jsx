import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementsField from './RequirementsField';
import ChipInput from './ChipInput';
import Thumbnail from './Thumbnail';
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "../../../common/IconBtn";
import { setCourse, setStep } from "../../../../slices/courseSlice";
import toast from 'react-hot-toast';
import { COURSE_STATUS } from "../../../../utils/constants"


function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      console.log(categories);
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, [])


  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.price !== course.price ||
      currentValues.courseTags !== course.tag ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    )
      return true;
    else
      return false;

  }

  // handle next button click
  const onSubmit = async (data) => {
    console.log(data);
    if (editCourse) {
      if (isFormUpdated) {
        // if form is edited check which field is edited
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }

        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", data.courseRequirements)
        }

        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", data.courseTags)
        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage)
        }

        setLoading(true);
        // call edit course API
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          // if result succes goto step 2
          dispatch(setStep(2));
          // set course details as updated details
          dispatch(setCourse(result));
        }
      }
      else{
        toast.error("No changes made");
      }
      return;
    }

    // create a new course
    const formData = new FormData();
    formData.append("courseName",data.courseTitle);
    formData.append("courseDescription",data.courseShortDesc);
    formData.append("price",data.coursePrice);
    formData.append("whatYouWillLearn",data.courseBenefits);
    formData.append("category",data.courseCategory);
    formData.append("instructions",JSON.stringify(data.courseRequirements));
    formData.append("thumbnail", data.courseImage);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("status",COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData,token);
    if(result){
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      {/* div for course title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor='courseTitle' className="text-sm text-richblack-5">Course Title
          <sup className="text-pink-200">*</sup></label>
        <input id='courseTitle'
          placeholder='Enter Course Title' className="form-style w-full"
          {...register('courseTitle', { required: true })}
        />
        {errors.courseTitle && (<span className='form-error-span'>Course title is required</span>)}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor='courseShortDesc' className="text-sm text-richblack-5">Short Description
          <sup className="text-pink-200">*</sup> </label>
        <textarea id='courseShortDesc'
          placeholder='Enter Short Description' className='form-style resize-x-none min-h-[130px] w-full'
          {...register('courseShortDesc', { required: true })}
        />
        {errors.courseShortDesc && (<span className='form-error-span'>Short Description is required</span>)}
      </div>

      <div className="relative flex flex-col space-y-2">
        <label htmlFor='coursePrice' className="text-sm text-richblack-5">Course Price
          <sup className="text-pink-200">*</sup></label>
        <input
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", {
            required: true,
            valueAsNumber: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            },
          })}
          className="form-style w-full !pl-12"
        />

        <HiOutlineCurrencyRupee className="absolute top-[58%] left-[2%] inline-block -translate-y-1/2 text-2xl text-richblack-400" />

        {errors.coursePrice && (<span className='form-error-span'>Price is required</span>)}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor='courseCategory' className='text-sm text-richblack-5'>Course Category
          <sup className="text-pink-200">*</sup></label>

        <select id='courseCategory' defaultValue={""}
          className='form-style w-full'
          {...register('courseCategory', { required: true })}
        >

          <option value="" disabled>Choose a Category</option>

          {
            !loading && courseCategories.map((category, index) => (
              <option key={index} value={category._id}>
                {category?.name}
              </option>
            ))
          }

        </select>
        {errors.courseCategory && (<span className='form-error-span'>Course Category is required</span>)}

        {/* todo : add a tag component & thumbnail component*/}

        <ChipInput label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <Thumbnail name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        <div className='flex flex-col gap-2'>
          <label htmlFor='courseBenefits' className="text-sm text-richblack-5">Benefits of the Course
            <sup className="text-pink-200">*</sup></label>
          <textarea id='courseBenefits'
            placeholder='Enter the course Benefits'
            {...register('courseBenefits', { required: true })}
            className='form-style'
          />

          {errors.courseBenefits && (<span className='form-error-span'>Please Enter course Benefits</span>)}
        </div>

        <RequirementsField
          name='courseRequirements'
          label='Requirements/Instructions'
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Next Button */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          <IconBtn
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
            customClasses={"flex items-center bg-yellow-50 rounded-md px-4 py-2 mt-12"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>

      </div>

    </form>
  )
}

export default CourseInformationForm