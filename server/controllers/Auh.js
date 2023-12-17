const User = require('../models/User');
const OTP = require('../models/OTP');
var otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// send OTP
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from req ki body
        const { email } = req.body;

        // check if user is present
        const checkUserPresent = User.find({ email });

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
        console.log("OTP Generated Successfully");

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
            contactNumber,
            otp } = req.body;
        // validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword
            || otp || !contactNumber) {
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
        console.log(recentOtp);

        // validate input OTP and DATABASE otp
        if (recentOtp.length == 0) {
            // OTP not found in DB
            return res.status(400).json({
                success: false,
                message: "OTP not Found"
            })
        } else if (otp != recentOtp.otp) {
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
            contactNumber: contactNumber,
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
exports.login = async (res, res) => {
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
        const user = await User.findOne({ email });
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
                role: user.role,
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

// change password
exports.changePassword = async(req,res) => {
    // get data from req body
    // get old password,new password and confirm new password
    // validate data

    // update password in DB
    // send mail password has changed
    // return response
}


