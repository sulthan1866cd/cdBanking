import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { findAllStatementsByObj } from "../services/statement.js";

const router = express.Router();


/**
 * @openapi
 * /api/v1/statements/{customer_id}/{account}:
 *  get:
 *   security:
 *     - authorization: []
 *   tags:
 *     - Statements
 *   summary: get transaction statements
 *   parameters:
 *   - name: customer_id
 *     in: path
 *     required: true
 *     description: unique id for customer
 *   - name: account
 *     in: path
 *     required: true
 *     description: account type
 *     example: saving / credit / current
 *   responses:
 *     200:
 *       description: user acc details
 *       content:
 *         application/json:
 *           schema:
 *             type: json
 *             example: [{"transaction_no": 2,"account": "saving","description": "remarks","ammount": 100,"closing_balence": 200,"createdAt": "2025-07-20","updatedAt": "2025-07-20","userCustomerId": "cid"},{},{} ]
 *     401:
 *       description: un authorization
 *     500:
 *       description: Internal server error
 */
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
