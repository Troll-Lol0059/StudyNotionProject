const mailSender = require("../utilis/mailSender");
const ContactUs = require('../models/ContactUs');

exports.contactUs = async(req,res) => {
    try{
        const {firstName,email,message} = req.body;
        // data validation
        if(!firstName || !email || !message){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields",
            })
        }

        const isMessaged = await ContactUs.findOne({email:email});
        console.log(isMessaged);

        if(isMessaged){
            return res.status(400).json({
                success:false,
                message:"One message is allowed only per person",
            })
        }

        await mailSender(email,"Re:Your Message to StudyNotion","Your Message has reached us successfully !!");

        const response = await ContactUs.create({
            name:firstName,
            email:email,
            message:message,
        })

        return res.status(200).json({
            success:true,
            message:"Message Sent Successfully "
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error Occured at Contact Us Controller",
        })
    }
}