const RatingAndReview = require('../models/RatingAndReviews');
const Course = require('../models/Course');

// create a rating
exports.createRatingAndReview = async(req,res) => {
    try{
        // get user ID
        const userId = req.user.id;
        // fetch data from req.body
        const {rating,review,courseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
          })

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        // check if user has already given rating review
        const alreadyReviewed = await RatingAndReview.findOne(
                            {
                                user:userId,
                                course:courseId
                        },
        )

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course Already reviewed by user"
            })
        }
        // create a new rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId,
        });
        // attach the rating and review to course
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    ratingsAndReviews:ratingReview._id,
                }
            },
            {new:true}
        );

        console.log(updatedCourseDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
        })
    }catch(error){
        console.log("Error Occured at Rating creation",error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}

// get average rating
exports.getAverageRating = async(req,res) => {
    try{
        // get course ID
        const courseId = req.body.courseId;
        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                // aisi entry find out karke do jiski course id iske equal jo
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    // sabko group kardo (by id:null)
                    _id:null,
                    // rating ka average nikal lo
                    averageRating: {$avg:"$rating"},
                }
            }
        ])
        // return response if average rating is found
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        // if not ratings exists
        return res.status(200).json({
            success:true,
            message:"Average rating is 0 as no ratings are entered",
            averageRating:0,
        })
    }catch(error){
        console.log("Error occured at finding rating");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get all rating & reviews
exports.getAllRating = async(req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
        // jo v rating aayega usko descending order me sort kar dena
                            .sort({rating:"desc"})
                            .populate(
                                {
                                    path:"user",
                                    // user ke andar ka ye sab details laake dena
                                    select:"firstName lastName email image",
                                })
                                .populate(
                                    {
                                        path:"course",
                                        select:"courseName",
                                    })
                                    .exec();
        
        return res.status(200).json({
            success:true,
            message:"All ratings fetched successfully",
            data:allReviews,
        })
    }catch(error){
        console.log("Error occured at Fetching All ratings",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get rating and review of one course