const JWT = require("jsonwebtoken")

const authenticateuser = async(req,res,next)=>{
    const token = (req.cookies && req.cookies.token) || null;
    if(!token){
        return res.status(400).json({
            msg:"Authentication failed",
            token:req.cookies
        })
    }
    try {
        const payload  = JWT.verify(token,process.env.SECRET)
        // console.log(payload);
        req.user = {id:payload.id,username:payload.username}
        
    } catch (error) {
        return res.status(404).json({
            success:"false",
            message:error.message
        })
    }
    next();
}

module.exports = authenticateuser