import Credit from "../models/Credit.js";

export const createCreditAccount = (creditAcc) => {
  return Credit.create(creditAcc);
};

export const getCreditAccountWithCustomerId = (customer_id) => {
  return Credit.findOne({
    where: { userCustomerId: customer_id },
  });
};

export const updateCreditAccount = (creditAcc) => {
  return creditAcc.save();
};
