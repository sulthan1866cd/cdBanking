import express from "express";
import {
  depositToSavingsAcc,
} from "../controller/savings.js";
import { createStatement } from "../controller/statement.js";
import { verifyToken } from "../middleware/auth.js";
import { getSavingsAccountWithCustomerId } from "../services/saving.js";

const router = express.Router();

router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const savingsAcc = await getSavingsAccountWithCustomerId(customer_id);
  res.json(savingsAcc);
});

router.put("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const ammount = req.body.ammount;
  const description = req.body.description;
  const savingsAcc = await depositToSavingsAcc(customer_id, ammount);
  createStatement(
    customer_id,
    description,
    "saving",
    ammount,
    savingsAcc.balence
  );
  res.sendStatus(200);
});

export default router;
