import logger from "../config/logger.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    if (await User.findByPk(newUser.customer_id)) {
      return null;
    }
    newUser.password = await bcrypt.hash(newUser.password, 12);
    return User.create(newUser);
  } catch (error) {
    logger.error("Error: " + error);
  }
};


