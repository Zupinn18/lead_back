const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log(`Database connected Successfully`);
    })
    .catch((error)=>{
        console.log(`Unable to connect to database due to ${error.message}`);
    })
}

module.exports = dbConnect;