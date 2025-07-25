import express from "express";
import { depositToSavingsAcc } from "../../controller/savings.js";
import { setAndCreateStatement } from "../../controller/statement.js";
import { verifyToken } from "../../middleware/auth.js";
import { getSavingsAccountWithCustomerId } from "../../services/saving.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/saving/{customer_id}:
 *  get:
 *   security:
 *      - authorization: []
 *   tags:
 *      - Savings
 *   summary: get saving account
 *   parameters:
 *   - name: customer_id
 *     in: path
 *     required: true
 *     description: unique id for customer
 *   responses:
 *     200:
 *       description: saving acc details
 *       content:
 *         application/json:
 *           schema:
 *             type: json
 *             example: {"saving_card_no": "111111111","balence": 100,"type": "Visa","createdAt": "2025-07-20","updatedAt": "2025-07-22","userCustomerId": "cid"}
 *     401:
 *       description: un authorization
 *     500:
 *       description: Internal server error
 */
router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const savingsAcc = await getSavingsAccountWithCustomerId(customer_id);
  res.json(savingsAcc);
});

/**
 * @openapi
 * /api/v1/saving/{customer_id}:
 *  put:
 *   security:
 *      - authorization: []
 *   tags:
 *      - Savings
 *   summary: deposit / witdraw from saving account
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
 *           example: {ammount: 100 , description: 'remarks'}
 *   responses:
 *     200:
 *       description: transaction successful
 *     401:
 *       description: un authorization
 *     500:
 *       description: Internal server error
 */
router.put("/:customer_id", verifyToken, async (req, res, next) => {
  const customer_id = req.params.customer_id;
  const ammount = req.body.ammount;
  const description = req.body.description;
  const savingsAcc = await depositToSavingsAcc(customer_id, ammount, next);
  setAndCreateStatement(
    customer_id,
    description,
    "saving",
    ammount,
    savingsAcc.balence,
    next
  );
  res.sendStatus(200);
});

export default router;
