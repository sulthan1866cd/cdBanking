import Statement from "../models/Statement.js";

export const findAllStatementsByObj = (obj) => {
  return Statement.findAll({ where: obj });
};