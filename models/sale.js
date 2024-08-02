const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
        ownerName:{
            type:String
        },
        date:{
            type:Date
        },
        vNumber:{
            type:String
        },
        load:{
            type:Number
        },
        vLoad:{
            type:Number
        },
        netWeight:{
            type:Number
        },
        material:{
            type:String
        },
        time:{
            type:Date
        },
        paymentMode:{
            type:String
        },
        advanceAmount:{
            type:Number
        },
        amount:{
            type:Number
        },
        LastUpdatedBy:{
            type:String
        },
        LastUpdatedAt:{
            type:Date
        }
});

module.exports = mongoose.model("Sale",saleSchema);