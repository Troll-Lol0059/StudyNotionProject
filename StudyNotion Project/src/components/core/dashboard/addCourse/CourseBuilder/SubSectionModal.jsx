import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const SubSectionModal = ({ modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue
    } = useForm();

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.desc);
            setValue("lectureView", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {

            return true;
        } else {
            return false;
        }
    }

    const handleEditSubSection = () => {

    }

    const onSubmit = async () => {
        if (view) {
            return;
        }
        if (edit) {
            if (!isFormUpdated) {
                toast.error("No Changes made to the form");
            } else {
                // edit 
                handleEditSubSection();
            }
            return;
        }

        // creating a sub - section
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureVideo);
        setLoading(true);

        const result = await createSubSection(formData, token);

        if (result) {
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

    return (
        <div>
            <div>
                <p>{view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture</p>
                <button onClick={() => { !loading ? setModalData(null) : {} }}>
                    <RxCross1 />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload
                    name="lectureView"
                    register="Lecture Video"
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={view ? modalData.videoUrl : null}
                />

                <div>
                    <label>Lecture Title</label>
                    <input
                        id="lectureTitle"
                        placeholder="Enter Lecture Title"
                        {...register("lectureTitle", { required: true })}
                        className='w-full'
                    />

                    {errors.lectureTitle && (<span>Lecture Title is required</span>)}
                </div>

                <div>
                    <label>Lecture Description</label>
                    <textarea
                        id="lectureDesc"
                        placeholder="Enter Lecture Description"
                        {...register("lectureDesc", { required: true })}
                        className="w-full min-h-[130px]"
                    />

                    {errors.lectureDesc && (<span>Lecture Description is required</span>)}
                </div>

            </form>
        </div>
    )
}

export default SubSectionModal;