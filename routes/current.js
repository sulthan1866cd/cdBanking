import express from "express";
import Current from "../models/Current.js";
import Statement from "../models/Statement.js";

const router = express.Router();

router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const currentAcc = await Current.findOne({
    where: { userCustomerId: customer_id },
  });
  res.json(currentAcc);
});

router.put("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const ammount = req.body.ammount;
  const description = req.body.description;
  const currentAcc = await Current.findOne({
    where: { userCustomerId: customer_id },
  });
  currentAcc.balence += ammount;
  const statement = {
    customer_id:customer_id,
    description: description,
    account:'current',
    amount: ammount,
    closing_balence: currentAcc.balence,
  };
  Statement.create(statement);
  currentAcc.save();
  res.sendStatus(200);
});

export default router;
