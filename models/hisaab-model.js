const mongoose=require("mongoose")
const user = require("../../project-3-login/mongo-files/user")



const hisaabSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minLength:3,
        mixLength:100,
        require:true,
    },
   description:{
        type:String,
        trim:true,
      
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    encrypted:{
        type:Boolean,
        default:false,
      
    },
    shareable:{
        type:Boolean,
        default:false,
    },
    passcode:{type:String,
        default:"",
    },
    editPerimission:{type:Boolean,
        default:"",
    },
},

{timestamps:true}

)

 module.exports=mongoose.model("hisaab",hisaabSchema)























