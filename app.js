import express from "express";
import cors from "cors";
import { FRONTEND_URL } from "./env.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
const app = express();

app.use(express.json());

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(cookieParser());
app.use("/user",userRouter);
app.use("/auth",authRouter);

export { app };
