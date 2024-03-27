const express = require("express")
require("dotenv").config()
const cors= require("cors")
const cookieparser = require("cookie-parser")
const userrouter = require("./routes/router.js")


const app = express()

app.use(cors({
    origin:"http://127.0.0.1:5500",
    credentials:true
}))

app.use(cookieparser())
app.use(express.json())

app.use("/api/auth",userrouter)


module.exports = app
