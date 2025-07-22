import Credit from "../models/Credit.js";

export const createCreditAccount = (req, res) => {
  const newUser = req.body;
  const creditAcc = {
    credit_card_no: String((Math.random() * 1000000000000000).toFixed(0)),
    userCustomerId: newUser.customer_id,
    balence: 0,
    type: "Visa",
  };
  Credit.create(creditAcc);
};

export const getCreditAccountWithCustomerId = (customer_id)=>{
  return Credit.findOne({
    where: { userCustomerId: customer_id },
  });
}

export const depositToCreditAcc = async (customer_id, ammount) => {
  const creditAcc = await Credit.findOne({
    where: { userCustomerId: customer_id },
  });
  creditAcc.balence += ammount;
  return creditAcc.save();
};
