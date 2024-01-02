const Profile = require('../models/Profile');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const {uploadFileToCloudinary} = require('../utilis/fileUploader');
const bcrypt = require('bcrypt');
const mailSender = require('../utilis/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');


exports.updateProfile = async(req,res) => {
    try{
        // get data
        const {dateOfBirth,about="",contactNumber,gender} = req.body;
        // get userID (as generated during signup auth middleware)
        const id = req.user.id;
        // validate data
        if(!contactNumber || !gender || !dateOfBirth|| !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        // find profile (as it is already created during signup)
        const userDetail = await User.findById(id);
        const profileId = userDetail.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        })
    }catch(error){
        console.log("Error Occured at Update profile");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// delete Account function
// TODO: explore -> how can we schedule this delete operation
// TODO: unroll this student from all enrolled courses
exports.deleteAccount = async(req,res) => {
    try{
        // get userId
        const id = req.user.id;
        // check if ID is valid
        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            })
        }
        // delete user profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
        // delete user
        await User.findByIdAndDelete({_id:id});
        // return response
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        })
    }catch(error){
        console.log("Error While Deleting Account");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllUsers = async(req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"User Data Fetched Successfully",
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// function to check if file format is supported
function isFileTypeSupported(type,supportedType){
        return supportedType.includes(type);
}


exports.uploadProfilePic = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadFileToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }


  exports.changePassword = async(req,res) => {
    try{
        // fetch data from req body
        const {oldPassword,newPassword} = req.body;
        const id = req.user.id;
        
        // data validation
        if(!newPassword || !oldPassword){
            return res.status(404).json({
                success:false,
                message:"Please Enter all the fields !",
            })
        }
  
        const userDetails = await User.findById(id);
        console.log(userDetails);
        // check if entered password and db password matches
        const isPasswordMatch = bcrypt.compare(oldPassword, userDetails.password);
        // console.log(oldPassword," ",userDetails.password);
        // console.log(isPasswordMatch);
        if(!isPasswordMatch) {
            return res.status(400).json({
                success:false,
                message:"Old password entered is wrong",
            })
        }

        // check if new password entered already exists in DB
        if(await bcrypt.compare(newPassword,userDetails.password)){
            return res.status(400).json({
                success:false,
                message:"The New Password entered is already in use, choose some other password",
            })
        }
        // hash the new entered password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedDetails = await User.findByIdAndUpdate({_id:id},
                                                            {password:hashedPassword},
                                                            {new:true}
                                                            );
        console.log(updatedDetails);
        
        // send notification mail
        try{
            await mailSender(userDetails.email,
                "Password Changed Successfully",
                passwordUpdated(
                    userDetails.email,
                    `${userDetails.firstName} ${userDetails.lastName}`
                ));

        }catch(error){
            console.log("Error occured while sending password change mail");
            return res.status(400).json({
                success:false,
                message:error.message,
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Password has been changed successfully !",
        })

    }catch(error){
        console.log("Error at change password function");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
