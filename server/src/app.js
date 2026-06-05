import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Pokemon Expense Tracker API Running",
  });
});

app.use("/api/expenses", expenseRoutes);

export default app;
