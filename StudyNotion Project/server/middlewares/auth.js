const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/User');

// auth -> veryfying jeson web tokens
exports.auth = async(req,res,next) => {
    try{
        // extract token
        const token = req.cookies.token ||
                    req.body.token ||
                    req.header("Authorization").replace("Bearer ",""); 
                    
        // if token is missing then return
        if(!token){
            return res.status(401).json({
                success:false,    
                message:"Token is missing"
            })
        }
        // else verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log(decode);
            req.user = decode;
        }catch(err){
            // verification issue
            console.log("Issue in token verification",err);
            return res.status(401).json({
                success:false,
                message:"Token is Invalid",
            })
        }
        // go to next middleware
        next();
    }catch(error){
       return res.status(401).json({
        success:false,
        message:"Token Not Found.."
       }) 
    }
}



// is Student -> verify if the role is student or not
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.role !== "Student"){
            res.status(401).json({
                success:false,
                message:"This is a protected routes for Students Only"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role cannot be verified"
        })
    }
}

// is Instructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.role !== "Instructor"){
            res.status(401).json({
                success:false,
                message:"This is a protected routes for Instructors Only"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role cannot be verified"
        })
    }
}

// is Admin
// is Instructor
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.role !== "Admin"){
            res.status(401).json({
                success:false,
                message:"This is a protected routes for Admin's Only"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role cannot be verified"
        })
    }
}