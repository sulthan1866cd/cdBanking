import Current from "../models/Current.js";

export const createCurrentAccount = (currentAcc) => {
  return Current.create(currentAcc);
};

export const getCurrentAccountWithCustomerId = (customer_id) => {
  return Current.findOne({
    where: { userCustomerId: customer_id },
  });
};

export const updateCurrentAccount = (currentAcc) => {
  return currentAcc.save();
};
