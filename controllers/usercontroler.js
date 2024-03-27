const userModel = require("../usermodel/usermodel")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")
const express =  require("express")

const userSignup = async(req,res)=>{
    try {
        const userinfo = new userModel(req.body)
        const resultt =  await userinfo.save()
        // return res.status(200).send({
        //     message:"signUp success" ,
        //     data:result
        // })
        const{username,password}= req.body;
        const getuserData = await userModel.findOne({username}).select("+password");
        if(getuserData && getuserData.username ){
            const result = await bcrypt.compare(password,getuserData.password)
            if(result){
                const token = await getuserData.jwttoken()
                const cookieOption = {
                    maxAge:24*60*60*1000,
                    httpOnly:true,
                    sameSite: 'None',
                    secure:true
                }
                res.cookie("token",token,cookieOption)
                return res.status(200).json({
                    success:true,
                    data:getuserData
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const userLogin = async(req,res)=>{
    try {
        const{username,password}= req.body;
        const getuserData = await userModel.findOne({username}).select("+password");
        if(getuserData && getuserData.username ){
            const result = await bcrypt.compare(password,getuserData.password)
            if(result){
                const token = await getuserData.jwttoken()
                const cookieOption = {
                    maxAge:10000,
                    httpOnly:true,
                    sameSite: 'None',
                    secure:true
                }
                res.cookie("token",token,cookieOption)
                return res.status(200).json({
                    success:true,
                    data:getuserData
                })
            }
            else{
                res.status(404).send({msg:"Incorrect password"})
            }
        }else{
            res.status(404).send({msg:"No account found..!"})
        }
    } catch (error) {
        return res.status(501).send({
            msg:error.message
        })
    }
}

const getUserDetails = async(req,res)=>{
    const userid=req.user.id;
    try {
        // res.setHeader("Cache-Control", "no-store");
        const user= await userModel.findById(userid);
        res.status(200).send({
            success:true,
            data:user
        });
    } catch (error) {
        res.status(501).send({
            msg:error.message
        });
    }
};

module.exports = {userSignup,userLogin,getUserDetails}