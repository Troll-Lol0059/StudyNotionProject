import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconBtn from "../components/common/IconBtn";
import { useForm } from "react-hook-form";


const ProfileSettings = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);

    const handlePicChange = async() => {
        console.log("Data !!!");
    }

    return (
        <form className="lg:w-full p-6">
            <div className="text-base text-richblack-300">
                <div className="flex gap-1 items-center cursor-pointer my-2" onClick={() => { navigate("/dashboard/my-profile") }} >
                    <IoIosArrowBack />
                    <span>Back</span>
                </div>
                <div className="text-richblack-5 text-3xl font-[500]">
                    Edit Profile
                </div>
                <div className="lg:w-[70%] flex flex-col gap-4 item-center px-8">
                    {/* change profile pic div */}
                    <div className="bg-richblack-800 text-richblack-700 flex p-4 gap-6 rounded-md mt-6">
                        <div>
                            <img src={user?.image}
                                alt={`profile-${user?.firstName}`}
                                className='aspect-square rounded-full object-cover w-[78px] h-[78px]'
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="text-richblack-25 font-[500] text-base">Change Profile Picture</div>
                            <div className="lg:flex">
                                {/* change and remove buttons */}
                                <input type="file" className="block w-full text-sm text-white
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-yellow-50 file:text-richblack-900 cursor-pointer
                                            "/> 

                                <IconBtn text={"Remove"} customClasses={"bg-richblack-700 border border-richblack-600 rounded-md py-1 px-4 text-richblack-50 text-base font-[500]"} />
                            </div>
                        </div>

                    </div>

                    {/* change name & other details div */}
                    <div className="bg-richblack-800 text-richblack-700 p-4 gap-2 rounded-md flex flex-col">
                        <div className="text-[18px] font-[600] text-richblack-5">Profile Information</div>

                        {/* name & profession div */}
                        <div className="flex lg:w-[100%] gap-12">
                            {/* name div */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Display Name
                                </div>
                                <input type="text" className="input" value={user?.firstName + " " + user?.lastName} disabled />
                                <span className="text-[12px] text-richblack-5">Name entered above will be used for all certificates</span>
                            </div>
                            {/* profession div */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Profession
                                </div>
                                <input type="text" className="input" value={user?.accountType} disabled />
                            </div>
                        </div>

                        {/* date of birth div */}
                        <div className="flex lg:w-[100%] gap-12">
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Date Of Birth
                                </div>

                                {
                                    user?.additionalDetails.dateOfBirth ?
                                        <input type="text" className="input" value={user?.additionalDetails?.dateOfBirth} disabled />
                                        :
                                        <input type="date" className="input" />
                                }
                            </div>
                            {/* Gender */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]" >
                                    Gender
                                </div>
                                {
                                    user?.additionalDetails?.gender ?
                                        <input type="text" className="input" value={user?.additionalDetails?.gender} disabled /> 
                                        :
                                        <div className="text-richblack-5 text-base">
                                            <input type="radio" id="html" name="fav_language" value="Male" className="radio" />
                                            <label for="html">Male</label>
                                            <input type="radio" id="css" name="fav_language" value="FeMale" />
                                            <label for="css">Female</label>
                                            <input type="radio" id="javascript" name="fav_language" value="Other" />
                                            <label for="javascript"> Other</label>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="flex lg:w-[100%] gap-12">
                            {/* phone number div */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Phone Number
                                </div>
                                <input type="text" className="input" />
                            </div>
                            {/* Gender */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    About
                                </div>
                                <input type="text" className="input" />
                            </div>
                        </div>

                    </div>

                    {/*Password and change password div */}
                    <div className="bg-richblack-800 text-richblack-700 p-4 gap-2 rounded-md flex flex-col">
                        <div className="text-richblack-5 text-[18px] font-[600] mb-2">
                            Password
                        </div>


                        <div className="flex gap-12">
                            {/* current password */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Current Password
                                </div>
                                <input type="text" className="input" />
                            </div>

                            {/* change password */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    New Password
                                </div>
                                <input type="text" className="input" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </form>
    )
}

export default ProfileSettings