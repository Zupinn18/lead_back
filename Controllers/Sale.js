const Sale = require("../models/sale.js");

//create a new sale entry
exports.createSale = async(req,res)=>{
    try{

        const {
            date,
            ownerName,
            vNumber,
            load,
            vLoad,
            netWeight,
            material,
            paymentMode,
            amount,
            advanceAmount
        } = req.body;
        //validate fields
        if(!date || !ownerName || !vNumber || !load || !vLoad || !netWeight || !material || !paymentMode || !amount){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        // const getSale = await Sale.findOne({vNumber});
        // if(getSale){
        //     return res.status(403).json({
        //         success:false,
        //         message:'This V.Number is present, TRY AGAIN with different V.No'
        //     });
        // }

        const time = Date.now();

        const saleData = await Sale.create({
                    date:date,
                    ownerName:ownerName,
                    vNumber:vNumber,
                    load:load,
                    vLoad:vLoad,
                    time:time,
                    netWeight:netWeight,
                    material:material,
                    paymentMode:paymentMode,
                    advanceAmount:advanceAmount,
                    amount:amount,
        });

        return res.status(200).json({
            success:true,
            message:'Sale Data Saved Successfully',
            data:saleData,
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:`Cannot save Sale Data due to ${err.message}`,
        });
    }
}

// update same sale based on v.number
exports.updateSale = async(req,res)=>{
    try{

        const {
            ownerName,
            id,
            load,
            vLoad,
            netWeight,
            material,
            paymentMode,
            amount,
            advanceAmount,
            LastUpdatedBy,
        } = req.body;
        //validate fields

        if(!id ){
            return res.status(403).json({
                success:false,
                message:'Choose a v.Number',
            });
        }

        if(!ownerName || !load || !vLoad || !netWeight || !paymentMode || !amount ){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        const time = Date.now();

        const saleData = await Sale.findByIdAndUpdate({_id:id},
                {
                    ownerName,
                    load,
                    vLoad,
                    netWeight,
                    material,
                    time:time,
                    paymentMode,
                    amount,
                    advanceAmount,
                    LastUpdatedBy:LastUpdatedBy,
                    LastUpdatedAt:new Date(),
              },
            {new: true},
        );

        return res.status(200).json({
            success:true,
            message:'Sale Data Updated Successfully',
            data:saleData,
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:`Cannot Update Sale Data due to ${err.message}`,
        });
    }
}

//get all the sale data 
exports.getAllSales = async(req,res)=>{
    try {
        const allSales = await Sale.find({});

        if(!allSales){
            return res.status(403).json({
                success:false,
                message:'Not Sale data available',
            });
        }

        return res.status(200).json({
            success:true,
            message:'All Sales Fetched Successfully',
            data:allSales,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't fetch all sales due to ${error.message} `,
        });
    }
}

//get all the one sale data on ID
exports.getSale = async(req,res)=>{
    try {
        const {
            id
        } = req.params;
        
        const oneSale = await Sale.findById({_id:id});
    
        if(!oneSale){
            return res.status(403).json({
                success:false,
                message:'Not a valid V.number',
            });
        }

        return res.status(200).json({
            success:true,
            message:'Sale Fetched Successfully',
            data:oneSale,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't fetch sale for vNumber due to ${error.message} `,
        });
    }
}