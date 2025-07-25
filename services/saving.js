import Saving from "../models/Saving.js";

export const createSavingsAccount = (savingsAcc) => {
  return Saving.create(savingsAcc);
};

export const getSavingsAccountWithCustomerId = (customer_id) => {
  return Saving.findOne({
    where: { userCustomerId: customer_id },
  });
};

export const updateSavingsAccount = (savingsAcc) => {
  return savingsAcc.save();
};
