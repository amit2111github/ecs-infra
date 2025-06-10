import { Pool } from "pg";
import {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} from "../env.js";

export const pool = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  port: POSTGRES_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});
