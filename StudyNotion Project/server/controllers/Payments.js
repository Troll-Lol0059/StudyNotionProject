const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utilis/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessEmail');
const mongoose = require('mongoose');
const crypto = require('crypto')

// capture the payment and initiate the razrorpay order
exports.capturePayment = async(req,res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({
            success:false,
            message:"Please provide a course",
        })
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(404).json({
                    success:false,
                    message:'Could not find the course'
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }

            totalAmount = totalAmount + course.price;
        }catch(error){
            console.log("Error occured while counting Payment",Error)
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }

        const options = {
            amount: totalAmount * 100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString(),
        }

        // creating order
        try{
            const paymentResponse = await instance.orders.create(options);
            return res.json({
                success:true,
                message:paymentResponse
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Could not initiate order"
            })
        }
    }
}

const enrollStudents = async(courses,userId,res) => {
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide data for courses or UserId",
        })
    }

    for(const courseId of courses){
        try{
        // find the course and enrol the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {
                $push:{studentsEnrolled:userId}
            },
            {new:true},
        )

        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"Course Not Found",
            })
        }

        // find the course and add the course to their list of enrolledCourses
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
                $push:{courses:courseId}
            },
            {new:true},
        )

        // send mail
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
        )
        // console.log("Email sent successfully",emailResponse);
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
}

// verify payment
exports.verifyPayment = async(req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId){
        res.status(200).json({
            success:false,
            message:"Payment Failed",
        })  
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
                                .update(body.toString())
                                .digest("hex");
            
        if(expectedSignature === razorpay_signature){
            // enroll student
            await enrollStudents(courses,userId,res);

            return res.status(200).json({
                success:true,
                message:"Payment Verified",
            })
    }
    return res.status(400).json({
        success:false,
        message:"Payment Failed",
    })
}

exports.sendPaymentSuccessEmail = async(req,res) => {
    const {orderId,paymentId,amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields",
        })
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            'Payment Received',
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
            amount/100,orderId,paymentId)
        )
    }catch(error){
        console.log('Error in sending mail',error);
        return res.status(500).json({
            success:false,
            message:"Could not send Email",
        })
    }
}

// exports.capturePayment = async(req,res) => {
//     try{
//         // get course ID and User ID
//         const {courseId} = req.body;
//         const userId = req.user.id;
//         // Data validation below
//         // is Course ID valid
//         if(!courseId){
//             return res.json({
//                 success:false,
//                 message:"Please Provide Valid Test ID",
//             })
//         }

//         // is Course Valid
//         try{
//             let course = await Course.findById(courseId);
//             if(!courseId){
//                 return res.json({
//                     success:false,
//                     message:"Cannot find the course",
//                 });
//             }

//             // if User has already bought course
//             // converting string userId to object ID by below method
//             const uid = new mongoose.Types.ObjectId(userId);
//             // checking if course Student Enrolled arrays has this user saved
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student is already enrolled"
//                 })
//             }

//             // order create
//             const amount = course.price;
//             const currency = "INR";

//             const options = {
//                 amount: amount*100,
//                 currency:currency,
//                 receipt: Math.random(Date.now()).toString,
//                 notes:{
//                     courseId,
//                     userId,
//                 }
//             }

//             try{
//                 // inititate the payment using razorpay
//                 const paymentResponse = await instance.orders.create(options);
//                 console.log(paymentResponse);

//                 return res.status(200).json({
//                     success:true,
//                     courseName:course.courseName,
//                     courseDescription: course.courseDescription,
//                     thumbnail:course.thumbnail,
//                     orderId:paymentResponse.id,
//                     currency:paymentResponse.currency,
//                     amount:paymentResponse.amount,
//                 })

//             }catch(error){
//                 console.log(error);
//                 return res.json({
//                     success:false,
//                     message:"Could not initiate order",
//                 })
//             }
//         }catch(error){
//             console.log("Error occured at course validation");
//             return res.status(500).json({
//                 success:false,
//                 messgae:error.message,
//             })
//         }
//     }catch(error){
//         console.log("Error occured at Payment Function");
//         return res.status(500).json({
//             success:false,
//             messgae:error.message,
//         })
//     }
// }


// // verify signature of RazorPay and Server
// exports.verifySignature = async (req,res) => {
//     try{
//         // server signature
//         const webHookSecret = "12345";
//         // razorpay returned signature on hitting webhook api
//         const signature = req.headers('x-razorpay-signature');

//         // these are rules to convert serverWebhookSecret to hashed rezorpay secret
//         const shaSum = crypto.createHmac("sha256",webHookSecret);
//         shaSum.update(JSON.stringify(req.body));
//         const digest = shaSum.digest("hex");

//         // if razorpay secret == our secret
//         if(signature === digest){
//             console.log("Payment is Authorized");

//             const {courseId,userId} = req.body.payload.entity.notes;

//             try{
//                 // fulfill the action

//                 // find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                     {_id:courseId},
//                     {
//                         $push:{
//                             studentsEnrolled:userId,
//                         }
//                     },
//                     {new:true},
//                 )

//                 if(!enrolledCourse){
//                     console.log("Error Occured the Enrolling Student");
//                     return res.status(500).json({
//                         success:false,
//                         message:"Course not found"
//                     })
//                 }
//                 console.log(enrolledCourse);
            
//             // find the student and add course to list of enrolled courses
//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id:userId},
//                 {
//                     $push:{
//                         courses:courseId,
//                     }
//                 },
//                 {new:true}
//             );
//             console.log(enrolledStudent);


//             // send mail for enrolled student confirmation
//             const emailRespones = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation from Codehelp",
//                 "Congrats ! You are enrolled into new CodeHelp Course",
//             )

//             return res.status(200).json({
//                 success:true,
//                 message:"Payment Verified Student Enrolled SuccessFully",
//             })

//             }catch(error){
//                 console.log("Error while Enrolling student");
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 })
//             }
//         }
//         else{
//             return res.status(400).json({
//                 success:false,
//                 message:"Payment Signatures do not match",
//             })
//         }

//     }catch(error){
//         console.log("Error while validating payment Signature");
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
// }

