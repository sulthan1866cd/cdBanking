import Saving from "../models/Saving.js";
import { ifscs } from "../util/ifsc.js";

export const createSavingsAccount = (req, res) => {
  const newUser = req.body;
  const branch = newUser.branch;
  const savingsAcc = {
    savings_acc_no: String((Math.random() * 1000000000).toFixed(0)),
    userCustomerId: newUser.customer_id,
    balence: 0,
    branch,
    ifsc: ifscs[branch],
  };
  Saving.create(savingsAcc);
};



export const depositToSavingsAcc = async (customer_id, ammount) => {
  const savingsAcc = await Saving.findOne({
    where: { userCustomerId: customer_id },
  });
  savingsAcc.balence += ammount;
  return savingsAcc.save();
};
