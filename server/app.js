import express from "express";
import rateLimit from "express-rate-limit";

import authRouter from "./routes/auth_route.js";
import userRouter from "./routes/user_route.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

const app = express();
app.use(express.static("../client"));
app.use(express.json());

app.use("/api/auth", limiter, authRouter);

app.use("/api/user", limiter, userRouter);

export default app;
