import Saving from "../models/Saving.js";

export const getSavingsAccountWithCustomerId = (customer_id) => {
  return Saving.findOne({
    where: { userCustomerId: customer_id },
  });
};