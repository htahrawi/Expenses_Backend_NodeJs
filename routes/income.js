import express from "express";

import { requireSignin } from "../middlewares/middleware";


import { addIncome, getIncomes, deleteIncome } from "../controller/income/income";
const router = express.Router();


router.post('/add-income', requireSignin, addIncome)

router.get('/get-incomes', requireSignin, getIncomes)

router.delete('/delete-income/:id', requireSignin, deleteIncome)

module.exports = router;
