import express from "express";
import { createUser } from "../controller/user.js";
import { Authentication } from "../middleware/index.js";

const router = express.Router();

router.post("/signup" , createUser);
router.get("/" , Authentication , (req ,res) => {
    return res.json({success : "ok" , user : req.user});
});
export default router;