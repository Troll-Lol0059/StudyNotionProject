import React from 'react'

function ChangePassword({user}) {
    return (
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

    )
}

export default ChangePassword