const express =require("express");
const isloggedIn = require("../middlewares/isloggedIn");
const router = express.Router();


router.get("/",(req,res)=>{
    let success= req.flash("success");
    let error = req.flash("error");
    res.render("index",{success,error});
})

router.get("/learnMore",(req,res)=>{
    res.render("learnMore");
})



router.get("/login",(req,res)=>{
    let success= req.flash("success");
    let error = req.flash("error");
    res.render("login",{success,error});
})

module.exports= router;