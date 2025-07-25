import bcrypt from "bcrypt";
import { createUser, getUserByCId } from "../services/user.js";

export const setAndCreateUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    if (await getUserByCId(newUser.customer_id)) {
      return null;
    }
    newUser.password = await bcrypt.hash(newUser.password, 12);
    return createUser(newUser);
  } catch (error) {
    next(error);
  }
};

export const isCorrectPassword = async (customer_id, password, next) => {
  try {
    const customer = await getUserByCId(customer_id);
    const isMatch = bcrypt.compare(password, customer.password);
    return isMatch;
  } catch (error) {
    next(error);
  }
};
