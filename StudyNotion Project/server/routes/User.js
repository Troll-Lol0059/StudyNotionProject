// import require modules
const express = require('express');
const router = express.Router();
const {signUp,login,sendOTP} = require('../controllers/Auth');
const {auth} = require('../middlewares/auth');
const {resetPassword,resetPasswordToken} = require('../controllers/ResetPassword');
const { contactUs } = require('../controllers/ContactUs');



// create routes
router.post('/contact-us',contactUs);
router.post('/signUp',signUp);
router.post('/login',login);
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);
router.post('/contact-us',contactUs);

// *****************   protected routes  ************************
// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)



// *****************   Reset Password Routes  ************************
// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)



module.exports = router;
