const mongoose = require('mongoose');

const courseProgress = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    completedVideo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

module.exports = mongoose.model("CourseProgress",courseProgress);
