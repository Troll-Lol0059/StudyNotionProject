import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';


function VideoDetailsSidebar( {setReviewModal} ) {
    const [activeStatus,setActiveStatus] = useState("");
    const [videoBarActive,setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const {sectionId,subSectionId} = useParams();
    const location = useLocation();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector( (state) => state.viewCourse );

    useEffect( ()=>{
        ;( ()=>{
            if(!courseSectionData.length){
                return;
            }
            // gets selected section index
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            );
            // gets selected sub section index
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.
                                        subSection.findIndex( (data) => data._id === subSectionId )
            // gets the sub section id of current visible video
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.
                                    [currentSubSectionIndex]?._id;
            // set current section here
            setActiveStatus(courseSectionData?.[currentSubSectionIndex]?._id);
            // set current subsection here
            setVideoBarActive(activeSubSectionId)                       
        } ) ()
    }, [courseSectionData,courseEntireData,location.pathname] )

  return (
    <div>
        <div>
            {/* for buttons and headings */}
            <div>
                {/* for buttons */}
                <div>
                    <div onClick={navigate("/dashboard/enrolled-courses")}>
                        Back
                    </div>

                    <div>
                        <IconBtn
                        text={"Add Review"}
                        onClick={setReviewModal(true)}
                        />
                    </div>
                </div>
            </div>

            {/* for heading and title */}
            <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures.length} / {totalNoOfLectures}</p>
            </div>

            {/* for sections and sub sections */}
            {
                courseSectionData?.map( (section,index)=> (
                    <div onClick={ () => setActiveStatus(section?._id) } key={index}>
                        {/* section 1 */}
                        <div>
                            <div>
                                {section?.sectionName}
                            </div>
                            {/* add arrow icon and rotate */}
                        </div>

                        {/* subSections */}
                        <div>
                            {
                                activeStatus === section?._id && (
                                    section.subSection.map( (topic,index)=> (
                                        <div key={index}
                                            className={`flex ${videoBarActive === topic._id ? 
                                                "bg-yellow-200 text-richblack-900" : 
                                                "bg-richblack-900 text-richblack-5" }`} 
                                                onClick={ () => {
                                                    navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${topic._id}`)
                                                    setVideoBarActive(topic?._id);
                                                } }
                                            >
                                            <input type='checkbox' 
                                            checked={completedLectures.includes(topic?._id)}
                                            onChange={ ()=> {} }
                                            />

                                            <span>{topic.title}</span>
                                        </div>
                                    ) )
                                )
                            }
                        </div>
                    </div>
                 ) )
            }
        </div>
    </div>
  )
}

export default VideoDetailsSidebar