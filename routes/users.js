import express from "express";
import bcrypt from "bcrypt";
import { createUser, getAllUsers, getUserByCId } from "../controller/user.js";
import { createSavingsAccount } from "../controller/savings.js";
import { createCurrentAccount } from "../controller/current.js";
import { createCreditAccount } from "../controller/credit.js";

const router = express.Router();
router.get("/", async (req, res) => {
  res.json(await getAllUsers());
});

router.post("/", async (req, res) => {
  createUser(req, res);
  createSavingsAccount(req, res);
  createCurrentAccount(req, res);
  createCreditAccount(req, res);
});

router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const customer = await getUserByCId(customer_id);
  res.json(customer);
});

router.put("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const password = req.body.password;
  const customer = await getUserByCId(customer_id);
  if (!customer) {
    res.sendStatus(404);
  } else
    bcrypt.compare(password, customer.password, (err, isMatch) => {
      if (err) res.sendStatus(500);
      if (!isMatch) {
        res.json(null);
      } else {
        res.json({ customer_id });
      }
    });
});

export default router;
