const express = require("express");
const router = express.Router();

// import the register controller
const {CreateDailyTask, getDailyTask, getAllDailyTasks, UpdateDailyTask} = require("../Controllers/DailyTaskController.js");


// Routes for controllers
router.post("/create-daily-task",CreateDailyTask);
router.put("/update-task",UpdateDailyTask);
router.get("/get-one-task/:id",getDailyTask);
router.get("/get-all-tasks",getAllDailyTasks);

module.exports = router;