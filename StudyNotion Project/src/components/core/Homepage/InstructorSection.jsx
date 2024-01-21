import React from 'react';
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection() {
    return (
        <div className='mt-16'>
            <div className='lg:flex lg:flex-row flex flex-col-reverse gap-20 items-center'>
                <div className='lg:w-[50%]'>
                    <img
                        src={Instructor}
                        alt='instrcutor image'
                        className='' />
                </div>

                <div className='lg:w-[50%] flex flex-col gap-4'>
                    <div className='text-4xl font-semibold w-[50%]'>
                        Become an <HighlightText text={"Instructor"} />
                    </div>

                    <div className='font-medium text-[16px] lg:w-[80%] text-richblack-300'>
                        Instructors from around the world teach millions of students on
                        StudyNotion. We provide the tools and skills to teach what you love.
                    </div>

                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex justify-center items-center gap-2'>
                                Start Learning Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InstructorSection