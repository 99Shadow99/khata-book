const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        minLength:3,
        mixLength:20,
        require:true,
    },
   name:{
        type:String,
        trim:true,
      
        require:true,
    },
    email:{
        type:String,
        trim:true,
        require:true,
    },
    profilePicture:{
        type:String,
        trim:true,
        minLength:3,
        mixLength:20,
        require:true,
    },
    password:{
        type:String,
        trim:true,
        require:true,
        select:false,
    },
    hisaab:[
        { type:mongoose.Schema.Types.ObjectId,ref:"hisaab"}
    ],


})

 module.exports=mongoose.model("user",userSchema)























