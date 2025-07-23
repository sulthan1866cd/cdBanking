import Statement from "../models/Statement.js";

export const createStatement = (statement) => {
  return Statement.create(statement);
};

export const findAllStatementsByObj = (obj) => {
  return Statement.findAll({ where: obj });
};
