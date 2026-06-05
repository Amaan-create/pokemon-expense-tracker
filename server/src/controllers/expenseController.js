import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { convertToCSV } from "../utils/exportCsv.js";

export const getAllExpenses = (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    let query = `
      SELECT *
      FROM expenses
      WHERE 1=1
    `;

    const params = [];

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    if (startDate) {
      query += " AND date >= ?";
      params.push(startDate);
    }

    if (endDate) {
      query += " AND date <= ?";
      params.push(endDate);
    }

    query += `
      ORDER BY date DESC,
      created_at DESC
    `;

    const expenses = db.prepare(query).all(...params);

    res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const createExpense = (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    const id = uuidv4();

    db.prepare(
      `
      INSERT INTO expenses
      (id, amount, category, date, note)
      VALUES (?, ?, ?, ?, ?)
    `,
    ).run(id, amount, category, date, note || null);

    const expense = db.prepare("SELECT * FROM expenses WHERE id = ?").get(id);

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getExpenseById = (req, res) => {
  try {
    const expense = db
      .prepare("SELECT * FROM expenses WHERE id = ?")
      .get(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateExpense = (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    const result = db
      .prepare(
        `
      UPDATE expenses
      SET amount = ?, category = ?, date = ?, note = ?
      WHERE id = ?
    `,
      )
      .run(amount, category, date, note || null, req.params.id);

    if (!result.changes) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = db
      .prepare("SELECT * FROM expenses WHERE id = ?")
      .get(req.params.id);

    res.json({
      success: true,
      data: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteExpense = (req, res) => {
  try {
    const result = db
      .prepare("DELETE FROM expenses WHERE id = ?")
      .run(req.params.id);

    if (!result.changes) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getSummary = (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);

    const totalSpent = db
      .prepare(
        `
        SELECT COALESCE(SUM(amount),0) as total
        FROM expenses
        WHERE substr(date,1,7)=?
      `,
      )
      .get(currentMonth);

    const categoryTotals = db
      .prepare(
        `
        SELECT category,
               SUM(amount) as total
        FROM expenses
        GROUP BY category
        ORDER BY total DESC
      `,
      )
      .all();

    const highestExpense = db
      .prepare(
        `
        SELECT *
        FROM expenses
        ORDER BY amount DESC
        LIMIT 1
      `,
      )
      .get();

    res.json({
      success: true,
      data: {
        totalSpentThisMonth: totalSpent.total,
        categoryTotals,
        highestExpense: highestExpense || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const exportExpenses = (req, res) => {
  try {
    const expenses = db
      .prepare(
        `
        SELECT *
        FROM expenses
        ORDER BY date DESC
      `,
      )
      .all();

    const csv = convertToCSV(expenses);

    res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");

    res.setHeader("Content-Type", "text/csv");

    res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
