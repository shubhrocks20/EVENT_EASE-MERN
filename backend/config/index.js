import dotenv from "dotenv";
dotenv.config();
export const {
  PORT,
  DEBUG,
  DB_URL,
  JWT_SECRET_KEY,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;
