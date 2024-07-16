const express = require("express");
const router = express.Router();


const {isloggedInMiddleware}=require("../middlewares/auth-middleware")
const {profileController,
    hisaabController,
    verifyHisaabController,
    postVerifyHisaabController,
    deleteHisaabController,
    editHisaabController,
    postEditHisaabController,
 
} = require("../controllers/indexController");


router.get("/",isloggedInMiddleware,profileController)

router.get("/hisaab/verify/:id",verifyHisaabController)
router.post("/hisaab/verify/:id",postVerifyHisaabController)
router.get("/hisaab/view/:hissab_id",isloggedInMiddleware,hisaabController)

router.get("/hisaab/delete/:hissab_id",isloggedInMiddleware,deleteHisaabController)

router.get("/hisaab/edit/:id",isloggedInMiddleware,editHisaabController)
router.post("/hisaab/edit/:id",isloggedInMiddleware,postEditHisaabController)



module.exports=router;