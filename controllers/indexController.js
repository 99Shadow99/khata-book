const userModel=require("../models/user-model")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const { use } = require("../routes/indexRoute");
const hisaabModel=require("../models/hisaab-model")


module.exports.indexController=function(req,res){
    let p=req.flash("err")
  
    res.render("index",{loggin:false,err:p});
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
    req.flash("err","password is wrong ")
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
let byDate=Number(req.query.byDate)
let{startDate,endDate} =req.query

byDate=byDate?byDate:-1
startDate= startDate?startDate:new Date("1940-01-01")
endDate= endDate?endDate:new Date()


 await req.user.populate({
path:"hisaab",
match:{createdAt:{$gte:startDate, $lte:endDate}},
options: {sort: { createdAt:byDate}},
 });


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
// passcode= passcode==="on"?true:false;
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


  module.exports.verifyHisaabController= async function(req,res){
let hisaab=req.params.id
   hisaab=await hisaabModel.findOne({_id:hisaab})

let passcode =hisaab.passcode?true:false;
if(passcode) return res.render("passcode",{id:req.params.id})
res.redirect(`/profile/hisaab/view/${req.params.id}`);
 }
 
 module.exports.postVerifyHisaabController= async function(req,res){
  let hisaab= req.params.id
  hisaab=await hisaabModel.findOne({_id:hisaab})
  
 if (req.body.passcode===hisaab.passcode)return res.redirect(`/profile/hisaab/view/${req.params.id}`)
   res.redirect("/profile")
 }


module.exports.hisaabController= async function(req,res){
    try{
  let hisaab=await  hisaabModel.findOne({_id:req.params.hissab_id}) 
    res.render("hisaab",{hisaab})
    }
    catch(err){
        res.send(err)
    }

 }
 
 module.exports.deleteHisaabController= async function(req,res){
    try{
const id=req.params.hissab_id
let hisaab=await hisaabModel.findOneAndDelete({
_id:id
})

res.send(hisaab)
    }
    catch(err){
        res.send("err")
    }

 }
 module.exports.editHisaabController= async function(req,res){
    let hisaab=req.params.id

   hisaab=await hisaabModel.findOne({_id:hisaab})
res.render("edit",{hisaab})

 }
 module.exports.postEditHisaabController= async function(req,res){
    res.send("ko")
 }