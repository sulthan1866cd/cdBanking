import express from "express";
import cors from "cors";

import { configDotenv } from "dotenv";

import v1App from "./v1/appv1.js"

const app = express();
configDotenv();

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  })
);

app.use(express.json());

// -------------------------- v1 ----------------------

app.use('/api/v1',v1App)

app.listen(process.env.PORT);
