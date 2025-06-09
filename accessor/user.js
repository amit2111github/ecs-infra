import { pool } from "../client/pg.js";

export const addUser =async ({ email, name, password }) => {
  try {
    console.log(email , name , password);
    await pool.query(`INSERT INTO users (name , email , password) values ($1,$2,$3)`,[name , email , password]);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
