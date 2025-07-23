import {
  createSavingsAccount,
  getSavingsAccountWithCustomerId,
  updateSavingsAccount,
} from "../services/saving.js";
import { ifscs } from "../util/ifsc.js";

export const setAndCreateSavingsAccount = (req, res) => {
  const newUser = req.body;
  const branch = newUser.branch;
  const savingsAcc = {
    savings_acc_no: String((Math.random() * 1000000000).toFixed(0)),
    userCustomerId: newUser.customer_id,
    balence: 0,
    branch,
    ifsc: ifscs[branch],
  };
  createSavingsAccount(savingsAcc);
};

export const depositToSavingsAcc = async (customer_id, ammount) => {
  const savingsAcc = await getSavingsAccountWithCustomerId(customer_id)
  savingsAcc.balence += ammount;
  return updateSavingsAccount(savingsAcc);
};
