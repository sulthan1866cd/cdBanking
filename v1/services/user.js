import User from "../models/User.js";

export const getAllUsers = () => {
  return User.findAll();
};

export const getUserByCId = (customer_id) => {
  return User.findByPk(customer_id);
};