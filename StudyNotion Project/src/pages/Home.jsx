import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/CTAButton';
import banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import TimeLineSection from '../components/core/Homepage/TimeLineSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import Footer from "../components/common/Footer";
import ReviewSlider from '../components/common/ReviewSlider'


const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <section className='group realtive w-11/12 max-w-maxContent mx-auto flex flex-col text-white justify-between items-center'>
                <Link to={"signup"}>
                    <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                            transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex justify-center items-center gap-2 rounded-full px-10 py-[5px]
                                transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become An Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='text-4xl text-center font-semibold mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online courses, you can learn at your own pace, from anywhere in the world,
                    and get access to a wealth of resources, including hands-on projects, quizzes and personalized feedback from instructors.
                </div>

                <div className='flex gap-8 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton >
                </div>

                <div className='my-14 w-[90%] mx-auto'>
                    <video muted loop autoPlay>
                        <source src={banner} type='video/mp4' />
                    </video>
                </div>

                {/* code section 1 */}
                <div className='w-[90%]'>
                    <CodeBlocks
                        postion={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={"coding potential "} />
                                with our online courses
                            </div>
                        }
                        subHeading={
                            "Our courses are designed and taught by industry expers who have years of experience in this field"
                        }
                        ctabtn1={
                            {
                                text: "Try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                text: "Learn more",
                                linkto: "/login",
                                active: true,
                            }
                        }
                        codeblock={
                            `<DOCTYP HTML>\n<html>\n<head>\n<title>Example</title>\n</head>\n<body>\n   Hello World !!!\n</body>\n</html>`
                        }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={'codeblock1'}
                    />
                </div>


                <div className='w-[90%]'>
                    <CodeBlocks
                        postion={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start Coding
                                <HighlightText text={"in seconds "} />
                            </div>
                        }
                        subHeading={
                            "Go ahead, give it a try. Our hands-on learning environment means you will be writing real code from the very first lesson"
                        }
                        ctabtn1={
                            {
                                text: "Continue Lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                text: "Learn more",
                                linkto: "/login",
                                active: true,
                            }
                        }
                        codeblock={
                            `<DOCTYP HTML>\n<html>\n<head>\n<title>Example</title>\n</head>\n<body>\n   Hello World !!!\n</body>\n</html>`
                        }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={'codeblock2'}
                    />
                </div>

                <ExploreMore />

            </section>

            {/* section 2 */}
            <section className='text-richblack-700 bg-white pb-4'>
                <div className='homepage_bg h-[310px]'>
                    <div className='w-11/12 max-w-maxContent flex justify-center items-center gap-5 mx-auto'>
                        <div className='flex gap-7 text-white mt-[150px]'>
                            <CTAButton active={true} linkto={'/signup'}>
                                <div className='flex gap-3 items-center'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='w-[80%] mx-auto max-w-maxContent flex justify-center items-center gap-5 mt-[95px]'>
                    <div className='flex gap-5 my-10'>
                        <div className='w-[45%] text-3xl font-semibold'>
                            Get the skiils you need for
                            <HighlightText text={"Job that is in demand"} />
                        </div>


                        <div className='flex flex-col gap-10 w-[48%] items-start'>
                            <div className='text-[16px]'>
                                The modern Studynotion is the dictates its own terms. Today, to be a competitive specialist requires
                                more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>

                    </div>

                </div>

                <TimeLineSection />
                    
                <LearningLanguageSection />

            </section>

            {/* section 3 */}
            <section className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between
                bg-richblack-900 text-white gap-8'>
                
                <InstructorSection />

                <h2 className='text-center text-4xl font-semibold mt-10'>Review From Other Learners</h2>
                
                {/* review slider */}
                <ReviewSlider />

            </section>

            {/* section 4 */}
            <Footer />

        </div>
    )
}

export default Home;
