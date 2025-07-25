import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  res.status(500).send("Somthing went wrong");
};

export default errorHandler;
