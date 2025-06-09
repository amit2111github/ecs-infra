import { pool } from "../client/pg.js";

export const initateTask = async () => {
  return Promise.all([
    pool.query(
      `create table if not exists users (id serial primary key , name text, email text unique , password text)`
    ),
  ]);
};
