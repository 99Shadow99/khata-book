const express = require("express");
const router = express.Router();


const {isloggedInMiddleware}=require("../middlewares/auth-middleware")
const {profileController,

} = require("../controllers/indexController");



router.get("/",isloggedInMiddleware,profileController)
module.exports=router;