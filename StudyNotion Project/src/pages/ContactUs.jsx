import React from "react";
import { TiMessages } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import { PiPhoneCallDuotone } from "react-icons/pi";
import { IconContext } from "react-icons";
import ContactUsForm from "../components/core/aboutUs/ContactUsForm";
import Footer from "../components/common/Footer";


const data = [
    {
        heading: "Chat on us",
        desc1: "Our friendly team is here to help.",
        desc2: "@mail address"
    },
    {
        heading: "Visit Us",
        desc1: "Come and say hello at our office HQ.",
        desc2: "Here is the location/ address"
    },
    {
        heading: "Call us",
        desc1: "Mon - Fri From 8am to 5pm",
        desc2: "+123 456 7890"
    },
]

const icons = [
    TiMessages,
    BiWorld,
    PiPhoneCallDuotone,
];

const ContactUs = () => {
    return (
        <div className="flex flex-col w-[100%]">
            <div className="lg:w-11/12 mx-auto text-richblack-200 lg:flex lg:flex-row justify-evenly items-start text-base font-inter py-20
                        gap-1">
                <div className="lg:w-[30%] bg-richblack-800 rounded-md flex flex-col gap-10 p-4">
                    {
                        data.map((element, index) => {
                            const Icon = icons[index];
                            return (<div key={index} className="flex gap-4">
                                <div>
                                    <IconContext.Provider value={{ size: '20px' }}>
                                        <Icon />
                                    </IconContext.Provider>
                                </div>

                                <div>
                                    <div className="text-[18px] font-semibold text-richblack-5">
                                        {element.heading}
                                    </div>
                                    <div className="">
                                        {element.desc1}
                                    </div>
                                    <div className="">
                                        {element.desc2}
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>

                <div className="w-[42%] border border-richblack-600 p-6 rounded-md flex flex-col gap-2">
                    <div className="text-3xl text-richblack-5 font-semibold">
                        Got a Idea? We’ve got the skills. Let’s team up
                    </div>

                    <div className="text-base mb-2">
                        Tall us more about yourself and what you’re got in mind.
                    </div>
                    <ContactUsForm />
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default ContactUs;