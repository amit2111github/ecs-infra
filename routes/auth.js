import express from "express";
import { signInUser } from "../controller/auth.js";

const router = express.Router();

router.post("/signin" , signInUser);
// router.post("/signout" , createUser)
export default router;