import express from "express";
import Credit from "../models/Credit.js";
import Statement from "../models/Statement.js";

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
  const creditAcc = await Credit.findOne({
    where: { userCustomerId: customer_id },
  });
  creditAcc.balence += ammount;
  const statement = {
    customer_id: customer_id,
    description: description,
    account: "credit",
    amount: ammount,
    closing_balence: creditAcc.balence,
  };
  Statement.create(statement);
  creditAcc.save();
  res.sendStatus(200);
});

export default router;
