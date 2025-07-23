import Current from "../models/Current.js";

export const getCurrentAccountWithCustomerId = (customer_id) => {
  return Current.findOne({
    where: { userCustomerId: customer_id },
  });
};