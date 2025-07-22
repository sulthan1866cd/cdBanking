import { configDotenv } from "dotenv";
import jsonwebtoken from "jsonwebtoken";
configDotenv();

export const generateJWT = (user) => {
  return jsonwebtoken.sign(user.toJSON(), process.env.JWT_SECTERT_KEY);
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }
  const token = authHeader.split(" ")[1];
  jsonwebtoken.verify(token, process.env.JWT_SECTERT_KEY, (err, user) => {
    if (err) {
      res.sendStatus(401);
      return;
    }
    next();
  });
};
