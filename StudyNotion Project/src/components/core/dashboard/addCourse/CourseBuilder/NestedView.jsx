import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import {AiOutlinePlus} from 'react-icons/ai';
import SubSectionModal from './SubSectionModal';



function NestedView({ handleChangeEditSectionName }) {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async(sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId:course._id,
            token,
        })

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async(subSectionId,sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token,
        })
        
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

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
                                    <button type='button'
                                        onClick={handleChangeEditSectionName(section._id, section.sectionName)}>
                                        <MdEdit />
                                    </button>

                                    <button
                                        type='button'
                                        onClick={() => setConfirmationModal({
                                            text1: "Delete this Section ?",
                                            text2: "All the lectures in this section will be deleted.",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })}>
                                        <MdDelete />
                                    </button>

                                    <span>|</span>

                                    <button>
                                        <FaCaretDown />
                                    </button>
                                </div>

                            </summary>

                            <div>
                                {
                                    section.subSection.map((data) => (
                                        <div key={data?._id}
                                            onClick={() => setViewSubSection(data)}
                                            className='flex items-center justify-between gap-x-3 border-b-2'>

                                            <div className='flex items-center justify-between text-richblack-50 text-base gap-2 py-2'>
                                                <div className='text-[24px]'><RxDropdownMenu /></div>
                                                <div className='text-richblack-50 text-base'>{data.title}</div>
                                            </div>

                                            <div className='flex items-center gap-x-3'>
                                                <button type='button'
                                                    onClick={setEditSubSection({ ...data, sectionId: section._id })}>
                                                    <MdEdit />
                                                </button>

                                                <button
                                                    type='button'
                                                    onClick={() => setConfirmationModal({
                                                        text1: "Delete this Sub-Section ?",
                                                        text2: "Selected Lecture will be deleted.",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                                                        btn2Handler: () => setConfirmationModal(null),
                                                    })}>
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button onClick={setAddSubSection(section._id)}
                                    className='mt-4 flex items-center gap-x-2 text-yellow-50'
                                >
                                    <AiOutlinePlus />
                                    <p>Add Lecture</p>
                                </button>
                            </div>

                        </details>
                    ))
                }
            </div>

            { 
            addSubSection ? <SubSectionModal
                                modalData={addSubSection}
                                setModalData={setAddSubSection}
                                add={true}
                            /> : 
            viewSubSection ? <SubSectionModal 
                                setModalData={viewSubSection}
                                view={true}
                                /> : 
            editSubSection ? <SubSectionModal  
                                modalData={editSubSection}
                                setModalData={setEditSubSection}
                                edit={true}
                              /> :
                ( <div></div> )
            }

            {   
                confirmationModal ?
                <confirmationModal modalData={confirmationModal} /> :
                <div> </div>
            }

        </div>
    )
}

export default NestedView;