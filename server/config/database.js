const mongoose = require('mongoose');
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        userNewUrlParser:true,
        useUnifiedTopology:true,
    })
.then( ()=> {
    console.log("Database Connection Successful")
} )
.catch( (error)=> {
    console.log("Cannot connect to Database");
    console.error(error);
    process.exit(1);
})
}