import React from 'react'
import IconBtn from "../../common/IconBtn";
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../utils/dateFormatter';
import { updateProfile } from '../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

function ChangeOtherDetails({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector( (state) => state.auth );

    // converts -> 10 Jan 2001 to "2001-01-10"
    const date = formatDate(user?.additionalDetails?.dateOfBirth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitProfileForm = async(data) => {
        console.log(data);
        try{
            const response = dispatch(updateProfile(token,data));

        }catch(error){
            console.log("Error Occured while updating data",error);
        }
    }

    return (
        <form className="bg-richblack-800 text-richblack-700 p-4 gap-2 rounded-md lg:flex flex-col lg:w-full w-fit"
            onSubmit={handleSubmit(submitProfileForm)} >
            <div className="text-[18px] font-[600] text-richblack-5">Profile Information</div>

            {/* name & profession div */}
            <div className="lg:flex lg:w-[100%] gap-12">
                {/* name div */}
                <div className="flex flex-col gap-1 lg:w-[45%]">
                    <div className="text-richblack-5 text-[14px] font-[400]">
                        Display Name
                    </div>
                    <input type="text" name='firstName' className="form-style"
                        value={user?.firstName + " " + user?.lastName}
                        readOnly
                        // {...register('firstName', { required: true })}
                    // defaultValue={user?.firstName + " " + user?.lastName}
                    />
                    <span className="text-[12px] text-richblack-5">Name entered above will be used for all certificates</span>
                </div>
                {/* profession div */}
                <div className="flex flex-col gap-1 lg:w-[45%]">
                    <div className="text-richblack-5 text-[14px] font-[400]">
                        Profession
                    </div>
                    <input type="text" className="form-style" name="accoutType" value={user?.accountType}
                        readOnly
                        // {...register('accountType', { required: true })} 
                    />
                </div>
            </div>

            {/* date of birth div */}
            <div className="flex lg:w-[100%] gap-12">
                <div className="flex flex-col gap-1 lg:w-[45%]">
                    <div className="text-richblack-5 text-[14px] font-[400]">
                        Date Of Birth
                    </div>

                    <input type="date" name='dateOfBirth' className="form-style"
                        {...register("dateOfBirth", {
                            required: {
                                value: true,
                                message: "Please enter your Date of Birth.",
                            },
                            max: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Date of Birth cannot be in the future.",
                            },
                        })}
                        defaultValue={date}
                    />
                    {errors.dateOfBirth && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.dateOfBirth.message}
                        </span>
                    )}

                </div>
                {/* Gender */}
                <div className="flex flex-col gap-1 lg:w-[45%]">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="gender" className="text-richblack-5 text-[14px] font-[400]">
                            Gender
                        </label>
                        <select
                            type="text"
                            name="gender"
                            id="gender"
                            className="form-style"
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                        >
                            {genders.map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                )
                            })}
                        </select>
                        {errors.gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Select Your Gender.
                            </span>
                        )}
                    </div>

                </div>
            </div>

            <div className="lg:flex lg:w-[100%] gap-12">
                {/* phone number div */}
                <div className="flex flex-col gap-1 lg:w-[45%]">
                    <div className="text-richblack-5 text-[14px] font-[400]">
                        Phone Number
                    </div>
                    <input type="text" className="form-style" name='contactNumber'
                        {...register("contactNumber", {
                            required: {
                                value: true,
                                message: "Please enter your Contact Number.",
                            },
                            maxLength: { value: 12, message: "Invalid Contact Number" },
                            minLength: { value: 10, message: "Invalid Contact Number" },
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                    />
                    {errors.contactNumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.contactNumber.message}
                        </span>
                    )}
                </div>
                {/* About */}
                <div className="flex flex-col gap-1 lg:w-[45%]">
                    <div className="text-richblack-5 text-[14px] font-[400]">
                        About
                    </div>
                    <input
                        type="text"
                        name="about"
                        id="about"
                        placeholder="Enter Bio Details"
                        className="form-style"
                        {...register("about", { required: true })}
                        defaultValue={user?.additionalDetails?.about}
                    />
                    {errors.about && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your About.
                        </span>
                    )}
                </div>
            </div>

            <div className='flex gap-4 justify-end mt-2 mr-6'>
                <IconBtn text={"Cancel"} customClasses={"text-richblack-100 text-base px-4 py-1 rounded-md border border-richblack-500"}
                 type={'button'} onclick={ () => navigate(-1) } />

                <IconBtn type={'submit'} customClasses={"bg-yellow-50 text-richblack-900 text-base px-4 py-1 rounded-md"}
                    text={"Save"} />
            </div>

        </form>
    )
}

export default ChangeOtherDetails;
