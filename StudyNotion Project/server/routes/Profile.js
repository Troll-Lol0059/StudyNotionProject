const express = require('express');
const router = require('express').Router();
const {auth,isInstructor} = require('../middlewares/auth');
const { updateProfile,uploadProfilePic,changePassword,getEnrolledCourses,instructorDashboard } = require('../controllers/Profile');


// Routes for profile management
// for updating profile
router.put("/updateProfile", auth, updateProfile);
router.put("/updateProfilePic", auth, uploadProfilePic);
router.put("/changepassword", auth, changePassword);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)



module.exports = router;
