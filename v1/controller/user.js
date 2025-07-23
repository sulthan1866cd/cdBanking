import logger from "../config/logger.js";
import bcrypt from "bcrypt";
import { createUser, getUserByCId } from "../services/user.js";

export const setAndCreateUser = async (req, res) => {
  try {
    const newUser = req.body;
    if (await getUserByCId(newUser.customer_id)) {
      return null;
    }
    newUser.password = await bcrypt.hash(newUser.password, 12);
    return createUser(newUser);
  } catch (error) {
    logger.error("Error: " + error);
  }
};
