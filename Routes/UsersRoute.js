const express = require("express");
const router = express.Router();

const {fileUpload, getAllUsersData, createSingleLead} = require("../Controllers/UserController.js");

router.post('/importuser',fileUpload);
router.get('/importuser',getAllUsersData);
router.post('/create-single-lead',createSingleLead);


module.exports = router;