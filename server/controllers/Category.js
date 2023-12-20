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

// category page details 
exports.categoryPageDetails = async(req,res) => {
    try{
        // get category id
        const {categoryId} = req.body;
        // get courses for specified course id
        const selectedCategory = await Category.findById(categoryId)
                                .populate("courses")
                                .exec();
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            });
        }
        // get course for different categories
        const differentCategories = await Category.find(
            {
            // aisi category ka data laake do jiski id iss category ke equal nhi hai
            _id:{ne:categoryId},
            })
            .populate("courses")
            .exec();
        // get top selling courses

        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
            message:"Additional course suggestions added"
        })

    }catch(error){
        console.log("Error occured at categoryPageDetails");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}