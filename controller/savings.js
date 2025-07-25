import {
  createSavingsAccount,
  getSavingsAccountWithCustomerId,
  updateSavingsAccount,
} from "../services/saving.js";
import { ifscs } from "../util/ifsc.js";

export const setAndCreateSavingsAccount = (req, res, next) => {
  const newUser = req.body;
  const branch = newUser.branch;
  const min = 100000000000000;
  const max = 999999999999999;
  const savingsAcc = {
    savings_acc_no: (Math.random() * (max - min) + min).toFixed(0),
    userCustomerId: newUser.customer_id,
    balence: 0,
    branch: branch || "Aruppukottai",
    ifsc: ifscs[branch] || "CDBL1010",
  };
  try {
    createSavingsAccount(savingsAcc);
  } catch (error) {
    next(error);
  }
};

export const depositToSavingsAcc = async (customer_id, ammount, next) => {
  try {
    const savingsAcc = await getSavingsAccountWithCustomerId(customer_id);
    savingsAcc.balence += ammount;
    return updateSavingsAccount(savingsAcc);
  } catch (error) {
    next(error);
  }
};
