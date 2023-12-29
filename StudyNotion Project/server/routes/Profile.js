const express = require('express');
const router = require('express').Router();
const {auth} = require('../middlewares/auth');
const { updateProfile } = require('../controllers/Profile');

// Routes for profile management
// for updating profile
router.put("/updateProfile", auth, updateProfile);



module.exports = router;
