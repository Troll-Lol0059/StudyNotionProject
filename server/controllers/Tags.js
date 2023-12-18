const Tag = require('../models/Tags');

// CREATE A COURSE TAG
exports.createTag = async(req,res) => {
    try{
        // fetch data
        const {name,description} = req.body;
        // data validation
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"Please fill all fields",
            })
        }
        // create entry in db
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);

        // return response
        return res.status(200).json({
            success:false,
            message:"Tag created Successfully",
        })

    }catch(error){
        console.log("Error occured at Create Tag Controller");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// GET ALL TAGS
exports.showAllTags = async(req,res) => {
    try{
        const allTags = await Tag.find({},{name:true,
                                description:true});
        res.status(200).json({
            success:true,
            message:"All Tags returned SuccessFully",
            allTags,
        })
    }catch(error){
        console.log("Error Occured while Fetching Tags");
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}