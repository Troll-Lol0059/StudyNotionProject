import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText';
import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/aboutUs/Quote';
import VisionStory from '../components/core/aboutUs/VisionStory';
import Stats from '../components/core/aboutUs/Stats';
import LearningSection from '../components/core/aboutUs/LearningSection';
import ContactUsForm from '../components/core/aboutUs/ContactUsForm';
import Footer from "../components/common/Footer";



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


            <section className='lg:w-[100%] bg-richblack-900 flex flex-col justify-center items-center  lg:my-[15rem]'>

                <Quote />

                <VisionStory />

                <Stats />

                <LearningSection />

                <div className="lg: w-11/12 mx-auto flex flex-col justify-center items-center gap-2 mt-40">
                    <div className="text-3xl font-semibold text-richblack-5">
                        Get In Touch
                    </div>

                    <div className="text-base text-richblack-300">
                        We’d love to here for you, Please fill out this form.
                    </div>

                    
                    <ContactUsForm />

                </div>

            </section>

        <div className='lg:absolute lg:top-[65%] lg:left-[5%] lg:flex justify-center items-center gap-8'> 
                <img src={aboutus1} alt='about us 1' />
                <img src={aboutus2} alt='about us 2'  />
                <img src={aboutus3} alt='about us 3' />
        </div>

        <div className='aboutUsBlob lg:absolute lg:top-[65%] lg:left-[35%]'></div>

        <Footer/>

        </div>

    )
}

export default AboutUs;