const Category = require('../models/Category');

// CREATE A COURSE TAG
exports.createCategory = async(req,res) => {
    try{
        // fetch data
        const {name,description} = req.body;
        // data validation
        if(!name){
            return res.status(401).json({
                success:false,
                message:"Please fill all fields",
            })
        }
        // create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        // return response
        return res.status(200).json({
            success:false,
            message:"Category created Successfully",
        })

    }catch(error){
        console.log("Error occured at Create Category Controller");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// GET ALL TAGS
exports.showAllCategories = async(req,res) => {
    try{
        const allCategories = await Category.find({},{name:true,
                                description:true});
        res.status(200).json({
            success:true,
            message:"All Categories returned SuccessFully",
            data:allCategories,
        })
    }catch(error){
        console.log("Error Occured while Fetching Categories");
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}
