const express= require("express");
const router = express.Router();
const isloggedIn = require("../middlewares/isloggedIn");
const userModel = require("../models/user-model");
const postModel = require("../models/post-model");

router.get("/create",isloggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    res.render("createPost",{user});
})

router.post("/create",isloggedIn,async (req,res)=>{
    let {title,content}= req.body;
    let user= await userModel.findOne({email:req.user.email});
    if(title==='' || content===''){
        return res.send("all feilds are mandatory");
    }

    let post = await postModel.create({
        title,
        content,
    })

    post.user= user._id;
    user.posts.push(post._id);
    await user.save();
    await post.save();
    res.send(post);
})

router.get("/",isloggedIn, async (req,res)=>{
    let allPost = await postModel.find();
    let allUsers = await userModel.find();


    // console.log(req.user);
    let user = req.user;
    res.render("post",{allPost,allUsers,user});
})

router.get("/like/:id",isloggedIn, async (req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.userid)===-1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }
    await post.save();
    res.redirect("/posts");
})

module.exports= router;