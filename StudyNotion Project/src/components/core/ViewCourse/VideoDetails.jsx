import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from "video-react";
import {AiFillPlayCircle} from 'react-icons/ai';
import IconBtn from '../../common/IconBtn'
<link rel="stylesheet" href="/css/video-react.css" />

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (!courseSectionData.length) {
                return;
            }
            if (!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            }
            else {
                const filteredData = courseSectionData.filter(
                    (course) => course._id === sectionId
                )

                const filteredVideoData = filteredData?.[0].subsection.filter(
                    (data) => data._id === subSectionId
                )

                setVideoData(filteredVideoData[0]);
                setVideoEnded(false)
            }

        }
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        // get current section and sub - section
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const subSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
            (data) => data._id === subSectionId
        )

        // if you are in first video of 1st section
        if (currentSectionIndex === 0 && currentSectionIndex === 0) {
            // first video
            return true;
        }
        else {
            return false;
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        // get number of subsection
        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
            (data) => data._id === subSectionId
        )

        // current section is last section and current video is last video of last section
        if (currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSections - 1) {
            return true;
        } else {
            return false;
        }


    }

    const goToNextVideo = () => {
        // get current section and sub section
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
            (data) => data._id === subSectionId
        )

        // GO TO NEXT VIDEO OF SAME SECTION
        if (currentSubSectionIndex !== noOfSubSections - 1) {
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1];
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        } else {
            // diffrent section ki first video pe jaao
            const nextSectionId = courseSectionData[currentSectionIndex + 1];
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    }

    const goToPreVideo = () => {
        // get current section and sub section
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSubSectionIndex !== 0){
            // samesection previous video
            const previousSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex - 1]
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`)
        }else{
            // different section last video
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subsection.length;
            const previousSubSectionId = courseSectionData[currentSectionIndex - 1].subsection[prevSubSectionLength-1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${previousSubSectionId}`)
        }
    }

    const handleLectureCompletion = async() => {
        setLoading(true);
        const res = await markLectureAsComplete( {courseId: courseId , subSectionId:subSectionId },token)
        
        if(res){
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);
    }


    return (
        <div>
            {
                !videoData ? (
                    <div>
                        No Data Found !!
                    </div>
                ) :
                (
                  <Player ref={playerRef} 
                  aspectRatio="16:9 "
                  playsInline
                  onEnded = {() => setVideoEnded(true)}
                  src={videoData?.videoUrl}
                  >
                    <AiFillPlayCircle />

                    {
                        videoEnded && (
                            <div>
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconBtn
                                            disabled={loading}
                                            onClick={() => handleLectureCompletion()}
                                            text={!loading ? "Mark As Completed" :"Loading..."}
                                        />
                                    )
                                }

                                <IconBtn
                                disabled={loading}
                                onClick={ () => {
                                    if(playerRef?.current){
                                        playerRef.current?.seek(0);
                                        setVideoEnded(false);
                                    }
                                } }
                                text="Rewatch"
                                />

                                <div>
                                    {!isFirstVideo() && (
                                        <button
                                        disabled={loading}
                                        onClick={goToPreVideo}      
                                        >
                                            Previous
                                        </button>
                                    )}

                                    {!isLastVideo() && (
                                        <button
                                        disabled={loading}
                                        onClick={goToNextVideo} 
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    }
                  </Player>
                )
            }
            <h1>
                {videoData?.title}
            </h1>

            <p>
                {videoData?.description}
            </p>

        </div>
    )
}

export default VideoDetails;