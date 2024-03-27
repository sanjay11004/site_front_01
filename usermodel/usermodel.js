const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    bio:{
        type:String,
        required:true
    }
})

userschema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }

    this.password= await bcrypt.hash(this.password,10)  // returns a promis so awiat is used to resolve a promis before jumping into next line
    return next()
})

userschema.methods={
    jwttoken(){
        return JWT.sign({
            id:this._id,username:this.username,
        },
        process.env.SECRET,
        {
            expiresIn:"24d"
        } 
        )
    }
}

const userModel = mongoose.model("user",userschema);
module.exports= userModel;