import React from 'react'
import foundingStoryImage from "../../../assets/Images/FoundingStory.png"


function VisionStory() {

    const data = [
        {   
            title:"Our Founding Story",
            description:"Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.",
            description2:"As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.",
        },
        {

        },
        {   
            title:"Our Vision",
            description:"With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.",
            description2:"",
        },
        {   
            title:"Our Mission",
            description:"our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.",
            description2:"",
        }
    ]

    return (
        <div className='relative lg:w-11/12 mx-auto flex flex-col items-center justify-center mt-20'>

            <div className='lg:w-[80%] font-inter font-[500] text-richblack-100
            grid grid-rows-2 grid-cols-2 gap-24 gap-y-12 justify-between px-8 pt-20 items-center'>
                    {
                        data.map( (element,index) => (
                            <div key={index}>
                                {
                                    index == 1 ? 
                                    <div className='relative'> 
                                        <img src={foundingStoryImage} alt='foundingStoryImage' />
                                        <div className='foundingStoryBlob absolute -top-5 -left-10'></div>     
                                    </div> 
                                    : 
                                    <div className='flex flex-col gap-2'>
                                        <div className={`${index==0 ? 'foundingStory' : 'ourVision'} text-3xl font-semibold mb-4`}>
                                         {element.title} 
                                        </div>

                                        <div className='text-base font-[500] text-richblack-300 capitalize'>
                                            {element.description}
                                        </div>

                                        <div className='text-base font-[500] text-richblack-300 capitalize'>
                                            {element.description2}
                                        </div>
                                    </div>
                                }    
                            </div>
                        ) )
                    }    
            </div>

        </div>

    )
}

export default VisionStory