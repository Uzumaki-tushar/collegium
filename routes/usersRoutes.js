const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const isloggedIn = require("../middlewares/isloggedIn");
const {registerUser, loginUsers,logOut} = require("../controllers/authController");

router.get("/",isloggedIn,(req,res)=>{
    res.send("hello hi");
})

router.get("/cart",isloggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("cart");

    let totalSum=0;
    user.cart.forEach((product)=>{
        totalSum+=product.discount;
    })

    res.render("cart",{user,totalSum});

})

router.get("/cart/remove/:id",isloggedIn, async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    user.cart.splice(user.cart.indexOf(req.params.id),1);
    await user.save();
    res.redirect("/users/cart");
})


router.post("/register",registerUser);

router.post("/login", loginUsers);
router.get("/logout", logOut);

module.exports = router;