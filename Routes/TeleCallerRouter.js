const express = require("express");
const router = express.Router();

const {
    AddSheetTeleCaller,
    getAllTeleCaller,
    getSingleTeleCaller
} = require("../Controllers/telecallerController.js");

router.get("/get-all-telecaller",getAllTeleCaller);
router.get("/get-one-telecaller/:id",getSingleTeleCaller);
router.put("/update-telecaller",AddSheetTeleCaller);

module.exports = router;