import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx';
import { MdEdit,MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";


function NestedView({ handleChangeEditSectionName }) {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [addViewSection, setViewSubSection] = useState(null);
    const [addEditSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <div>
            <div className='rounded-lg bg-richblack-700 px-8 py-3'>
                {
                    course.courseContent?.map((section) => (
                        <details key={section._id} open>
                            <summary className='flex items-center justify-between border-b border-richblack-600'>
                                <div className='flex items-center justify-between text-richblack-50 text-base gap-2 py-2'>
                                    <div className='text-[24px]'><RxDropdownMenu /></div>
                                    <div className='text-richblack-50 text-base'>{section.sectionName}</div>
                                </div>

                                <div className='flex items-center justify-between text-richblack-50 text-base gap-3 py-2'>
                                    <button 
                                    onClick={handleChangeEditSectionName}>
                                        <MdEdit />
                                    </button>
                                    <button><MdDelete /></button>
                                    <button><FaCaretDown /></button>
                                </div>

                                Add Lecture
                            </summary>
                        </details>
                    ))
                }
            </div>
        </div>
    )
}

export default NestedView;