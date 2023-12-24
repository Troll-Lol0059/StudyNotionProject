import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png"

const TimeLine = [
    {
        Logo:Logo1,
        headline: "Leadership",
        Description:"Fully Commited to the success company",
    },
    {
        Logo:Logo2,
        headline: "Leadership",
        Description:"Fully Commited to the success company",
    },
    {
        Logo:Logo3,
        headline: "Leadership",
        Description:"Fully Commited to the success company",
    },
    {
        Logo:Logo4,
        headline: "Leadership",
        Description:"Fully Commited to the success company",
    }
]

function TimeLineSection() {
  return (
    <div className='relative w-[80%] mx-auto max-w-maxContent flex justify-center items-center gap-8 mt-8'>
        <div className='w-[40%] flex justify-center items-center'>
            <div className='w-[100%] flex flex-col gap-8'>
                {
                    TimeLine.map( (element,index) => {
                        return(
                            <div className='flex gap-6' key={index}>
                                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={element.Logo} />
                                </div>

                                <div >
                                    <h2 className='font-semiBold text-[18px]'>{element.headline}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </div>

        <div className='relative shadow-blue-200 w-[55%]'>
            <img src={timeLineImage} alt='timelineImage'
            className='shadow-white object-cover' />
        </div>

        <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-7 rounded-md
            left-[50%] bottom-[-5%]'>
            <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-4'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
            </div>

            <div className='flex gap-5 items-center px-4'>
                <p className='text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection;