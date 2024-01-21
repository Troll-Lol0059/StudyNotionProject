import React from "react";
import CTAButton from "../Homepage/CTAButton";
import HighlightText from "../Homepage/HighlightText";


const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highliteText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningSection = () => {
    return (
        <div className="relative mx-auto w-[80%] lg:mt-20 mt-4">
            <div className='relative grid mx-auto grid-cols-1 xl:grid-cols-4 lg:mb-12 mb:4'>
                {
                    LearningGridArray.map((element, index) => (
                        <div key={index} className={`p-8 ${index == 0 && ("xl:col-span-2 xl:h-[294px]")}
                        ${element.order % 2 === 1 ? "lg:h-[294px] bg-richblack-700" : "lg:h-[294px] transparent"}
                        ${element.order === 3 && "xl:col-start-2"}`}>
                            {
                                element.order < 0 ? (
                                    <div className="flex flex-col items-start">
                                        <div className="richblack-5 text-3xl semibold lg:mb-2">{element.heading}</div>
                                        <div className="text-3xl semibold lg:mb-4">
                                            <HighlightText text={"Anytime, AnyWhere"} />
                                        </div>
                                        <div className="text-base text-richblack-300 lg:mb-9">
                                            {element.description}
                                        </div>

                                        <CTAButton active={true} linkto={"/login"}>
                                            Learn More
                                        </CTAButton>
                                    </div>)
                                    :
                                    (<div className="flex flex-col gap-8">
                                        <div className="lg:h-[50px] text-[18px] text-richblack-5 font-[600]">
                                            {element.heading}
                                        </div>

                                        <div className="text-[14px] font-[400] text-richblack-100">
                                            {element.description}
                                        </div>
                                    </div>)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LearningSection;