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


router.post("/register",registerUser);

router.post("/login", loginUsers);
router.get("/logout", logOut);

module.exports = router;