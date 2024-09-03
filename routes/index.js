const express =require("express");
const isloggedIn = require("../middlewares/isloggedIn");
const router = express.Router();


router.get("/",(req,res)=>{
    let success= req.flash("success");
    let error = req.flash("error");
    const findEle=(id)=>{
        let ob= document.querySelector('#id');
        console.log(ob);
    }
    res.render("index",{success,error,findEle});
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