import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {fetchCourseCategories} from '../../../../services/operations/courseDetailsAPI';
import {HiOutlineCurrencyRupee} from 'react-icons/hi';
import  RequirementsField from './RequirementsField';


function CourseInformationForm () {
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState:{errors}
  } = useForm();

  const dispatch = useDispatch();

  const {course,editCourse} = useSelector( (state) => state.course );
  const [loading,setLoading] = useState(false);
  const [courseCategories,setCourseCategories] = useState([]) ;

  useEffect( () => {
    const getCategories = async() => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      console.log(categories);
      if(categories.length > 0){
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    if(editCourse){
      setValue("courseTitle",course.courseName);
      setValue("courseShortDesc",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseTags",course.tag);
      setValue("courseBenefits",course.whatYouWillLearn);
      setValue("courseCategory",course.category);
      setValue("courseRequirements",course.instructions);      
      setValue("courseImage",course.thumbnail);      
    }

    getCategories();
  },[] )

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-white rounded-md border-richblack-700 bg-richblack-800 space-y-8'>
        <div>
          <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>
          <input id='courseTitle'
          placeholder='Enter Course Title' className='form-style'
          {...register('courseTitle',{required:true})} 
          />
          {errors.courseTitle && (<span className='form-error-span'>Course title is required</span>)}
        </div>

        <div>
          <label htmlFor='courseShortDesc'>Short Description <sup>*</sup> </label>
          <textarea id='courseShortDesc'
          placeholder='Enter Short Description' className='form-style'
          {...register('courseShortDesc',{required:true})} 
          />
          {errors.courseShortDesc && (<span className='form-error-span'>Short Description is required</span>)}
        </div>

        <div className='relative'>
          <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
          <input id='coursePrice'
          placeholder='Enter Course Price' className='form-style'
          {...register('coursePrice',
          {required:true,
            valueAsNumber:true,
          })} 
          />

          <div className='absolute'>
            <HiOutlineCurrencyRupee />
          </div>

          {errors.coursePrice && (<span className='form-error-span'>Price is required</span>)}
        </div>

        <div>
          <label htmlFor='courseCategory'>Course Category <sup>*</sup></label>

          <select id='courseCategory' defaultValue={""}
          className='form-style'
          {...register('courseCategory',{required:true})}
          >

              <option value="" disabled>Choose a Category</option>

              {
                !loading && courseCategories.map( (category,index) => (
                  <option key={index} value={category._id}>
                    {category?.name}
                  </option>
                ) )
              }

          </select>
          {errors.courseCategory &&(<span className='form-error-span'>Course Category is required</span>)}
        
          {/* todo : add a tag component & thumbnail component*/}

          <div>
            <label htmlFor='courseBenefits'>Benefits of the Course <sup>*</sup></label>
            <textarea id='courseBenefits'
            placeholder='Enter the course Benefits'
            {...register('courseBenefits',{required:true})}
            className='form-style'
            />

            {errors.courseBenefits && (<span className='form-error-span'>Please Enter course Benefits</span>) }
          </div>

          <RequirementsField 
          name='courseRequirements'
          label='Requirements/Instructions'
          register={register}
          errors={errors}
          setValue={setValue}
          getValue={getValue}
          />

        </div>

    </form>
  )
}

export default CourseInformationForm