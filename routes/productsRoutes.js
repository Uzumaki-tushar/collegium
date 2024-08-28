const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/create",(req,res)=>{
    res.send("hi hello its working");
})

module.exports = router;