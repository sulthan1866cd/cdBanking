import express from "express";
import { depositToCreditAcc } from "../controller/credit.js";
import { createStatement } from "../controller/statement.js";
import { verifyToken } from "../middleware/auth.js";
import { getCreditAccountWithCustomerId } from "../services/credit.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/credit/{customer_id}:
 *  get:
 *   tag:
 *      - Get credit
 *   summary: get credit account
 *   parameters:
 *   - name: customer_id
 *     in: path
 *     required: true
 *     description: unique id for customer
 *   - name: authorization
 *     in: header
 *     schema:
 *       type: string
 *       example: Bearer 'your token'
 *   responses:
 *     200:
 *       description: credit acc details
 */
router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const creditAcc = await getCreditAccountWithCustomerId(customer_id);
  res.json(creditAcc);
});

router.put("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const ammount = req.body.ammount;
  const description = req.body.description;
  const creditAcc = await depositToCreditAcc(customer_id, ammount);
  createStatement(
    customer_id,
    description,
    "credit",
    ammount,
    creditAcc.balence
  );
  res.sendStatus(200);
});

export default router;
