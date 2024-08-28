const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const isloggedIn = require("../middlewares/isloggedIn");
const userModel = require("../models/user-model");

router.get("/create",isloggedIn,(req,res)=>{
    res.render("createProduct");
})

router.post("/create",isloggedIn,upload.single("image"), async (req,res)=>{
    try{
        let user = await userModel.findOne({email:req.user.email});
        let {productname,price,discount,description}=req.body;
        let product = await productModel.create({
            image:req.file.buffer,
            productname,
            price,
            discount,
            description,
            owner:user._id,
        })
    
        user.products.push(product._id);
        await user.save();
    
        res.redirect("/");
    }
    catch(err){
        console.log(err.message);
    }

})

router.get("/",isloggedIn, async (req,res)=>{
    let products= await productModel.find();
    let user = await userModel.findOne({email:req.user.email});
    res.render("shop",{products,user});
})

router.post("/cart/:id",isloggedIn, async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    let product = await productModel.findOne({_id:req.params.id});

    if(user.products.indexOf(product._id)==-1){
        if(user.cart.indexOf(product._id)==-1){
            user.cart.push(product._id);
            await user.save();
            res.redirect("/products");
        }
        else{
            res.send("already added");
        }
       
    }
    else{
        res.send("this is your product");
    }
})

router.get("/wishlist/:id",isloggedIn, async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    let product = await productModel.findOne({_id:req.params.id});

    if(user.products.indexOf(product._id)==-1){

        if(user.wishlist.indexOf(product._id)==-1){
            user.wishlist.push(product._id);
            
        }
        else{
            user.wishlist.splice(user.wishlist.indexOf(product._id),1);
        }

        await user.save();
        res.redirect("/products");
    }
    else{
        res.send("this is your product");
    }
})

router.get("/details/:id",isloggedIn, async (req,res)=>{
    let product = await productModel.findOne({_id:req.params.id});
    res.render("productDetails",{product});
})

module.exports = router;