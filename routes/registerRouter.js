const express=require("express")
const router=express.Router();
const {registerController,postRegisterController} = require("../controllers/indexController")
router.get("/",registerController)

router.get("/",registerController)
router.post("/",postRegisterController)

module.exports=router