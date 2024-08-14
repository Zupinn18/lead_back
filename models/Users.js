const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        mobile:{
            type:String,
            required:true,
        },
        uploadedOnDate:{
            type:Date
        },
        services:{
            type:String,
            required:true,
        },
        result:{
            type:String,
            required:true,
        },
        response:{
            type:String,
            required:true,
        },
        source:{
            type:String,
            required:true,
        },
        followDate:{
            type:String,
            required:true,
        },
        followResult:{
            type:String,
            required:true,
        },
        date:{
            type:String,
            required:true,
        },
        time:{
            type:String,
            required:true,
        },
        messages:{
            type : Array ,
        },
        assignedTo:{
            type:String,
            required:true
        }
});

module.exports = mongoose.model("UsersData",usersSchema);