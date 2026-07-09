import express from "express";

import login from "../controllers/user_controller.js";

const router = express.Router();

router.post("/login", login);

export default router;
