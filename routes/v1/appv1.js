import express from "express";

import setupSwagger from "../../config/swagger.js";
import sequelize from "../../config/database.js";

import userRouter from "./users.js";
import savingRouter from "./saving.js";
import currentRouter from "./current.js";
import creditRouter from "./credit.js";
import statementRouter from "./statement.js";
import logger from "../../config/logger.js";
import errorHandler from "../../middleware/errorHandler.js";


const app = express.Router();
setupSwagger(app);
app.use(errorHandler)
// -----db -----
try {
  sequelize.authenticate();
  logger.info("DB connected");
} catch (error) {
  logger.error("Error: " + error);
}

//-----------routers--------------
app.use("/users", userRouter);
app.use("/saving", savingRouter);
app.use("/current", currentRouter);
app.use("/credit", creditRouter);
app.use("/statements", statementRouter);

export default app;