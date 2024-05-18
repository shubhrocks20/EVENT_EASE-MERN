import express from "express";
import { ErrorHandler } from "./middlewares/index.js";
import { DB_URL, PORT } from "./config/index.js";
import { Router } from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", Router);
app.use(ErrorHandler);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((error) => {
    console.log(`Error While Connecting to Mongo:${error}`);
  });
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
