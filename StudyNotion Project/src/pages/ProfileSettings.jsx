import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconBtn from "../components/common/IconBtn";


const ProfileSettings = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);

    return (
        <div className="lg:w-full p-6">
            <div className="text-base text-richblack-300">
                <div className="flex gap-1 items-center cursor-pointer my-2" onClick={() => { navigate("/dashboard/my-profile") }} >
                    <IoIosArrowBack />
                    <span>Back</span>
                </div>
                <div className="text-richblack-5 text-3xl font-[500]">
                    Edit Profile
                </div>
                <div className="lg:w-[70%] flex flex-col gap-2 item-center px-8">
                    {/* change profile pic div */}
                    <div className="bg-richblack-800 text-richblack-700 flex p-4 gap-6 rounded-md mt-6">
                        <div>
                            <img src={user?.image}
                                alt={`profile-${user?.firstName}`}
                                className='aspect-square w-[78px] rounded-full object-cover w-[78px] h-[78px]'
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-richblack-25 font-[500] text-base">Change Profile Picture</div>
                            <div className="flex gap-4">
                                {/* <div className="bg-yellow-50 rounded-md py-1 px-4 text-richblack-900 text-base font-[500]">Change</div> */}
                                <IconBtn text={"Change"} customClasses={"bg-yellow-50 rounded-md py-1 px-4 text-richblack-900 text-base font-[500]"} />
                                <IconBtn text={"Remove"} customClasses={"bg-richblack-700 border border-richblack-600 rounded-md py-1 px-4 text-richblack-50 text-base font-[500]"} />
                            </div>
                        </div>
                    </div>

                    {/* change name & other details div */}
                    <div className="bg-richblack-800 text-richblack-700 flex p-4 gap-2 rounded-md flex flex-col">
                        <div className="text-[18px] font-[600] text-richblack-5">Profile Information</div>

                        <div className="flex lg:w-[100%] gap-12">
                            {/* name div */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Display Name
                                </div>
                                <input type="text" className="input" />
                                <span className="text-[12px] text-richblack-5">Name entered above will be used for all certificates</span>
                            </div>
                            {/* profession div */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Profession
                                </div>
                                <input type="text" className="input" />
                            </div>
                        </div>

                        <div className="flex lg:w-[100%] gap-12">
                            {/* date of birth div */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Date Of Birth
                                </div>
                                <input type="date" className="input" />
                            </div>
                            {/* Gender */}
                            <div className="flex flex-col gap-1 lg:w-[45%]">
                                <div className="text-richblack-5 text-[14px] font-[400]">
                                    Gender 
                                </div>
                                <input type="text" className="input" />
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
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings