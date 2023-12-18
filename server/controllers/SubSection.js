const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
require("dotenv").config();

// create SubSection
exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req body
        const { sectionId, title, timeDuration, description } = req.body;
        // extract video from file
        const { video } = req.files.videoFile;
        // do validation
        if (!sectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: true,
                message: "All fields are required",
            })
        }
        // upload video to cloudinary and get secure url
        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        // create sub-section
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        // insert sub-section object id to section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id,
                }
            },
            { new: true }
        ).populate("subSection").exec();
        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Created Successfully",
            updatedSection,
        })
    } catch (error) {
        console.log("Error occured while creating sub section");
        return res.json({
            success: true,
            message: "Cannot create Sub Section",
            error: error.message,
        })
    }
}

// Update Sub - Section
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, timeDuration, description } = req.body;
        const subSection = await SubSection.findById(subSectionId);
        
        if (!subSectionId) {
            return res.status(404).json({
                success: false,
                message: "SubSection Not Found",
            })
        }

        if(title !== undefined){
            subSection.title = title;
        }
        if(description !== undefined){
            subSection.description = description;
        }

        if(req.files && req.files.video !== undefined){
            const video = req.files.video;
            const uploadDetails = await uploadFileToCloudinary(
                video,
                process.env.FOLDER_NAME,
            )
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate("subSection")
  
        return res.status(200).json({
            success: true,
            message: "Sub Section Updated Successfully",
            updatedSection,
        })
    } catch (error) {
        console.log("Error occured while updating sub section");
        return res.status(500).json({
            success:false,
            message:"Cannot update section"
        })
    }
}

// Delete Sub - Section
exports.deleteSubSection = async(req,res) => {
    try{
        const {sectionId,subSectionId} = req.body;

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message:"Sub Section Deleted Successfully",
        })
    }catch(error){
        console.log("Error Occured at Deleting Sub-section");
        return res.status(500).json({
            success:false,
            message:"Cannot delete Sub Section"
        })
    }
}