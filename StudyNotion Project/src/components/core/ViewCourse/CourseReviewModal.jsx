import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { useForm } from 'react-hook-form';

export default function CourseReviewModal( {setReviewModal} ) {
  const {user} = useSelector( (state) => state.profile );
  const {token} = useSelector( (state) => state.auth );
  const { courseEntireData } = useSelector( (state) => state.viewCourse )

    const onSubmit = async(data) => {
        await createRating({
            courseId:courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience,
        },token);

        setReviewModal(false);
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm();

    const ratingChanged = (newRating) => {
        setValue("courseRating",newRating);
    }

    useEffect( () => {
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[])

    return (
    <div>
        <div>
            {/* Modal Header  */}
            <div>
                <p>Add Review</p>
                <div onClick={ () => setReviewModal(false) }>
                    Close
                </div>

                {/* modal body */}
                <div>
                    <div>
                        <img 
                            src={user?.image}
                            alt='profile image'
                            className='aspect-square w-[50px] rounded-full object-cover'
                        />

                        <div>
                            <p>{user?.firstName} {user?.lastName}</p>
                            <p>Posting Publicly</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} >

                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="'#ffd700'"
                            />

                            <div>
                                <label htmlFor='courseExperience'>Add your experiece</label>
                                <textarea
                                id='courseExperience'
                                placeholder='Add your experience here'
                                {...register("courseExperience",{required:true})}
                                />
                                {errors.courseExperience && (<span>Comment is required</span>)}
                            </div>

                            <div>
                                {/* cancel and save button */}
                                <button onClick={ () => setReviewModal(false) }>
                                    Cancel
                                </button>

                                <IconBtn text="Save" type={'submit'} />
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
