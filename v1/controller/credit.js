import { createCreditAccount, getCreditAccountWithCustomerId, updateCreditAccount } from "../services/credit.js";

export const setAndCreateCreditAccount = (req, res) => {
  const newUser = req.body;
  const creditAcc = {
    credit_card_no: String((Math.random() * 1000000000000000).toFixed(0)),
    userCustomerId: newUser.customer_id,
    balence: 0,
    type: "Visa",
  };
  createCreditAccount(creditAcc);
};

export const depositToCreditAcc = async (customer_id, ammount) => {
  const creditAcc = await getCreditAccountWithCustomerId(customer_id)
  creditAcc.balence += ammount;
  return updateCreditAccount(creditAcc)
};
