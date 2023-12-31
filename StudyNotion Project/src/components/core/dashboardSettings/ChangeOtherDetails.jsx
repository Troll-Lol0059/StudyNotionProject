import React from 'react'

function ChangeOtherDetails({user}) {
    return (
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
                                <label htmlFor="html">Male</label>
                                <input type="radio" id="css" name="fav_language" value="FeMale" />
                                <label htmlFor="css">Female</label>
                                <input type="radio" id="javascript" name="fav_language" value="Other" />
                                <label htmlFor="javascript"> Other</label>
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
    )
}

export default ChangeOtherDetails