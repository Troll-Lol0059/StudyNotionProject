import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";
import React from 'react';
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({postion,heading,subHeading,ctabtn1,
    ctabtn2,codeblock,backgroundGradient,codeColor}) {
  return (
    <div className={`w-[100%] flex ${postion} my-20 justify-between gap-10`}>
        {/* code section 1 */}
        <div className="w-[50%] flex flex-col gap-8">
            {heading}
            <div className="text-richblack-300 font-bold">
                {subHeading}
            </div>
            <div className="flex gap-7 mt-7">
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className="flex gap-2 items-center">
                        {ctabtn1.text}
                        <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.text}
                </CTAButton>
            </div>
        </div>

        {/* code section 2 */}
        <div className="relative w-[50%] h-fit flex py-4">
            <div className={`absolute ${backgroundGradient}`}></div>

            <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`code-border w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                sequence={[codeblock,5000,""]} 
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}
                 />
            </div>
        </div>

    </div>
  )
}

export default CodeBlocks;