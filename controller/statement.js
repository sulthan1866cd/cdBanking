import { createStatement } from "../services/statement.js";

export const setAndCreateStatement = (
  userCustomerId,
  description,
  account,
  ammount,
  closing_balence,
  next
) => {
  const statement = {
    userCustomerId,
    description,
    account,
    ammount,
    closing_balence,
  };
  try {
    createStatement(statement);
  } catch (error) {
    next(error);
  }
};
