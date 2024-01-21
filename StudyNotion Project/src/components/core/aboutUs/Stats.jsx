import React from 'react'

const data = [
    {
        number:"5K",
        description:"Active Students"
    },
    {
        number:"10+",
        description:"Mentors"
    },
    {
        number:"200+",
        description:"Courses"
    },
    {
        number:"50+",
        description:"Awards"
    },
]

function Stats() {
  return (
    <div className='bg-richblack-700 relative w-[100vw] lg:flex flex-col items-center justify-center mt-20 mb-8'>
        <div className='lg:w-11/12 font-inter font-[500] flex justify-evenly items-center py-14'>
            {
                data.map( (element,index) => (
                    <div key={index} className='flex flex-col justify-center items-center'> 
                        <div className='text-richblack-5 text-3xl font-[700]'>{element.number}</div>
                        <div className='text-richblack-500 text-base'>{element.description}</div>
                    </div>
                ) )
            }
        </div>
    </div>
  )
}

export default Stats;
