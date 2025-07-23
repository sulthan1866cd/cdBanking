import { createStatement } from "../services/statement.js";

export const setAndCreateStatement = (
  userCustomerId,
  description,
  account,
  ammount,
  closing_balence
) => {
  const statement = {
    userCustomerId,
    description,
    account,
    ammount,
    closing_balence,
  };
  createStatement(statement)
};


