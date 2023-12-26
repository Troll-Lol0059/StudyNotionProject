import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText';
import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/aboutUs/Quote';
import VisionStory from '../components/core/aboutUs/VisionStory';
import Stats from '../components/core/aboutUs/Stats';


function AboutUs() {


  return (
    <div className='text-richblack-5 w-[100vw]'>
        <section className='lg:w-[100%] bg-richblack-800 flex justify-center items-center'>

            <div className='relative w-11/12 mx-auto flex flex-col items-center justify-center my-36'>
                <h1 className='text-3xl w-[55%] text-center font-inter font-semibold'>Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"} />
                </h1>

                <div className='w-[60%] my-6 text-base font-inter font-[500] text-center'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </div>

            </div>
        </section>


        <section className='lg:w-[100%] bg-richblack-900 flex flex-col justify-center items-center  my-44'>

            <Quote />

            <VisionStory />

            <Stats />

        </section>



        {/* <div className='absolute lg:flex justify-center items-center gap-8 top-[-20%]'> 
                    <img src={aboutus1} alt='about us 1 image' />
                    <img src={aboutus2} alt='about us 2 image'  />
                    <img src={aboutus3} alt='about us 3 image' />
        </div> */}

    </div>
  )
}

export default AboutUs;