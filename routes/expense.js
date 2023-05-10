import express from "express";

import { requireSignin } from "../middlewares/middleware";

const {
  addExpense,
  getExpense,
  deleteExpense
} = require("../controller/expense/expense");

const router = express.Router();

router.post("/add-expense", requireSignin, addExpense);

router.delete("/delete-expense:id", requireSignin, deleteExpense);

router.get("/get-expense", requireSignin, getExpense);

module.exports = router;
