const User = require('../models/User');
const mailSender = require('../utilis/mailSender');
const bcrypt = require('bcrypt');

// reset password token
exports.resetPasswordToken = async (req, res, next) => {
    try {
        // get email from req body
        const { email } = req.body;
        // check user for this email , email validation
        const existingUser = User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "No User Found with this email"
            })
        }
        // creating a token with expiration time (if user found)
        const token = crypto.randomUUID();    // gives a radom string - we will use this as token
        // update User model by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true });
        console.log(updatedDetails);
        // generate link
        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing URL
        await mailSender(email,
            "Password Reset Link"
            , `Password Reset Link: ${url}`);
        // call the next middleware
        next();
        // return response
        return res.status(200).json({
            success: true,
            message: "Email Sent SuccessFully, please check mail and change Password",
        })
    } catch (error) {
        console.log("Error while generating password generate token", error)
        return res.status(500).json({
            success: false,
            message: "Error while generating password generate token"
        })
    }
}

// reset Password
exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        // do validation
        if (password != confirmPassword) {
            return res.json({
                success: false,
                message: "The password and Confirm Password Does not match",
            })
        }
        // get user details from DB using token from USer model
        const userDetails = await User.findOne({ token: token });
        // if no entry - invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token not Found / Invalid Token"
            })
        }
        // token time check
        if (!userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired. Please re-generate your token"
            })
        }
        // hash passwowrd
        const hashedPassword = await bcrypt.hash(password, 10);
        // update password into db
        await User.findOneAndUpdate({ token: token },
            { password: hashedPassword },
            { new: true });
        // return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Successful",
        })
    } catch (error) {
        console.log("Error Occured at Reset Password Function")
        res.status(500).json({
            success:false,
            message:"Error While re-set password"
        })
    }
}

