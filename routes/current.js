import express from "express";
import {
  depositToCurrentAcc,
  getCurrentAccountWithCustomerId,
} from "../controller/current.js";
import { createStatement } from "../controller/statement.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const currentAcc = await getCurrentAccountWithCustomerId(customer_id);
  res.json(currentAcc);
});

router.put("/:customer_id", verifyToken, async (req, res) => {
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
