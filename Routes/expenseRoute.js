const express = require("express");
const router = express.Router();

const {
    createExpense,
    getExpenses
} = require("../Controllers/Expense.js");

router.post("/create-expense", createExpense);
router.get("/get-expense", getExpenses);

module.exports = router;