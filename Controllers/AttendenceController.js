const Attendence = require('../models/Attendence.jsx');
const User = require('../models/user.js');

exports.CreateAttendence = async(req,res)=>{
    try {

        const {id, isPresent} = req.body;

        const startOfDay = new Date();
        startOfDay.setHours(9, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(20, 0, 0, 0);

        const existingAttendance = await Attendence.findOne({
        User: id,
        date: {
            $gte: startOfDay,
            $lte: endOfDay,
        },
        });

        if (existingAttendance) {
            return res.status(400).json({
                success:true,
                message:'Attendence already marked for today'
            });
        }

        const date = new Date();

        if (date >= startOfDay && date <= endOfDay) {
            const AttendenceData = await Attendence.create({
                User:id,
                date,
                isPresent
            });

            const fileData = await User.findOneAndUpdate({_id:id},
                { $push: { Attendence: AttendenceData._id}},
            );
            
            return res.status(200).json({
                success:true,
                message:'Attendence Marked successfully',
                data:fileData
            });

          } else {
            return res.status(400).json({
                 success:false,
                 message:'Attendance can only be marked between 9:00 AM and 6:00 PM' 
                });
          }
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Unable to mark Attendence due to ${error.message}`
        });
    }
}

exports.getAllAttendences = async(req,res)=>{
    try {

        const {id} = req.params;

        const Telecaller = await User.findById({_id:id});

        if(!Telecaller){
            return res.status(404).json({
                success:false,
                message:' Invalid Id, No telecaller present with this Id'
            });
        }

        const TeleData = await User.findById({_id:id}).populate("Attendence").select("-password").select("-UsersData").exec();

        return res.status(200).json({
            success:true,
            message:'Attendence fetched successfully',
            data:TeleData
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Unable to fetch Attendence due to ${error.message}`
        });
    }
}

const markAbsentAfterEndTime = async () => {
    try {
      // Set end of the day to 6:00 PM
      const endOfDay = new Date();
      endOfDay.setHours(20, 0, 0, 0);
  
      // Only run this function after the end of the allowed time
      const now = new Date();
      if (now > endOfDay) {
        // Get all users
        const users = await User.find();
  
        for (const user of users) {
          // Check if the user has already marked attendance for today
          const startOfDay = new Date();
          startOfDay.setHours(9, 0, 0, 0);
  
          const existingAttendance = await Attendence.findOne({
            User: user._id,
            date: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          });
  
          // If no attendance exists, mark the user as absent
          if (!existingAttendance) {
            const absentAttendance = new Attendence({
              User: user._id,
              date: now,
              isPresent: false,
            });
  
            await absentAttendance.save();

            const fileData = await User.findOneAndUpdate({_id:user._id},
                { $push: { Attendence: absentAttendance._id}},
            );

          }
        }
  
        console.log('All absent users have been marked.');
      }
    } catch (error) {
      console.error('Error marking absentees:', error);
    }
  };
  
  // Schedule to run markAbsentAfterEndTime at 8:00 PM every day
const scheduleMarkAbsent = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(20, 0, 0, 0);
  
    const timeToWait = endOfDay.getTime() - now.getTime();
  
    if (timeToWait > 0) {
      setTimeout(async () => {
        await markAbsentAfterEndTime();
        scheduleMarkAbsent(); // Schedule for the next day
      }, timeToWait);
    } else {
      // If it's already past 6:01 PM, schedule for the next day
      endOfDay.setDate(endOfDay.getDate() + 1);
      setTimeout(async () => {
        await markAbsentAfterEndTime();
        scheduleMarkAbsent(); // Schedule for the next day
      }, endOfDay.getTime() - now.getTime());
    }
  };
  
// Start the schedule
scheduleMarkAbsent();
  