const express = require("express");
const router = express.Router();

// import the register controller
const {CreateAttendence, getAllAttendences} = require("../Controllers/AttendenceController.js");


// Routes for controllers
router.post("/add-attendence",CreateAttendence);
router.get("/get-attendence/:id",getAllAttendences);

module.exports = router;