import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Saving from "../models/Saving.js";
import Current from "../models/Current.js";
import Credit from "../models/Credit.js";

const router = express.Router();
router.get('/',async (req,res)=>{
    res.json(await User.findAll())
})

const ifscs = {
  "Ashok Nagar": "CDBL0009",
  Aruppukottai: "CDBL1010",
  "Gandhi Nagar": "CDBL0032",
};
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    if (await User.findByPk(newUser.customer_id)) {
      res.sendStatus(500);
      return;
    }
    newUser.password = await bcrypt.hash(newUser.password, 12);
    const branch = newUser.branch;
    delete newUser.branch;
    User.create(newUser);

    const savingsAcc = {
      savings_acc_no: String((Math.random() * 1000000000).toFixed(0)),
      userCustomerId:newUser.customer_id,
      balence: 0,
      branch: branch,
      ifsc: ifscs[branch],
    };
    Saving.create(savingsAcc);
    const currentAcc = {
      current_acc_no: String((Math.random() * 1000000000).toFixed(0)),
      userCustomerId:newUser.customer_id,
      balence: 0,
      branch: branch,
      ifsc: ifscs[branch],
    };
    Current.create(currentAcc);
    const creditAcc = {
      credit_card_no: String((Math.random() * 1000000000000000).toFixed(0)),
      userCustomerId:newUser.customer_id,
      balence: 0,
      type: "Visa",
    };
    Credit.create(creditAcc);
    res.sendStatus(201);
  } catch (error) {
    console.log("Error: " + error);
  }
});

router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const customer = await User.findByPk(customer_id);
  res.json(customer);
});

router.put("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const password = req.body.password;
  const customer = await User.findByPk(customer_id);
  if (!customer) {
    res.sendStatus(404);
  } else
    bcrypt.compare(password, customer.password, (err, isMatch) => {
      if (err) res.sendStatus(500);
      if (!isMatch) {
        res.json(null);
      } else {
        res.send({ customer_id });
      }
    });
});

export default router;
