const User = require('../models/user.js');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {

    try {
        //get email from req body
        const email = req.body.email;
        //check user for thsi email, email validation
        const user = await User.findOne({email: email});

        if(!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not registered with us, Please enter a valid Email`
            });
        }

        //generate token
        const token = crypto.randomBytes(20).toString('hex');

        //updae user by adding token and expiration time
        let updatedDetails = await User.findOneAndUpdate(
                {email:email}, 
                {
                    token: token,
                    resetPasswordExpires : Date.now() + 3600000,
                },
                {new: true}
            );

        console.log('DETAILS: ', updatedDetails);
        //create url 
        // const url = `http://localhost:3000/update-password/${token}`; 
        const url = `https://leads.zupinn.com/update-password/${token}`; 
        // const url = `https://leads-zupinn.netlify.app/update-password/${token}`; 
        //send mail containing the url
        await mailSender(
            email,
            'Password Reset Link - Lead Generation',
            `
            Hello,
            <br/>
            As, you have requested for password change. So, Your link for password email verification is ${url}. Please click this url to reset your password or you can click below button to reset Password.
            <br/><br/>

            <h4>Click below for Reset Password</h4>
            <a href="${url}" style=" background:blue;color:white;padding:10px 25px; border-radius:10px;text-decoration:none; font-weight:bold; " >Reset Password</a>

            <br/><br/>
            Thanks & Regards,
            <br/>
            Lead Generation
            `
        )
        //return response
        return res.json({
            success: true,
            message: 'Email sent successfully, Please Check Your Email To Continue Further',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong While Sending Reset Mail'
        })
    }
}

//resetPassword
exports.resetPassword = async (req, res) => {
    try {
        //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword) {
            return res.json({
                success: false,
                message: 'Password And Confirm Password Does Not Match',
            });
        }
        //get userdetails from db using token
        const userDetail = await User.findOne({token: token});

        //if entry not found - invalid token
        if(!userDetail) {
            return res.json({
                success: false,
                message: 'Token is Invalid',
            });
        }

        let userDetails = userDetail;
        //check token time
        if( userDetails.resetPasswordExpires < Date.now() ) {
            return res.json({
                success: false,
                message: 'Token is expired, Please Regenerate Your Token',
            });
        }
        //hash password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //update password
            await User.findOneAndUpdate(
                {token: token},
                {password: encryptedPassword},
                {new: true},
            );

        //return response
        return res.json({
            success: true, 
            message: `Password Updated Successfully`
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error occurred while updating password`
        });
    }
}
