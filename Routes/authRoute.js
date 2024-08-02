const express = require("express");
const router = express.Router();

// import the register controller
const {register} = require("../Controllers/Auth.js");
const {login} = require("../Controllers/Auth.js");


// Routes for controllers
router.post("/register",register);
router.post("/login",login);

module.exports = router;