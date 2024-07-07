const express = require("express");
const router = express.Router();


const {isloggedInMiddleware}=require("../middlewares/auth-middleware")
const {createController,
    postCreateController, } = require("../controllers/indexController");



router.get("/",isloggedInMiddleware,createController)

router.post("/",isloggedInMiddleware,postCreateController)

module.exports=router;