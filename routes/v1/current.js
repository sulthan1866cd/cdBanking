import express from "express";
import { depositToCurrentAcc } from "../../controller/current.js";
import { setAndCreateStatement } from "../../controller/statement.js";
import { verifyToken } from "../../middleware/auth.js";
import { getCurrentAccountWithCustomerId } from "../../services/current.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/current/{customer_id}:
 *  get:
 *   security:
 *      - authorization: []
 *   tags:
 *      - Current
 *   summary: get current account     
 *   parameters:
 *   - name: customer_id
 *     in: path
 *     required: true
 *     description: unique id for customer
 *   responses:
 *     200:
 *       description: current acc details
 *       content:
 *         application/json:
 *           schema:
 *             type: json
 *             example: {"current_card_no": "111111111","balence": 100,"type": "Visa","createdAt": "2025-07-20","updatedAt": "2025-07-22","userCustomerId": "cid"}
 *     401:
 *       description: un authorization
 *     500:
 *       description: Internal server error
 */
router.get("/:customer_id", verifyToken, async (req, res) => {
  const customer_id = req.params.customer_id;
  const currentAcc = await getCurrentAccountWithCustomerId(customer_id);
  res.json(currentAcc);
});

/**
 * @openapi
 * /api/v1/current/{customer_id}:
 *  put:
 *   security:
 *      - authorization: []
 *   tags:
 *      - Current
 *   summary: deposit / witdraw from current account
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
  const currentAcc = await depositToCurrentAcc(customer_id, ammount, next);
  
  setAndCreateStatement(
    customer_id,
    description,
    "current",
    ammount,
    currentAcc.balence,
    next
  );
  res.sendStatus(200);
});

export default router;
