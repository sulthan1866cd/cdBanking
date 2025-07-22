import Current from "../models/Current.js";
import { ifscs } from "../util/ifsc.js";

export const createCurrentAccount = (req, res) => {
  const newUser = req.body;
  const branch = newUser.branch;
  const currentAcc = {
    current_acc_no: String((Math.random() * 1000000000).toFixed(0)),
    userCustomerId: newUser.customer_id,
    balence: 0,
    branch: branch,
    ifsc: ifscs[branch],
  };
  Current.create(currentAcc);
};

export const getCurrentAccountWithCustomerId = (customer_id) => {
  return Current.findOne({
    where: { userCustomerId: customer_id },
  });
};

export const depositToCurrentAcc = async (customer_id, ammount) => {
  const currentAcc = await Current.findOne({
    where: { userCustomerId: customer_id },
  });
  currentAcc.balence += ammount;
  return currentAcc.save();
};
