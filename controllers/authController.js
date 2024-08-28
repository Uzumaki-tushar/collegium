const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const {generateToken}= require("../utils/generateToken.js");


module.exports.registerUser= async function(req,res){
    try{
        let{username,email,password}=req.body;

        let user = await userModel.findOne({email});
        if(user) return res.status(401).send("you already have an account, please login.");

        bcrypt.hash(password, 10, async function(err, hash) {
            // Store hash in your password DB.
            let user= await userModel.create({
                username,
                email,
                password:hash
            })
    
            let token = generateToken(user);
            console.log(token);
            res.cookie("token",token),
            res.send(user);
        });
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.loginUsers= async function(req,res){
    try{
        let {email,password}= req.body;
        let user= await userModel.findOne({email});
        if(!user) return res.status(401).send("something went wrong");

        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(!result) res.status(401).send("something went wrong");
            else{
                let token = generateToken(user);
                res.cookie("token",token);
                res.status(200).send("you have logged in");
            }
        });

    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.logOut = function(req,res){
    if(req.cookies.token){
        res.cookie("token","");
        res.redirect("/");
    }
    else{
        req.flash("error","already loggout");
        res.redirect("/");
    }
}