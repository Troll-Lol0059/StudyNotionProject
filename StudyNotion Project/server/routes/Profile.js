const express = require('express');
const router = require('express').Router();
const {auth} = require('../middlewares/auth');
const { updateProfile,uploadProfilePic } = require('../controllers/Profile');

// Routes for profile management
// for updating profile
router.put("/updateProfile", auth, updateProfile);
router.put("/updateProfilePic", auth, uploadProfilePic);



module.exports = router;
