const UsersData = require("../models/Users");
const TeleCaller = require("../models/user.js");

exports.fileUpload = async(req,res)=>{
    try {
        
        const {id, data} = req.body;

        let result = [];

        const teleDetails = await TeleCaller.findOne({_id:id});

        if(!teleDetails){
            return res.status(404).json({
                success:false,
                message:'No Telecaller using this Id'
            });
        }

        for(let i=0;i<data.length;i++){
            result.push({
                name:data[i].Name,
                email:data[i].Email,
                mobile:data[i].Mobile,
                uploadedOnDate:Date.now(),
                source:data[i].Source,
                date:data[i].Date,
                time:data[i].Time,
                followResult:data[i].FollowUpResult,
                followDate:data[i].FollowDate,
                result:data[i].Result,
                response:data[i].Response,
                services:data[i].Services,
                assignedTo:teleDetails.fullName
            });
        }

        const userData = await UsersData.insertMany(result);

        if(!userData){
            return res.status(403).json({
                success:false,
                message:'Error while uploading data'
            })
        }

        for(let i=0;i<userData.length;i++){
            const fileData = await TeleCaller.findOneAndUpdate({_id:id},
                { $push: { UsersData: userData[i]._id}},
            );
        }

        return res.status(200).json({
            success:true,
            message:'Data uploaded successfully',
            data:userData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Can't upload Excel File due to ${error.message}`,
        });
    }
}

exports.getAllUsersData = async(req,res)=>{
    try {

        const userData = await UsersData.find();


        if(!userData){
            return res.status(403).json({
                success:false,
                message:'Error fetching data'
            })
        }


        return res.status(200).json({
            success:true,
            message:'Data fetched successfully',
            data:userData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Can't fetch userlead data due to ${error.message}`,
        });
    }
}

//create single lead data upload
exports.createSingleLead = async(req,res)=>{
    try {
        
        const {id, 
            Name,
            Email,
            Mobile,
            Services,
            resultUser,
            Source,
            Response,
            FollowDate,
            FollowResult,
        } = req.body;

        let Result = [];

        const teleDetails = await TeleCaller.findOne({_id:id});

        if(!teleDetails){
            return res.status(404).json({
                success:false,
                message:'No Telecaller using this Id'
            });
        }

        const now = new Date();
        const formattedDate = now.toLocaleString('en-US',  { timeZone: 'Asia/Kolkata' });

        const [newdate, newtime] = formattedDate.split(',').map(part => part.trim());

        Result.push({
                name:Name,
                email:Email,
                mobile:Mobile,
                uploadedOnDate:Date.now(),
                source:Source,
                date:newdate,
                time:newtime,
                followResult:FollowResult,
                followDate:FollowDate,
                result:resultUser,
                response:Response,
                services:Services,
                assignedTo:teleDetails.fullName
            });

        const userData = await UsersData.create(Result);
        
        if(!userData){
            return res.status(403).json({
                success:false,
                message:'Error while uploading single lead data'
            })
        }

        const fileData = await TeleCaller.findOneAndUpdate({_id:id},
                { $push: { UsersData: userData[0]._id}},
            );

        return res.status(200).json({
            success:true,
            message:'Data uploaded successfully',
            data:userData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Can't upload Single Lead File due to ${error.message}`,
        });
    }
}
