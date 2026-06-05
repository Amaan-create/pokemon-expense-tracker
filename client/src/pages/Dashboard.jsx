import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import SummaryCards from "../components/dashboard/SummaryCards";
import ExpenseTable from "../components/expense/ExpenseTable";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import LoadingScreen from "../components/loading/LoadingScreen";
import FilterPanel from "../components/expense/FilterPanel";
import EditExpenseModal from "../components/expense/EditExpenseModal";

import { useExpenses } from "../hooks/useExpenses";
import { useSummary } from "../hooks/useSummary";
import { useDeleteExpense } from "../hooks/useExpenses";
import api from "../services/api";

function Dashboard() {
  const [showLoading, setShowLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: expensesData, isLoading: expensesLoading } = useExpenses();
  const { data: summaryData, isLoading: summaryLoading } = useSummary();
  const deleteMutation = useDeleteExpense();

  useEffect(() => {
    // Show loading screen for 2 seconds on mount
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const expenses = expensesData?.data || [];
  const summary = summaryData?.data || {};

  // Get unique categories from expenses
  const categories = useMemo(() => {
    const cats = [...new Set(expenses.map((exp) => exp.category))];
    return cats.sort();
  }, [expenses]);

  // Filter expenses based on active filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (filters.category && expense.category !== filters.category) {
        return false;
      }
      if (filters.startDate && expense.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && expense.date > filters.endDate) {
        return false;
      }
      return true;
    });
  }, [expenses, filters]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleExport = async () => {
    try {
      const response = await api.get("/expenses/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `expenses-${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export expenses:", error);
      alert("Failed to export expenses. Please try again.");
    }
  };

  // Show loading screen
  if (showLoading) {
    return <LoadingScreen />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pb-0">
      <Navbar />

      <motion.div
        className="w-full px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with decoration */}
        <motion.div
          className="mb-0 p-6 bg-yellow-400 border-8 border-black"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4">
            <span className="text-6xl">🎮</span>
            <div>
              <h1 className="text-4xl font-black text-black drop-shadow-lg tracking-wider">
                WELCOME TRAINER
              </h1>
              <p className="text-black font-bold drop-shadow-md tracking-wide">
                MASTER YOUR EXPENSES
              </p>
            </div>
          </div>
        </motion.div>

        {/* Expense Form */}
        <motion.div variants={itemVariants}>
          <ExpenseForm
            onSuccess={() =>
              setFilters({ category: "", startDate: "", endDate: "" })
            }
          />
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={itemVariants}>
          <SummaryCards summary={summary} />
        </motion.div>

        {/* Charts and Data */}
        <motion.div
          className="grid lg:grid-cols-2 gap-0 mb-0"
          variants={itemVariants}
        >
          <ExpensePieChart data={summary.categoryTotals || []} />

          {/* Fun Stats Box */}
          <motion.div className="bg-orange-500 p-6 border-8 border-black shadow-lg">
            <h2 className="text-2xl font-black text-white drop-shadow-md mb-6 tracking-wider">
              💎 STATS
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-black/40 p-4 border-4 border-black">
                <span className="text-white font-black tracking-wider">
                  CAUGHT:
                </span>
                <span className="text-3xl font-black text-yellow-300">
                  {expenses.length}
                </span>
              </div>
              <div className="flex justify-between items-center bg-black/40 p-4 border-4 border-black">
                <span className="text-white font-black tracking-wider">
                  AVG:
                </span>
                <span className="text-3xl font-black text-yellow-300">
                  ₹
                  {expenses.length > 0
                    ? Math.round(summary?.totalSpentThisMonth / expenses.length)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between items-center bg-black/40 p-4 border-4 border-black">
                <span className="text-white font-black tracking-wider">
                  LVL:
                </span>
                <span className="text-3xl font-black text-yellow-300">
                  ⭐ {Math.min(10, Math.ceil(expenses.length / 3))}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filter Panel */}
        <motion.div variants={itemVariants}>
          <FilterPanel onFilterChange={setFilters} categories={categories} />
        </motion.div>

        {/* Expenses Table with Export Button */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-0 bg-black border-4 border-yellow-400 p-4">
            <p className="text-white font-black text-lg tracking-wider">
              SHOWING: {filteredExpenses.length} / {expenses.length}
            </p>
            <motion.button
              onClick={handleExport}
              className="bg-emerald-500 text-black px-6 py-3 font-black border-6 border-black shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📥 EXPORT
            </motion.button>
          </div>
          <ExpenseTable
            expenses={filteredExpenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </motion.div>
      </motion.div>

      {/* Edit Modal */}
      <EditExpenseModal
        expense={editingExpense}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          setIsEditModalOpen(false);
          setEditingExpense(null);
        }}
      />
    </div>
  );
}

export default Dashboard;
