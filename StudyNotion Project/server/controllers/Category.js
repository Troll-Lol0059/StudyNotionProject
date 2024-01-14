const Category = require('../models/Category');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// CREATE A COURSE category
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
            success:true,
            message:"Category created Successfully",
            data:categoryDetails,
        })

    }catch(error){
        console.log("Error occured at Create Category Controller");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// GET ALL Categories
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
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate:{
        path:'instructor',
      }
    })
    .exec()

    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec()
    console.log()
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate:{
          path:'instructor',
        }
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

  