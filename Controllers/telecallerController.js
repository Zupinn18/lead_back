const Users = require("../models/user.js");
const UsersData = require("../models/Users.js");

// controller to add sheet to a specified telecaller from DB

exports.AddSheetTeleCaller = async(req,res) =>{
    try {
        
        const {id,
            // name,
            //     email,
            //     mobile,
            //     source,
            //     date,
            //     time,
            //     followResult,
            //     followDate,
            //     result,
            //     response,
            //     services,
        } = req.body;

        // let resultuser = [];

        // for(let i=0;i<data.length;i++){
        //     resultuser.push({
        //         name:data[i].Name,
        //         email:data[i].Email,
        //         mobile:data[i].Mobile,
        //         uploadedOnDate:Date.now(),
        //         source:data[i].Source,
        //         date:data[i].Date,
        //         time:data[i].Time,
        //         followResult:data[i].FollowUpResult,
        //         followDate:data[i].FollowDate,
        //         result:data[i].Result,
        //         response:data[i].Response,
        //         services:data[i].Services,
        //     });
        // }

    //     const newUser = {
    //         name: "Rama",
    //         email: "rama12345@gmail.com",
    //         mobile: "8273834136",
    //         services: "mobile development",
    //         result: "Yes",
    //         response: "Interest",
    //         source: "phone",
    //         followDate: "06-07-2024",
    //         followResult: "No",
    //         date: "25-06-2024",
    //         time: "1AM"
    // }
        
        // const userData = await UsersData.insertMany(result);
    //     console.log(typeof(newUser));

    //    const userdetail = await TeleCaller.findById({_id:id});

    //    console.log("user found here ", userdetail);

        const userData = await Users.findOneAndUpdate({_id:id},
            { $push: { UsersData: Id}},
        );

        console.log("user 2nd aaya");

        if(!userData){
            return res.status(403).json({
                success:false,
                message:'Error while uploading data'
            })
        }

        return res.status(200).json({
            success:true,
            message:'User Data added to telecalleler Successfully',
            data:userData,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Unable to distribute given sheet data to telecaller`
        });
    }
}

// controller to fetch all the telecallers
exports.getAllTeleCaller = async(req,res)=>{
    try {
        
        const allUser = await Users.find().populate("UsersData").exec();
    
        if(!allUser){
            return res.status(403).json({
                success:false,
                message:'No Telecaller Present',
            });
        }

        return res.status(200).json({
            success:true,
            message:'Telecaller Fetched Successfully',
            data:allUser,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't fetch telecaller due to ${error.message} `,
        });
    }
}

// controller to fetch single the telecallers
exports.getSingleTeleCaller = async(req,res)=>{
    try {

        const {id} = req.params;
        
        const OneUser = await Users.findById({_id:id}).populate("UsersData").exec();
    
        if(!OneUser){
            return res.status(403).json({
                success:false,
                message:'No Telecaller Present',
            });
        }

        return res.status(200).json({
            success:true,
            message:'Telecaller Fetched Successfully',
            data:OneUser,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Can't fetch telecaller due to ${error} `,
        });
    }
}
