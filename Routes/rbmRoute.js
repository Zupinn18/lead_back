const express = require("express");
const router = express.Router();

const {
    createRbm,
    getAllRbms,
    getRbm,
    updateRbm
} = require("../Controllers/Rbm.js");

router.post("/create-rbm",createRbm);
router.get("/get-rbm",getAllRbms);
router.put("/update-rbm",updateRbm);
router.get("/get-one-sale/:id",getRbm);

module.exports = router;