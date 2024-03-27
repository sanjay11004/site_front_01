const express = require("express")
const { userSignup, userLogin, getUserDetails } = require("../controllers/usercontroler")
const signupvalidator = require("../middleware/signup_middle.js")
const loginvalidator = require("../middleware/login_middle")
const  authenticateuser  = require("../middleware/Authenticate_middle")


const userrouter = express.Router()

userrouter.post("/signup",signupvalidator,userSignup)
userrouter.post("/login",loginvalidator,userLogin)
userrouter.get("/userdata",authenticateuser,getUserDetails)

module.exports = userrouter