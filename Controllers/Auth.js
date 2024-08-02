const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const dotenv = require("dotenv");

dotenv.config();

// Signup user
exports.register = async(req,res)=>{
    try {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            phoneNumber,
            accountType
        } = req.body;
        // Validate fields
        if(!fullName || !email || !password || !confirmPassword || !accountType){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory !, Please Try Again'
            });
        }
        
        // Check if both password matches or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:`Password doesn't match, Both password must be same`
            });
        }

        // check if user already registered with us or not
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message : 'User already exists. Please Login to continue.',
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a user

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            accountType
        });

        return res.status(200).json({
            success:true,
            message:'User Registered Successfully',
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success:true,
            message:`Cannot register user due to ${error.message}`,
        });
    }
}

//login User
exports.login = async(req,res)=>{
    try {
        // get email and pass from req
        const {email, password} = req.body;

        //validation of data
        if(!email || !password) {
            //Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }
        //check user exists or not
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                //Return 401 unauthorized status code with error message
                success: false,
                message: `User is not registered with Us, Please Register to Continue`,
            });
        }

        // generate jwt 
        if(await bcrypt.compare(password, user.password)){
            const payLoad = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

            const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });

            // save token to user document in db
            user.token = token;
            user.password = undefined;

            //create cookie and send response

            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Login Successfully'
            });

        }else{
            return res.status(401).json({
                success: false,
                message: `Password Is Incorrect`,
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Can't login due to ${error.message}`,
        });
    }
}