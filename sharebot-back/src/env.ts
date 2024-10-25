import dotenv from "dotenv";

if (process.cwd().endsWith("/src")) {
  // process running from src folder
  dotenv.config({ path: "../.env" });
} else {
  dotenv.config();
}


export const env = {
  // config
  STAGE: process.env.STAGE || "dev",
  ENGINE_URL: process.env.ENGINE_URL || "http://localhost:6010",
  ACCOUNT_SECRET: process.env.ACCOUNT_SECRET || "account_secret",
  USER_SECRET: process.env.USER_SECRET || "user_secret",
  SYSTEM_SECRET: process.env.SYSTEM_SECRET || "system_secret",
  // DB config
  DB_USER: process.env.DB_USER || "",
  DB_PASS: process.env.DB_PASS || "",
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: process.env.DB_PORT || "5432",
  DB_NAME: process.env.DB_NAME || "",
  DB_NAME_DEV: process.env.DB_NAME_DEV || "",
  // aws
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_KEY_ID: process.env.AWS_SECRET_KEY_ID || "",
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
  // nodemailer
  GMAIL_MAIL: process.env.GMAIL_MAIL || "",
  GMAIL_PASS: process.env.GMAIL_PASS || "",
};


