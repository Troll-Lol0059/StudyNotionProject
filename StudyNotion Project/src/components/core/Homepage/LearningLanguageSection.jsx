import React from 'react';
import HighlightText from './HighlightText';
import knowYourProgress from '../../../assets/Images/Know_your_progress.svg'
import compareWithOthers from '../../../assets/Images/Compare_with_others.svg'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './CTAButton';


function LearningLanguageSection() {
  return (
    <div className='relative w-[80%] mx-auto max-w-maxContent flex flex-col justify-center items-center gap-5 mt-[130px]'>
        <div className='text-4xl font-semibold text-center'>
            Your Swiss knife for
            <HighlightText text={"learning any language"} />
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base mt-2 lg:w-[60%]'>
            Using spin making learn multiple langiages easy. With 20+ languages relaistic voice-over,
            progress tracking,custom schedule and more.
        </div>

        <div className='lg:flex flex-row justify-center items-center mt-5'>
            <img src={knowYourProgress} alt='know your progress image' className='object-contain lg:-mr-32' />
            <img src={compareWithOthers} alt='compareWithOthers'className='object-contain mt-0' />
            <img src={planYourLessons} alt='planYourLessons'className='object-contain lg:-ml-36 mt-0' />
        </div>

        <div className='mb-8'>
            <CTAButton active={true} linkto={"/signup"}>
                    <div className='bold rounded-sm'>
                        Learn More
                    </div>
            </CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection;