import express from "express";
import {
  depositToCreditAcc,
  getCreditAccountWithCustomerId,
} from "../controller/credit.js";
import { createStatement } from "../controller/statement.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const creditAcc = await getCreditAccountWithCustomerId(customer_id);
  res.json(creditAcc);
});

router.put("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const ammount = req.body.ammount;
  const description = req.body.description;
  const creditAcc = await depositToCreditAcc(customer_id, ammount);
  createStatement(
    customer_id,
    description,
    "credit",
    ammount,
    creditAcc.balence
  );
  res.sendStatus(200);
});

export default router;
