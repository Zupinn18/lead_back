const express = require("express");
const router = express.Router();

const {
    getSingleUser,
    updateUserDetail,
    updateMessage
} = require("../Controllers/UserDetails.js");

router.get("/get-single-user/:id",getSingleUser);
router.put("/update-user",updateUserDetail);
router.put("/update-message/:id",updateMessage)

module.exports = router;