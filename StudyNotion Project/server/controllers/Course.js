const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');
const { uploadFileToCloudinary } = require('../utilis/fileUploader');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');

// create course
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const { courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            category,
            tag: _tag,
            instructions: _instructions,
            status } = req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnail;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag.length ||
            !thumbnail ||
            !category ||
            !instructions.length
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!status || status === undefined) {
            status = "Draft"
        }

        // check for instructor
        // why fetch instructor details if authorization is done already ?
        // because while creating course enrty in DB we need instructor's id
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
          })

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                messgae: "Instructor Details not found",
            })
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                messgae: "Category Details not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an Entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions,
        });

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

        // Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);

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

        const courseDetails = await Course.findById({_id:courseId})
                             .populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails",
                                    }
                                })
                                .populate("category")
                                // .populate("ratingAndReview")
                                .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                    }
                                }).exec();
        
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course not found for entered ID",
            })
        }                        

        return res.status(200).json({
            success:true,
            message:"Course Details fetched Successfully",
            data:courseDetails,
        })

    }catch(error){
        console.log("Error occured at fetching the course");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}