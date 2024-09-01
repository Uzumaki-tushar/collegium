const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const {generateToken}= require("../utils/generateToken.js");


module.exports.registerUser= async function(req,res){
    try{
        let{username,email,password}=req.body;

        let user = await userModel.findOne({email});
        if(user){
            req.flash("error","you already have an account, please login.");
            return res.status(401).redirect("/login");
        } 

        bcrypt.hash(password, 10, async function(err, hash) {
            // Store hash in your password DB.
            let user= await userModel.create({
                username,
                email,
                password:hash
            })
    
            let token = generateToken(user);
            // console.log(token);
            res.cookie("token",token),
            req.flash("success","your account has been created");
            res.redirect("/users/profile");
        });
    }
    catch(err){
        res.status(504).send("something unexpected happens");
    }
}

module.exports.loginUsers= async function(req,res){
    try{
        let {email,password}= req.body;
        let user= await userModel.findOne({email});
        if(!user){
            req.flash("error","something went wrong");
            return res.status(401).redirect("/login");
        }

        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(!result){
                req.flash("error","something went wrong");
               return res.status(401).redirect("/login");
            } 
            else{
                let token = generateToken(user);
                res.cookie("token",token);
                req.flash("success","loggedIn successfully");
                res.status(200).redirect("/users/profile");
            }
        });

    }
    catch(err){
        res.status(504).send("something unexpected happens");
    }
}

module.exports.logOut = function(req,res){
    if(req.cookies.token){
        res.cookie("token","");
        req.flash("success","logout successfully");
        res.redirect("/");
    }
    else{
        req.flash("error","already loggout");
        res.redirect("/");
    }
}