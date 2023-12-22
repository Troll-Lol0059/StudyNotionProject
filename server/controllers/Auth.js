const User = require('../models/User');
const OTP = require('../models/OTP');
var otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require("../utilis/mailSender");
const Profile = require('../models/Profile');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// send OTP
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from req ki body
        const {email} = req.body;

        // check if user is present
        const checkUserPresent = await User.findOne({email});
        // console.log('eMAIL rESPONSE: ',checkUserPresent);

        // if user exists then return response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User Already Exists"
            });
        }

        // if user is not present generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        // console.log("OTP Generated Successfully");

        // check unique OTP or not
        let result = await OTP.findOne({ otp: otp });

        // jabtak unique otp naa mile tabtak generate karo
        while (result) {
            otp = otpGenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        // create a email object
        const otpPayload = { email, otp };

        // create a entry in DB for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return successful response
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
        })
    }
    catch (error) {
        console.log(error);
        console.log("Error occured while generating OTP");
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// SIGNUP
exports.signUp = async (req, res) => {
    try {
        // fetch data from req ki body
        const { firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp } = req.body;
        // validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword
            || !otp || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        // check password and confirm password equal
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password Value does not match",
            })
        }
        // check if user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }
        // find most recent OTP stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        // validate input OTP and DATABASE otp
        if (recentOtp.length == 0) {
            // OTP not found in DB
            return res.status(400).json({
                success: false,
                message: "OTP not Found"
            })
        } else if (otp !== recentOtp[0].otp) {
            // invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a entry into DB and return response 
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })

        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered Successfully",
        })
    } catch (error) {
        console.log("Error occured at signup process", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered",
        })
    }
}

// LOGIN
exports.login = async (req, res) => {
    try {
        // get data from req body
        const { email, password } = req.body;
        // validate data
        if (!email || !password) {
            return res.json(403).json({
                success: false,
                message: "All fields are required.",
            });
        }
        // check if user exists or not
        let user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered.Please Sign Up first",
            })
        }
        // match password & generate JWT token
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In SuccessFully"
            })
        }else{
            // if password is wrong
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect",
            })
        }
    } catch (error) {
        console.log("Error Occured while logging In",error);
        return res.status(500).json({
            success:false,
            message:"Login Failure. Please try again"
        })
    }
}

// todo - need a logout func
exports.changePassword = async(req,res) => {
    try{
        // fetch data from req body
        const {oldPassword,newPassword,confirmNewPassword,token} = req.body;
        
        // data validation
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match",
            })
        }
        
        if(!newPassword || !confirmNewPassword){
            return res.status(404).json({
                success:false,
                message:"Please Enter all the fields !",
            })
        }
  
        const userDetails = await User.findOne({token: req.token});
        console.log(userDetails);

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

        const updatedDetails = await User.findByIdAndUpdate({_id:userDetails.id},
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
