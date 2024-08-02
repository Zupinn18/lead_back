const express = require("express");
const router = express.Router();

const {
    createSale,
    updateSale,
    getAllSales,
    getSale
} = require("../Controllers/Sale.js");

router.post("/create-sale",createSale);
router.put("/update-sale",updateSale);
router.get("/get-sale",getAllSales);
router.get("/get-one-sale/:id",getSale);

module.exports = router;