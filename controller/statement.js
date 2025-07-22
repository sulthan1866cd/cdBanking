import Statement from "../models/Statement.js";

export const createStatement = (
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
  Statement.create(statement);
};

export const findAllStatementsByObj = (obj) => {
  return Statement.findAll({ where: obj });
};
