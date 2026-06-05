import { z } from "zod";

const expenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),

  category: z.string().min(1, "Category required"),

  date: z.string().refine((value) => new Date(value) <= new Date(), {
    message: "Future dates are not allowed",
  }),

  note: z.string().optional(),
});

export const validateExpense = (req, res, next) => {
  try {
    req.body = expenseSchema.parse(req.body);

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      errors: error.issues,
    });
  }
};
