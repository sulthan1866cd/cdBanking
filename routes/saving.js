import express from "express";
import Saving from "../models/Saving.js";
import Statement from "../models/Statement.js";

const router = express.Router();

router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const savingsAcc = await Saving.findOne({
    where: { userCustomerId: customer_id },
  });
  res.json(savingsAcc);
});

router.put("/:customer_id", async (req, res) => {
    const customer_id = req.params.customer_id;
    const ammount = req.body.ammount;
    const description = req.body.description;
    const savingsAcc = await Saving.findOne({
      where: { userCustomerId: customer_id },
    });
    savingsAcc.balence += ammount;
    const statement = {
      customer_id: customer_id,
      description: description,
      account: "saving",
      amount: ammount,
      closing_balence: savingsAcc.balence,
    };
    Statement.create(statement);
    savingsAcc.save();
    res.sendStatus(200);

});

export default router;
