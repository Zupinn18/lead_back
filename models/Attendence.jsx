const mongoose = require("mongoose");

const AttendenceSchema = new mongoose.Schema({
    User: { 
        type: mongoose.Types.ObjectId, 
        ref: "User" 
        },
    date:{
        type:Date,
        required:true,
    },
    attendenceTime:{
        type: Date,
        default: Date.now(),
    },
    isPresent:{
        type:Boolean,
        required:true,
        default:false,
    },
});

module.exports = mongoose.model("Attendence",AttendenceSchema);