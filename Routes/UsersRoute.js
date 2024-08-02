const express = require("express");
const router = express.Router();

const {fileUpload, getAllUsersData} = require("../Controllers/UserController.js");

router.post('/importuser',fileUpload);
router.get('/importuser',getAllUsersData);


module.exports = router;