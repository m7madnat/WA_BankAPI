import express from "express";

import { router as usersRouter } from "./users.routes.js";
import { router as accountsRouter } from "./accounts.routes.js";

export const router = express.Router();

router.use("/users", usersRouter);
router.use("/accounts", accountsRouter);
