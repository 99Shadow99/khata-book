const userModel=require("../models/user-model")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const { use } = require("../routes/indexRoute");
const hisaabModel=require("../models/hisaab-model")


module.exports.indexController=function(req,res){
    res.render("index",{loggin:false});
}

module.exports.postIndexController= async function(req,res){

try{
    const {email,password}=req.body
let user=await userModel.findOne({email}).select("+password")

if(user){
   const decode = await bcrypt.compare(password,user.password)
if(decode){
    let token=jwt.sign({user:user._id,email:user.email},"ojas")
    res.cookie("token",token)
    res.redirect("/profile")
}
else{
    res.redirect("/")
}

}
else{
    res.send("/register")
}
    
}
catch(err){
res.send("err")
}

}


module.exports.registerController=function(req,res){
    res.render("register");
}

module.exports.postRegisterController= async function(req,res){
const {email,name,username,password}=req.body

try{
var user =await userModel.findOne({email})
if(user){
res.send("you have account")
}
else{
 const salt= await bcrypt.genSalt(10)
const hashed= await bcrypt.hash(password, salt);

 user=await userModel.create({
        email,
        name,
        username,
        password:hashed,
    })
  const token=  jwt.sign({id:user._id ,email:user.email},"ojas")
  res.cookie("token",token);
  
    res.redirect("/")
} 
}
catch(err){
    res.send(err.message);
}



}

module.exports.profileController=async function(req,res){
   const p= await req.user.populate("hisaab");

    res.render("profile",{user:req.user});
}

module.exports.createController=function(req,res){
    res.render("create");
}

module.exports.postCreateController=async function(req,res){
let {title,description,encrypted,passcode,shareable,editPerimission}=req.body

try{
encrypted= encrypted==="on"?true:false;
shareable= shareable==="on"?true:false;
editPerimission= editPerimission==="on"?true:false;
passcode= passcode==="on"?true:false;
let hisaab =await hisaabModel.create({
    user:req.user._id,
    title,
    description,
    encrypted,
    passcode,
    shareable,
    editPerimission
   })
const user= await userModel.findOne({ _id:req.user._id,})
await user.hisaab.push(hisaab._id)
user.save();
res.redirect("/profile")
}
catch(err){
    res.send(err)
}
}