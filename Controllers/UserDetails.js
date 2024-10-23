const Users = require("../models/Users.js");

exports.getSingleUser = async(req,res)=>{
    try {
        const {
            id
        } = req.params;
        
        const oneUser = await Users.findById({_id:id});
    
        if(!oneUser){
            return res.status(403).json({
                success:false,
                message:'Not a valid Id',
            });
        }

        return res.status(200).json({
            success:true,
            message:'User Details Fetched Successfully',
            data:oneUser,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't fetch user details due to ${error.message} `,
        });
    }
}

exports.updateUserDetail = async(req,res)=>{
    try{

        const {
            id,
            name,
            email,
            mobile,
            services,
            result,
            response,
            source,
            followDate,
            followResult,
            date,
            time
        } = req.body;
        //validate fields

        if(!services || !result || !response || !source || !followDate || !followResult ){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        const now = new Date();
        const formattedDate = now.toLocaleString('en-US',  { timeZone: 'Asia/Kolkata' });

        const [newdate, newtime] = formattedDate.split(',').map(part => part.trim());

        const userData = await Users.findByIdAndUpdate({_id:id},
                {
                    name,
                    email,
                    mobile,
                    services,
                    result,
                    response,
                    followDate,
                    date:newdate,
                    time:newtime
              },
            {new: true},
        );

        return res.status(200).json({
            success:true,
            message:'User Data Updated Successfully',
            data:userData,
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:`Cannot Update Data Data due to ${err.message}`,
        });
    }
}

exports.updateMessage = async(req,res)=>{
    try{

        let {
            message
        } = req.body;
        //validate fields

        const id = req.params.id;

        let currentDate = new Date();
        // Format the date and time (optional, for readability)
        let formattedDate = currentDate.toLocaleDateString(); // e.g., '10/17/2024'
        let formattedTime = currentDate.toLocaleTimeString(); // e.g., '11:24:35 AM'

        // Append the date and time to the message
        message += ` (Date: ${formattedDate}, Time: ${formattedTime})`;

        if(!id || !message ){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        const userData = await Users.findOneAndUpdate({_id:id},
              { $push: { messages: message}},
        );

        // Users.messages.push({ message: message });
        
        // // Save the user with the updated messages array
        // await Users.save();

        return res.status(200).json({
            success:true,
            message:'User Message added Successfully',
            data:userData,
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:`Cannot add User Message due to ${err.message}`,
        });
    }
}




