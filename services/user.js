import User from "../models/User.js";

export const createUser = (user)=>{
  return User.create(user)
}

export const getAllUsers = () => {
  return User.findAll();
};

export const getUserByCId = (customer_id) => {
  return User.findByPk(customer_id);
};