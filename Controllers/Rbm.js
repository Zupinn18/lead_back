const Rbm = require("../models/rbm.js");

//create a new Rbm entry
exports.createRbm = async(req,res)=>{
    try{
        console.log("isme aaya andar");
        const {
            date,
            ownerName,
            vNumber,
            load,
            vLoad,
            netWeight,
            material,
            amount
        } = req.body;
        //validate fields
        if(!date || !ownerName || !vNumber || !load || !vLoad || !netWeight || !material || !amount){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        const time = Date.now();

        const RbmData = await Rbm.create({
                    date:date,
                    ownerName:ownerName,
                    vNumber:vNumber,
                    load:load,
                    vLoad:vLoad,
                    time:time,
                    netWeight:netWeight,
                    material:material,
                    amount:amount,
        });

        return res.status(200).json({
            success:true,
            message:'Rbm Data Saved Successfully',
            data:RbmData,
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:`Cannot save Rbm Data due to ${err.message}`,
        });
    }
}

//get all the Rbm data 
exports.getAllRbms = async(req,res)=>{
    try {
        const allRbms = await Rbm.find({});

        if(!allRbms){
            return res.status(403).json({
                success:false,
                message:'Not Rbm data available',
            });
        }

        return res.status(200).json({
            success:true,
            message:'All Rbms Fetched Successfully',
            data:allRbms,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't fetch all Rbms due to ${error.message} `,
        });
    }
}

// update same Rbm based on v.number
exports.updateRbm = async(req,res)=>{
    try{

        const {
            id,
            ownerName,
            load,
            vLoad,
            netWeight,
            material,
            amount,
            LastUpdatedBy,
        } = req.body;
        //validate fields

        if(!id ){
            return res.status(403).json({
                success:false,
                message:'Choose a v.Number',
            });
        }

        if(!ownerName || !load || !vLoad || !netWeight || !amount ){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        const time = Date.now();

        const RbmData = await Rbm.findByIdAndUpdate({_id:id},
                {
                    ownerName,
                    load,
                    vLoad,
                    netWeight,
                    material,
                    time:time,
                    amount,
                    LastUpdatedBy:LastUpdatedBy,
                    LastUpdatedAt:new Date(),
              },
            {new: true},
        );

        return res.status(200).json({
            success:true,
            message:'Rbm Data Updated Successfully',
            data:RbmData,
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:`Cannot Update Rbm Data due to ${err.message}`,
        });
    }
}

//get all the one Rbm data on ID
exports.getRbm = async(req,res)=>{
    try {
        const {
            id
        } = req.params;
        
        const oneRbm = await Rbm.findById({_id:id});
    
        if(!oneRbm){
            return res.status(403).json({
                success:false,
                message:'Not a valid V.number',
            });
        }

        return res.status(200).json({
            success:true,
            message:'Rbm Fetched Successfully',
            data:oneRbm,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't fetch Rbm for vNumber due to ${error.message} `,
        });
    }
}