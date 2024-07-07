const express = require("express");
const router = express.Router();

const {
    indexController,
    postIndexController,
    registerController} = require("../controllers/indexController");

const {redirectProfileMiddleware}=require("../middlewares/auth-middleware")


router.get("/",redirectProfileMiddleware,indexController)
router.post("/",postIndexController)

module.exports=router;