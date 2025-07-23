import express from "express";
import bcrypt from "bcrypt";
import { createUser } from "../controller/user.js";
import { createSavingsAccount } from "../controller/savings.js";
import { createCurrentAccount } from "../controller/current.js";
import { createCreditAccount } from "../controller/credit.js";
import { generateJWT, verifyToken } from "../middleware/auth.js";
import { getAllUsers, getUserByCId } from "../services/user.js";

const router = express.Router();
router.get("/", verifyToken, async (req, res) => {
  res.json(await getAllUsers());
});

router.post("/", async (req, res) => {
  const newUser = await createUser(req, res);
  if (!newUser) {
    res.sendStatus(500);
    return;
  }
  createSavingsAccount(req, res);
  createCurrentAccount(req, res);
  createCreditAccount(req, res);
  const token = generateJWT(newUser);
  res.status(201).json({ token });
});

router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const customer = await getUserByCId(customer_id);
  res.json(customer);
});

/**
 * @openapi
 * /api/v1/users/{customer_id}:
 *  put:
 *   tag:
 *      - login
 *   summary: login in to account
 *   parameters:
 *   - name: customer_id
 *     in: path
 *     required: true
 *     description: unique id for customer
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: json
 *           example: {password : 'your password'}
 *   responses:
 *     200: 
 *       description: login in and get JWT token
 *       content:
 *         application/json:
 *           schema:
 *             type: json
 *             example: {token : 'your token'}
 *       
 */
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
        const token = generateJWT(customer);
        res.json({ token });
      }
    });
});

export default router;
