const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    image:Buffer,
    username:String,
    email:String,
    password:String,
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
})

module.exports = mongoose.model("user",userSchema);