const userModel=require("../models/user-model")
const bcrypt=require("bcrypt")


module.exports.indexController=function(req,res){
    res.render("index");
}

module.exports.registerController=function(req,res){
    res.render("register");
}
module.exports.postRegisterController= async function(req,res){
const {email,name,username,password}=req.body

const user =await userModel.findOne({email})
if(user){
res.send("you have account")
}
else{
 const salt= await bcrypt.genSalt(10)
const hashed= await bcrypt.hash(password, salt);

 await userModel.create({
        email,
        name,
        username,
        password:hashed,
    })
    res.send("accounte created")
} 



}


