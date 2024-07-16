
const jwt=require("jsonwebtoken")
const userModel=require("../models/user-model.js")
module.exports.redirectProfileMiddleware=function(req,res,next){

   const token= req.cookies.token
try{

   if(token){
decode=jwt.verify(token,"ojas")
if(decode){
        res.redirect("/profile")

}
else{
    next()
}

   }
   else{
    next()
   }
}
catch(err){
    next()
}
    

}





module.exports.isloggedInMiddleware= async function(req,res,next){

   const token= req.cookies.token
try{


   if(token){
var decode=jwt.verify(token,"ojas")
if(decode){
   const user= await userModel.findOne({
       email:decode.email
      })
req.user=user;
   
   
    next()

}
else{
    res.redirect("/")
}

   }
   else{
    res.redirect("/")
   }
}
catch(err){
    res.redirect("/")
}
    

}