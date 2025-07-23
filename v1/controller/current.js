import {
  createCurrentAccount,
  getCurrentAccountWithCustomerId,
  updateCurrentAccount,
} from "../services/current.js";
import { ifscs } from "../util/ifsc.js";

export const setAndCreateCurrentAccount = (req, res) => {
  const newUser = req.body;
  const branch = newUser.branch;
  const currentAcc = {
    current_acc_no: String((Math.random() * 1000000000).toFixed(0)),
    userCustomerId: newUser.customer_id,
    balence: 0,
    branch: branch,
    ifsc: ifscs[branch],
  };
  createCurrentAccount(currentAcc);
};

export const depositToCurrentAcc = async (customer_id, ammount) => {
  const currentAcc = await getCurrentAccountWithCustomerId(customer_id)
  currentAcc.balence += ammount;
  return updateCurrentAccount(currentAcc);
};
