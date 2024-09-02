const express = require("express");
const router = express.Router();

// import the register controller
const {register} = require("../Controllers/Auth.js");
const {login} = require("../Controllers/Auth.js");
const {
    resetPasswordToken,
    resetPassword,
} = require('../Controllers/ResetPassword.js');


// Routes for controllers
router.post("/register",register);
router.post("/login",login);

//Route for generating a reset password token
router.post('/reset-password-token', resetPasswordToken);

//Route for resetting user's password after verification
router.post('/reset-password', resetPassword);

module.exports = router;