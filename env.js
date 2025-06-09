import { configDotenv } from "dotenv";

configDotenv();
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const JWT_SECRET = process.env.JWT_SECRET;