const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const upload = require("../config/multer-config");
const isloggedIn = require("../middlewares/isloggedIn");
const {registerUser, loginUsers,logOut} = require("../controllers/authController");
const productModel= require("../models/product-model");

router.get("/",isloggedIn,(req,res)=>{
    res.send("hello hi");
})

router.get("/cart",isloggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("cart");
    let success = req.flash("success");

    let totalSum=0;
    user.cart.forEach((product)=>{
        totalSum+=product.discount;
    })

    res.render("cart",{user,totalSum,success});

})

router.get("/wishlist",isloggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("wishlist");
    let success = req.flash("success");
    let totalSum=0;
    user.cart.forEach((product)=>{
        totalSum+=product.discount;
    })

    res.render("wishlist",{user,totalSum,success});

})

router.get("/cart/remove/:id",isloggedIn, async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    user.cart.splice(user.cart.indexOf(req.params.id),1);
    await user.save();
    req.flash("success","item removed successfully");
    res.redirect("/users/cart");
})

router.get("/wishlist/remove/:id",isloggedIn, async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    user.wishlist.splice(user.wishlist.indexOf(req.params.id),1);
    await user.save();
    req.flash("success","item removed successfully");
    res.redirect("/users/wishlist");
})

router.get("/profile",isloggedIn,async (req,res)=>{
    let success= req.flash("success")
    let user = await userModel.findOne({email:req.user.email}).populate("products");
    res.render("profile",{user,success});
})

router.get("/profile/update",isloggedIn,(req,res)=>{
    res.render("updateProfile");
})

router.post("/profile/update",isloggedIn,upload.single("image"), async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    user.image=req.file.buffer;
    await user.save();
    res.redirect("/users/profile")
})

router.get("/product",isloggedIn, async(req,res)=>{
    let user= await userModel.findOne({email:req.user.email}).populate("products");
    res.render("yourProduct",{user});
})

router.post("/product/delete/:id",isloggedIn,async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    
    user.products.splice(user.products.indexOf(req.params.id),1);
    await user.save();
    await productModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/users/product");
})

router.post("/register",registerUser);

router.post("/login", loginUsers);
router.get("/logout", logOut);

module.exports = router;