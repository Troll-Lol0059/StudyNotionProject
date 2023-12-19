const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utilis/mailSender');
const {courseEnrollmentEmai} = require('../mail/templates/courseEnrollmentEmail');
const mongoose = require('mongoose');

// capture the payment and initiate the razrorpay order
exports.capturePayment = async(req,res) => {
    try{
        // get course ID and User ID
        const {courseId} = req.body;
        const userId = req.user.id;
        // Data validation below
        // is Course ID valid
        if(!courseId){
            return res.json({
                success:false,
                message:"Please Provide Valid Test ID",
            })
        }

        // is Course Valid
        try{
            let course = await Course.findById(courseId);
            if(!courseId){
                return res.json({
                    success:false,
                    message:"Cannot find the course",
                });
            }

            // if User has already bought course
            // converting string userId to object ID by below method
            const uid = new mongoose.Types.ObjectId(userId);
            // checking if course Student Enrolled arrays has this user saved
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }

            // order create
            const amount = course.price;
            const currency = "INR";

            const options = {
                amount: amount*100,
                currency:currency,
                receipt: Math.random(Date.now()).toString,
                notes:{
                    courseId,
                    userId,
                }
            }

            try{
                // inititate the payment using razorpay
                const paymentResponse = await instance.orders.create(options);
                console.log(paymentResponse);

                return res.status(200).json({
                    success:true,
                    courseName:course.courseName,
                    courseDescription: course.courseDescription,
                    thumbnail:course.thumbnail,
                    orderId:paymentResponse.id,
                    currency:paymentResponse.currency,
                    amount:paymentResponse.amount,
                })

            }catch(error){
                console.log(error);
                return res.json({
                    success:false,
                    message:"Could not initiate order",
                })
            }
        }catch(error){
            console.log("Error occured at course validation");
            return res.status(500).json({
                success:false,
                messgae:error.message,
            })
        }
    }catch(error){
        console.log("Error occured at Payment Function");
        return res.status(500).json({
            success:false,
            messgae:error.message,
        })
    }
}


// verify signature of RazorPay and Server
exports.verifySignature = async (req,res) => {
    try{
        // server signature
        const webHookSecret = "12345";
        // razorpay returned signature on hitting webhook api
        const signature = req.headers('x-razorpay-signature');

        // these are rules to convert serverWebhookSecret to hashed rezorpay secret
        const shaSum = crypto.createHmac("sha256",webHookSecret);
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest("hex");

        // if razorpay secret == our secret
        if(signature === digest){
            console.log("Payment is Authorized");

            const {courseId,userId} = req.body.payload.entity.notes;

            try{
                // fulfill the action

                // find the course and enroll the student in it
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id:courseId},
                    {
                        $push:{
                            studentsEnrolled:userId,
                        }
                    },
                    {new:true},
                )

                if(!enrolledCourse){
                    console.log("Error Occured the Enrolling Student");
                    return res.status(500).json({
                        success:false,
                        message:"Course not found"
                    })
                }
                console.log(enrolledCourse);
            
            // find the student and add course to list of enrolled courses
            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {
                    $push:{
                        courses:courseId,
                    }
                },
                {new:true}
            );
            console.log(enrolledStudent);


            // send mail for enrolled student confirmation
            const emailRespones = await mailSender(
                enrolledStudent.email,
                "Congratulation from Codehelp",
                "Congrats ! You are enrolled into new CodeHelp Course",
            )

            return res.status(200).json({
                success:true,
                message:"Payment Verified Student Enrolled SuccessFully",
            })

            }catch(error){
                console.log("Error while Enrolling student");
                return res.status(500).json({
                    success:false,
                    message:error.message,
                })
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Payment Signatures do not match",
            })
        }

    }catch(error){
        console.log("Error while validating payment Signature");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

