import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import { deleteOldData } from "./utils/deleteOldData";
import cron from "node-cron";

const morgan = require("morgan");

dotenv.config();

const app = express();

const csrfProtection = csrf({
  cookie: true,
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));


cron.schedule('0 0 1 * *', () => {
  deleteOldData();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
