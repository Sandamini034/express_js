import express from "express";

import authRouter from "./routes/auth_route.js";
import userRouter from "./routes/user_route.js";

const app = express();
app.use(express.static("../client"));
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

export default app;
