const mongoose = require("mongoose");

const teleCallerSchema = new mongoose.Schema({
        fullName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:Number
        },
        token: {
            type : String,
        },
        accountType: {
            type: String,
            enum: ['Admin', 'User'],
            required: true
        },
        UsersData: [
            { 
                type: mongoose.Types.ObjectId, 
                ref: "UsersData" 
            }
        ],
});

module.exports = mongoose.model("User",teleCallerSchema);