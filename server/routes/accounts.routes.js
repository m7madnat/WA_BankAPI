import express from "express";
import {
  depositToAccount,
  getAccountById,
  getAllAccounts,
  transfer,
  updateCredit,
  withdrawFromAccount,
} from "../controllers/accounts.controllers.js";

export const router = express.Router();

router.get("/", getAllAccounts);
router.get("/:accountId", getAccountById);
router.put("/credit", updateCredit);
router.put("/deposit", depositToAccount);
router.put("/withdraw", withdrawFromAccount);
router.put("/transfer", transfer);
