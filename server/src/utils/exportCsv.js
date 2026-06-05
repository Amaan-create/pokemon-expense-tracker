export const convertToCSV = (expenses) => {
  const headers = ["Amount", "Category", "Date", "Note"];

  const rows = expenses.map((expense) => [
    expense.amount,
    expense.category,
    expense.date,
    expense.note || "",
  ]);

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};
