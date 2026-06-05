import express from "express";

import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
  exportExpenses,
} from "../controllers/expenseController.js";

import { validateExpense } from "../middleware/validateExpense.js";

const router = express.Router();

// Specific routes first
router.get("/summary", getSummary);
router.get("/export", exportExpenses);

// General routes
router.get("/", getAllExpenses);
router.post("/", validateExpense, createExpense);

// ID-based routes (must be after specific routes)
router.get("/:id", getExpenseById);
router.put("/:id", validateExpense, updateExpense);
router.delete("/:id", deleteExpense);

export default router;
