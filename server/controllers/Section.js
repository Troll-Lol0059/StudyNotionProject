const Section = require('../models/Section');
const Course = require('../models/Course');
require("dotenv").config();

exports.createSection = async(req,res) => {
    try{
        // data fetch
        const {sectionName,courseId} = req.body;
        // validate data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        // create section
        const newSection = Section.create({sectionName});
        // update the section object in course
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        ).populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            data:updatedCourseDetails,
        })
    }catch(error){
        console.log("Error occured at Create SeCTION");
        return res.status(500).json({
            success:true,
            message:"Unable to create Section",
            error:error.message,
        })
    }
}

// update a section
exports.updateSection = async(req,res) =>{
    try{
        // data input
        const {sectionName,sectionId} = req.body;
        // validate data
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        // update data
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName
            },
            {new:true}
        );
        // return response
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully"
        });
    }catch(error){
        console.log("Error Occured at creating section");
        res.status(500).json({
            success:false,
            message:"Unable to create section",
            error:error.message,
        })
    }
}

// delete a section
exports.deleteSection = async(req,res) => {
    try{
        // get section ID - assuming we are sending ID in params
        const {sectionId} = req.params;
        // find by ID and Delete
        await Section.findByIdAndDelete(sectionId);
        // TODO: Do we need to delete the section schema in course ?
        // return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted SuccessFully",
        })
    }catch(error){
        console.log("Error Occured at deleting section");
        res.status(500).json({
            success:false,
            message:"Unable to delete section",
            error:error.message,
        })
    }
}