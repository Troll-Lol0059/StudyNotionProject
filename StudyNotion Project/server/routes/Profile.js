const express = require('express');
const router = require('express').Router();
const {auth} = require('../middlewares/auth');
const { updateProfile,uploadProfilePic,changePassword,getEnrolledCourses } = require('../controllers/Profile');


// Routes for profile management
// for updating profile
router.put("/updateProfile", auth, updateProfile);
router.put("/updateProfilePic", auth, uploadProfilePic);
router.put("/changepassword", auth, changePassword);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);



module.exports = router;
