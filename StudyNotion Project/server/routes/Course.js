// import require modules
const express = require('express');
const router = express.Router();
const {auth, isInstructor,isAdmin} = require('../middlewares/auth');
const {createCourse,showAllCourses,getCourseDetails} = require('../controllers/Course');
const {createSection, updateSection,deleteSection} = require('../controllers/Section');
const {createSubSection,updateSubSection,deleteSubSection} = require('../controllers/SubSection');
const {createCategory,showAllCategories,categoryPageDetails} = require('../controllers/Category');


// routes for instructor
// ***** rourtes related to course actions *****
router.post('/createCourse',auth,isInstructor,createCourse);

// ***** rourtes related to course section *****
router.post('/createSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
router.post('/deleteSection',auth,isInstructor,deleteSection);

// ***** rourtes related to course sub - section *****
router.post('/createSubSection',auth,isInstructor,createSubSection);
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
router.post('/deleteSubSection',auth,isInstructor,deleteSubSection);



// routes for admin
router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/showAllCategories',showAllCategories);
router.get('/showAllCourses',auth,isAdmin,showAllCourses);
router.get('/getCourse',auth,isAdmin,getCourseDetails);







module.exports = router;