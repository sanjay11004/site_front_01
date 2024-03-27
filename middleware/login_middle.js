const loginvalidator = (req,res,next)=>{
    const{username,password}= req.body;
    if(!username||!password){
        res.status(404).send({msg:"All fields are required"})
    }
    else{
        next()
    }
}
module.exports = loginvalidator