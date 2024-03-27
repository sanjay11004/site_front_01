const mongoose= require("mongoose")
require("dotenv").config()

const mongo_url = process.env.MONGO_URL

const connecttodb = ()=>{
    mongoose.connect(mongo_url)
    .then((conn)=>{
        console.log(`Connected to ${conn.connection.host}`)
    })
    .catch((error)=>{
        console.log(error.message);
    })
}

module.exports = connecttodb