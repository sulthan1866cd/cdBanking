import express from "express";
import Credit from "../models/Credit.js";
import Statement from "../models/Statement.js";
import { depositToCreditAcc } from "../controller/credit.js";
import { createStatement } from "../controller/statement.js";

const router = express.Router();

router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const creditAcc = await Credit.findOne({
    where: { userCustomerId: customer_id },
  });
  res.json(creditAcc);
});

router.put("/:customer_id", async (req, res) => {
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
