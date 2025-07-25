import express from "express";
import { isCorrectPassword, setAndCreateUser } from "../../controller/user.js";
import { setAndCreateSavingsAccount } from "../../controller/savings.js";
import { setAndCreateCurrentAccount } from "../../controller/current.js";
import { setAndCreateCreditAccount } from "../../controller/credit.js";
import { generateJWT, verifyToken } from "../../middleware/auth.js";
import { getAllUsers, getUserByCId } from "../../services/user.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *  put:
 *   security:
 *      - authorization: []
 *   tags:
 *      - User
 *   summary: get data of all customers
 *   responses:
 *     200:
 *       description: data recevied sucessfully
 *     401:
 *       description: un authorization
 *     500:
 *       description: Internal server error
 */
router.get("/", verifyToken, async (req, res) => {
  res.json(await getAllUsers());
});

/**
 * @openapi
 * /api/v1/users:
 *  post:
 *   tags:
 *      - User
 *   summary: create new user
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: json
 *           example: { customer_id: "your customer id", name: "full name", password: "strong password", branch: " 'Ashok Nagar' or 'Aruppukottai' or 'Gandhi Nagar' " }
 *   responses:
 *     201:
 *       description: user creaded successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: json
 *             example: {token : "your token"}
 *     401:
 *       description: un authorization
 *     409:
 *       description: user already exists
 *     500:
 *       description: Internal server error
 */
router.post("/", async (req, res, next) => {
  const newUser = await setAndCreateUser(req, res, next);
  if (!newUser) {
    res.sendStatus(409);
    return;
  }
  setAndCreateSavingsAccount(req, res, next);
  setAndCreateCurrentAccount(req, res, next);
  setAndCreateCreditAccount(req, res, next);
  const token = generateJWT(newUser);
  res.status(201).json({ token });
});

/**
 * @openapi
 * /api/v1/users/{customer_id}:
 *  get:
 *   security:
 *      - authorization: []
 *   tags:
 *     - User
 *   summary: get user account
 *   parameters:
 *   - name: customer_id
 *     in: path
 *     required: true
 *     description: unique id for customer
 *   responses:
 *     200:
 *       description: user acc details
 *       content:
 *         application/json:
 *           schema:
 *             type: json
 *             example: {"customer_id": "cid","name": "your name","password": "hashed password","createdAt": "2025-07-20","updatedAt": "2025-07-20"}
 *     401:
 *       description: un authorization
 *     500:
 *       description: Internal server error
 */
router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const customer = await getUserByCId(customer_id);
  res.json(customer);
});

/**
 * @openapi
 * /api/v1/users/{customer_id}:
 *  post:
 *   tags:
 *      - User
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
 *           example: {password : "your password"}
 *   responses:
 *     200:
 *       description: login in and get JWT token
 *       content:
 *         application/json:
 *           schema:
 *             type: json
 *             example: {token : "your token"}
 *     500:
 *       description: Internal server error
 */
router.post("/:customer_id", async (req, res,next) => {
  const customer_id = req.params.customer_id;
  const password = req.body.password;
  const customer = await getUserByCId(customer_id);
  if (!customer) {
    res.sendStatus(404);
    return;
  }
  if (!(await isCorrectPassword(customer_id, password, next))) {
    res.json(null);
    return;
  }
  const token = generateJWT(customer);
  res.json({ token });
});

export default router;