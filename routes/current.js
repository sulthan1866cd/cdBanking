import express from "express";
import Current from "../models/Current.js";
import Statement from "../models/Statement.js";
import { depositToCurrentAcc } from "../controller/current.js";
import { createStatement } from "../controller/statement.js";

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
  const currentAcc = await depositToCurrentAcc(customer_id, ammount);
    createStatement(
      customer_id,
      description,
      "current",
      ammount,
      currentAcc.balence
    );
  res.sendStatus(200);
});

export default router;
