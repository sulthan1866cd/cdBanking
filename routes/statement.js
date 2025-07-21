import express from "express";
import Statement from "../models/Statement.js";

const router = express.Router();

router.get("/:account/:customer_id", async(req, res) => {
    console.log("dfrwfwe")
  const account = req.params.account;
  const customer_id = req.params.customer_id;
  const statements = await Statement.findAll({
    where: {
      account: account,
      customer_id: customer_id,
    },
  });
  res.json(statements);
  console.log(statements)
});

export default router;
