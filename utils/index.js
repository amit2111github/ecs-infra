import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env.js";

export const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

export const getJwtToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};


export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { payload };
  } catch (err) {
    return { error: err };
  }
};

export const formatError = (error) => {
  if(!error.issues) return [];
  return error.issues?.map((e) => ({
    path: e.path.join("."),
    message: e.message,
  }))
}