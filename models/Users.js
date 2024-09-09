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
        },
        result:{
            type:String,
        },
        response:{
            type:String,
        },
        source:{
            type:String,
        },
        followDate:{
            type:String,
        },
        followResult:{
            type:String,
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