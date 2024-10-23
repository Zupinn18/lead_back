const mongoose = require("mongoose");

const DailyTaskSchema = new mongoose.Schema({
    assignedTo: { 
        type: mongoose.Types.ObjectId, 
        ref: "User" 
    },
    task:{
        type:String,
    },
    assignedOn:{
        type:Date,
        required:true,
        default:Date.now()
    },
    completedOn:{
        type: Date,
    },
    currentStatus:{
        type:String,
    },
});

module.exports = mongoose.model("DailyTask",DailyTaskSchema);