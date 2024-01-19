import React, { useState } from 'react'
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { LiaTvSolid } from "react-icons/lia";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';


function CourseAccordion({ courseContent }) {

    return (
        <Accordion allowZeroExpanded={true} className='space-y-2 mb-6'>
            {courseContent?.map((item, index) => (
                <AccordionItem key={index} >
                    <AccordionItemHeading className='bg-richblack-300 rounded-md' >
                        <AccordionItemButton className='flex gap-2 text-richblack-5 text-[14px] py-3 px-4
                        items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='text-richblack-50 font-[500]'>
                                    <FaAngleDown />
                                </div>

                                <div className='text-richblack-50 font-[500]'>
                                    {item.sectionName}
                                </div>
                            </div>

                            <div className='text-richblack-50 font-[500]'>
                                Total Lectures: {courseContent?.length}
                            </div>

                        </AccordionItemButton>
                    </AccordionItemHeading>

                    {
                        item?.subSection?.map((section, index) => (
                            <AccordionItemPanel key={index} >
                                <Accordion allowZeroExpanded={true}>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='flex items-center justify-between px-6 py-2'>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='text-richblack-50 font-[500]'>
                                                        <LiaTvSolid />
                                                    </div>

                                                    <div className='text-richblack-50 font-[500]'>
                                                        {section.title}
                                                    </div>

                                                    <div className='text-richblack-50 font-[500]'>
                                                        <FaAngleDown />
                                                    </div>
                                                </div>

                                                <div className='text-richblack-50 font-[500]'>
                                                    {parseInt(section.timeDuration).toFixed(0)} Hours
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <div className='flex items-center justify-between px-10 py-1'>
                                                {section.description}
                                            </div>
                                        </AccordionItemPanel>

                                    </AccordionItem>
                                </Accordion>
                            </AccordionItemPanel>
                        ))
                    }

                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default CourseAccordion;
