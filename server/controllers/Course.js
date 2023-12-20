const Course = require('../models/Course');
const User = require('../models/User');
const Tag = require('../models/Tags');
const { uploadFileToCloudinary } = require('../utilis/fileUploader');

// create course
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        if (!courseName || courseDescription || !whatYouWillLearn || !price || !tag) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check for instructor
        // why fetch instructor details if authorization is done already ?
        // because while creating course enrty in DB we need instructor's id
        const userId = req.user.id;
        const instructorDetails = await User.findById({ userId });
        console.log("Instructor Details", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                messgae: "Instructor Details not found",
            })
        }

        // check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                messgae: "Tag Details not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an Entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true },
        );

        // update the TAG in Tag schema
        const updatedTag = Tag.create({
            tag,
            description,
            course: newCourse._id,
        })

        // return response
        return res.status(200).json({
            success: true,
            message: "Course Created Succesfully",
            data: newCourse,
        })
    } catch (error) {
        console.log("Error while creating course");
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// fetch all courses
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingsAndReviews: true,
            studentsEnrolled: true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            messgae:"Data for all courses fetched successfully",
            data:allCourses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot Fetch Course Data",
            error: error.message,
        })
    }
}

// get One course
exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course ID not found",
            })
        }

        const courseDetails = await Course.findById({courseId})
                             .populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails",
                                    }
                                })
                                .populate("category")
                                .populate("ratingAndReview")
                                .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                    }
                                }).exec();
        
        return res.status(200).json({
            success:true,
            message:"Course Details fetched Successfully",
        })

    }catch(error){
        console.log("Error occured at fetching the course");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}