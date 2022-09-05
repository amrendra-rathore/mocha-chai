const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    phone:Number,
    telephone:Number,
    email:String
}) ;

module.exports = mongoose.model("User",UserSchema);
