const signupvalidator = (req,res,next)=>{
    const{name,email,password,bio,username}=req.body;

    if(!name||!email||!password||!bio||!username){
        res.status(404).send({
            msg:"All input fields are required"
        })
    }else{
        next()
    }
}

module.exports = signupvalidator