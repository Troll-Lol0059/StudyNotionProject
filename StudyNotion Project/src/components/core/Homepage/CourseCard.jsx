import React from 'react';
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

function CourseCard({ cardData, currentCard, setCurrentCard }) {

    return (
        <div className={`flex flex-col w-[26%] font-inter px-6 gap-6 justify-center
         cursor-pointer rounded-md
        ${cardData.heading === currentCard ? "bg-white text-richblack-500 shadow-[12px_12px_0_0] shadow-yellow-50": "bg-richblack-800 text-richblack-25" }`
        } onClick={ ()=> {setCurrentCard(cardData.heading)} }>

            <div className={`text-[20px] font-bold pt-8 ${cardData.heading === currentCard ? "text-richblack-800":"text-richblack-25"}`}>
                {cardData.heading}
            </div>

            <div className='text-[1rem]'>
                {cardData.description}
            </div>

            <div className={`flex justify-between ${
            currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
            } px-6 py-3 font-medium mt-12 text-[1.15rem] font-inter gap-4 border-t-[1px] border-dashed`}>
                <div className='text-[16px] flex gap-2'>
                    <HiUsers/>
                    {cardData.level} 
                </div>

                <div className='text-[16px] flex gap-2'>
                    <ImTree/>
                    {cardData.lessionNumber} Lessons
                </div>
            </div>
        </div>
    )
}

export default CourseCard;