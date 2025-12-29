const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
    email: {

        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // minLength: 6 ,
        select : false
    },
    gender: {
        type: String,
        enum: ["male", "female"] 
    },

         image: {
        type: String
    },

    age: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken:{
       type :String
    }, 

 

   
  

   resetPasswordToken:String,
  
    resetPasswordExpires : Date
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel