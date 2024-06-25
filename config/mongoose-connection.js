const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/khatabook").then(function(){
    console.log("db connected")
}).catch(function(){
    console.log("err")
})

let db=mongoose.connection;
module.exports =db;
