const DailyTask = require('../models/DailyTask.jsx');
const User = require('../models/user.js');

exports.CreateDailyTask = async(req,res)=>{
    try {

        const {id, task, completedOn, currentStatus} = req.body;

        const dailyData = await DailyTask.create({
            assignedTo:id,
            task,
            completedOn,
            currentStatus
        });

        const UserData = await User.findOneAndUpdate({_id:id},
                { $push: { DailyTask: dailyData._id}},
            );

            return res.status(200).json({
                success:true,
                message:'Daily Task Assigned successfully',
                data:UserData
            });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Unable to mark Attendence due to ${error.message}`
        });
    }
}

exports.UpdateDailyTask = async(req,res)=>{
    try {

        const {id, currentStatus} = req.body;

        const dailyData = await DailyTask.findOneAndUpdate({_id:id},
            {
                currentStatus:currentStatus
            });

            return res.status(200).json({
                success:true,
                message:'Daily Task Updated successfully',
                data:dailyData
            });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Unable to Update task due to ${error.message}`
        });
    }
}

exports.getDailyTask = async(req,res)=>{
    try {

        const {id} = req.params;

        const Telecaller = await User.findById({_id:id});

        if(!Telecaller){
            return res.status(404).json({
                success:false,
                message:' Invalid Id, No telecaller present with this Id'
            });
        }

        const TeleData = await User.findById({_id:id}).populate("DailyTask").select("-password").select("-UsersData").exec();

        return res.status(200).json({
            success:true,
            message:'Tasks fetched successfully',
            data:TeleData
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Unable to fetch daily task due to ${error.message}`
        });
    }
}

exports.getAllDailyTasks = async(req,res)=>{
    try {

        const AllTask = await DailyTask.find({}).populate("assignedTo").select("-password").select("-UsersData").exec();

        if(!AllTask){
            return res.status(404).json({
                success:false,
                message:' Not found'
            });
        }

        return res.status(200).json({
            success:true,
            message:'All Tasks fetched successfully',
            data:AllTask
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Unable to fetch all daily task due to ${error.message}`
        });
    }
}