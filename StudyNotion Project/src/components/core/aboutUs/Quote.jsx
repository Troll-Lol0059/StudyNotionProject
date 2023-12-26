import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import HighlightText from '../Homepage/HighlightText';

function Quote() {
    return (
        <div className='relative lg:w-11/12 mx-auto flex flex-col items-center justify-center'>

            <div className='lg:w-[80%] text-3xl font-inter font-[500] text-center lg:flex text-richblack-100'>

                <span className='relative'>We are passionate about revolutionizing the way we learn.
                    Our innovative platform
                    <HighlightText text={"combines technology"} />,
                    <span className='text-[#E65C00]'>expertise</span>,
                    and community to create an
                    <span className='text-[#F9D423]'> unparalleled educational experience.</span>

                    <span className='lg:absolute -top-1 -left-5'><FaQuoteLeft /></span>
                    <span className='lg:absolute'><FaQuoteRight /></span>
                </span>

            </div>

        </div>
    )
}

export default Quote