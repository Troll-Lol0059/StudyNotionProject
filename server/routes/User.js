// import require modules
const express = require('express');
const router = express.Router();
const {signUp,login,sendOTP,changePassword} = require('../controllers/Auth');
const {auth} = require('../middlewares/auth');
const {resetPassword,resetPasswordToken} = require('../controllers/ResetPassword');


// create routes
router.post('/signUp',signUp);
router.post('/login',login);


// *****************   protected routes  ************************
// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)
// route for change password
router.post('/changePassword',auth,changePassword);



// *****************   Reset Password Routes  ************************
// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)



module.exports = router;
