import Credit from "../models/Credit.js";

export const getCreditAccountWithCustomerId = (customer_id)=>{
  return Credit.findOne({
    where: { userCustomerId: customer_id },
  });
}