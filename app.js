import express from "express";
import cors from "cors";

import { configDotenv } from "dotenv";
import sequelize from "./config/database.js";

import userRouter from "./routes/users.js";
import savingRouter from "./routes/saving.js";
import currentRouter from "./routes/current.js";
import creditRouter from "./routes/credit.js";
import statementRouter from "./routes/statement.js";

const app = express();
configDotenv();

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  })
);

app.use(express.json());

// -------------------------- v1 ----------------------

const v1App = express.Router()
app.use('/api/v1',v1App)
// app.use((req,res,next)=>{
  
// })

// -----db -----
try {
  sequelize.authenticate();
  console.log("DB connected");
} catch (error) {
  console.log("Error: " + error);
}

//-----------routers--------------
v1App.use("/users", userRouter);
v1App.use("/saving", savingRouter);
v1App.use("/current", currentRouter);
v1App.use("/credit", creditRouter);
v1App.use("/statements", statementRouter);

// app.get("/", (req, res) => {
//   res.json({ name: "hello" });
// });

app.listen(process.env.PORT);
