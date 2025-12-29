const express = require("express")
const fs = require('fs');
const path = require('path');
const { generateImage, generateSpeech, generateVideo, checkVideoStatus, getVideoStatus, testVideoPermission } = require("../Controller/aicontroller")
const isLoggedin = require("../Middleware/isLoggedin")


const airouter = express.Router()



airouter.post("/generateimage", isLoggedin,  generateImage)
airouter.post ("/generateSpeech", isLoggedin, generateSpeech)
airouter.post("/generatevideo", isLoggedin, generateVideo,)





module.exports = airouter


