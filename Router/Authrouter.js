const express = require("express")

const {signup, login, logout, forgetPassword, resetPassword} = require("../Controller/authController")
const isLoggedin = require("../Middleware/isLoggedin")

const auth = express.Router()

auth.post("/signup", signup)
auth.post("/login", login)
auth.post("/logout", isLoggedin, logout)
auth.post("/forgetpassword", forgetPassword)
auth.post("/resetPassword", resetPassword)

module.exports = auth