import express from "express";
import {
  depositToCurrentAcc,
} from "../controller/current.js";
import { setAndCreateStatement } from "../controller/statement.js";
import { verifyToken } from "../middleware/auth.js";
import { getCurrentAccountWithCustomerId } from "../services/current.js";

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
  setAndCreateStatement(
    customer_id,
    description,
    "current",
    ammount,
    currentAcc.balence
  );
  res.sendStatus(200);
});

export default router;
