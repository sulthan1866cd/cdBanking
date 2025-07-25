import {
  createCreditAccount,
  getCreditAccountWithCustomerId,
  updateCreditAccount,
} from "../services/credit.js";

export const setAndCreateCreditAccount = (req, res, next) => {
  const newUser = req.body;
  const min = 100000000000000;
  const max = 999999999999999;
  const creditAcc = {
    credit_card_no: (Math.random() * (max - min) + min).toFixed(0),
    userCustomerId: newUser.customer_id,
    balence: 0,
    type: "Visa",
  };
  try {
    createCreditAccount(creditAcc);
  } catch (error) {
    next(error);
  }
};

export const depositToCreditAcc = async (customer_id, ammount, next) => {
  try {
    const creditAcc = await getCreditAccountWithCustomerId(customer_id);
    creditAcc.balence += ammount;
    return updateCreditAccount(creditAcc);
  } catch (error) {
    next(error);
  }
};
