import {
  createCurrentAccount,
  getCurrentAccountWithCustomerId,
  updateCurrentAccount,
} from "../services/current.js";
import { ifscs } from "../util/ifsc.js";

export const setAndCreateCurrentAccount = (req, res, next) => {
  const newUser = req.body;
  const branch = newUser.branch;
  const min = 100000000000000;
  const max = 999999999999999;
  const currentAcc = {
    current_acc_no: (Math.random() * (max - min) + min).toFixed(0),
    userCustomerId: newUser.customer_id,
    balence: 0,
    branch: branch || "Aruppukottai",
    ifsc: ifscs[branch] || "CDBL1010",
  };
  try {
    createCurrentAccount(currentAcc);
  } catch (error) {
    next(error);
  }
};

export const depositToCurrentAcc = async (customer_id, ammount, next) => {
  try {
    const currentAcc = await getCurrentAccountWithCustomerId(customer_id);
    currentAcc.balence += ammount;
    return updateCurrentAccount(currentAcc);
  } catch (error) {
    next(error);
  }
};
