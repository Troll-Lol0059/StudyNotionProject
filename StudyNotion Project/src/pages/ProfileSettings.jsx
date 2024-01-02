import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconBtn from "../components/common/IconBtn";
import { useForm } from "react-hook-form";
import ChangeProfilePic from "../components/core/dashboardSettings/ChangeProfilePic";
import ChangeOtherDetails from "../components/core/dashboardSettings/ChangeOtherDetails";
import ChangePassword from "../components/core/dashboardSettings/ChangePassword";
import DeleteAccount from "../components/core/dashboardSettings/DeleteAccount";

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
        <div className="lg:w-full p-6">
            <div className="text-base text-richblack-300">
                <div className="flex gap-1 items-center cursor-pointer my-2" onClick={() => { navigate("/dashboard/my-profile") }} >
                    <IoIosArrowBack />
                    <span>Back</span>
                </div>
                <div className="text-richblack-5 text-3xl font-[500]">
                    Edit Profile
                </div>
                <div className="lg:w-[70%] flex flex-col gap-4 item-center px-8">
                    {/* component for changing profile pic */}
                    <ChangeProfilePic user={user} />

                    {/* change name & other details div */}
                    <ChangeOtherDetails user={user} />

                    {/*Password and change password div */}
                    <ChangePassword user={user} />

                    {/* delete account */}
                    <DeleteAccount />

                </div>
            </div>
        </div>
    )
}

export default ProfileSettings