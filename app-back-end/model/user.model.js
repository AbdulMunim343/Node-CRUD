const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    first_name : {type : String, required:true},
    last_name: {type : String},
    username:{type : String, required:true},
    password:{type : String, required:true},
});


const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel;