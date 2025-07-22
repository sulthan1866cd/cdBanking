import express from "express";
import { findAllStatementsByObj } from "../controller/statement.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:customer_id/:account", verifyToken, async (req, res) => {
  const account = req.params.account;
  const customer_id = req.params.customer_id;
  const statements = await findAllStatementsByObj({
    account: account,
    userCustomerId: customer_id,
  });

  res.json(statements);
});

export default router;
