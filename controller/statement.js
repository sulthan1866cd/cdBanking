import Statement from "../models/Statement.js";

export const createStatement = (
  customer_id,
  description,
  account,
  amount,
  closing_balence
) => {
  const statement = {
    customer_id,
    description,
    account,
    amount,
    closing_balence,
  };
  Statement.create(statement);
};

export const findAllStatementsByObj = (obj) => {
  return Statement.findAll({ where: obj });
};
