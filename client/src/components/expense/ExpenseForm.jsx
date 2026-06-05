import { useState } from "react";
import { motion } from "framer-motion";
import { useCreateExpense } from "../../hooks/useExpenses";

function ExpenseForm({ onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const createMutation = useCreateExpense();

  const validateForm = () => {
    const newErrors = {};

    if (!form.amount || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!form.category) {
      newErrors.category = "Category is required";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    }

    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      newErrors.date = "Future dates are not allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createMutation.mutateAsync({
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
        note: form.note || null,
      });

      setForm({
        amount: "",
        category: "",
        date: "",
        note: "",
      });
      setErrors({});

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to create expense:", error);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-green-500 p-6 mb-0 border-8 border-black shadow-lg"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-black text-black drop-shadow-md mb-6 tracking-wider">
        🎯 ADD EXPENSE
      </h2>

      <div className="grid md:grid-cols-4 gap-0">
        <div>
          <motion.input
            placeholder="Amount (₹)"
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => {
              setForm({ ...form, amount: e.target.value });
              if (errors.amount) setErrors({ ...errors, amount: "" });
            }}
            className={`w-full bg-white p-3 font-bold text-black placeholder-gray-600 border-4 focus:outline-none focus:ring-2 ${
              errors.amount
                ? "border-red-600 focus:ring-red-300"
                : "border-black focus:ring-yellow-300"
            }`}
            whileFocus={{ scale: 1.02 }}
          />
          {errors.amount && (
            <p className="text-red-800 text-xs mt-1 font-bold">
              {errors.amount}
            </p>
          )}
        </div>

        <div>
          <motion.select
            value={form.category}
            onChange={(e) => {
              setForm({ ...form, category: e.target.value });
              if (errors.category) setErrors({ ...errors, category: "" });
            }}
            className={`w-full bg-white p-3 font-bold text-black border-4 focus:outline-none focus:ring-2 ${
              errors.category
                ? "border-red-600 focus:ring-red-300"
                : "border-black focus:ring-yellow-300"
            }`}
            whileFocus={{ scale: 1.02 }}
          >
            <option value="">SELECT</option>
            <option value="Food">🍕 Food</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Bills">💳 Bills</option>
            <option value="Entertainment">🎮 Entertainment</option>
            <option value="Other">📦 Other</option>
          </motion.select>
          {errors.category && (
            <p className="text-red-800 text-xs mt-1 font-bold">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <motion.input
            type="date"
            value={form.date}
            onChange={(e) => {
              setForm({ ...form, date: e.target.value });
              if (errors.date) setErrors({ ...errors, date: "" });
            }}
            className={`w-full bg-white p-3 font-bold text-black border-4 focus:outline-none focus:ring-2 ${
              errors.date
                ? "border-red-600 focus:ring-red-300"
                : "border-black focus:ring-yellow-300"
            }`}
            whileFocus={{ scale: 1.02 }}
          />
          {errors.date && (
            <p className="text-red-800 text-xs mt-1 font-bold">{errors.date}</p>
          )}
        </div>

        <motion.input
          placeholder="Note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="w-full bg-white p-3 font-bold text-black placeholder-gray-600 border-4 border-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          whileFocus={{ scale: 1.02 }}
        />
      </div>

      {createMutation.error && (
        <div className="mt-4 bg-red-600 p-3 text-white font-bold border-4 border-black">
          ERROR: {createMutation.error.message}
        </div>
      )}

      <motion.button
        type="submit"
        disabled={createMutation.isPending}
        className="mt-4 bg-yellow-400 disabled:opacity-70 text-black px-8 py-3 font-black text-lg border-6 border-black shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={createMutation.isPending ? { rotate: 360 } : {}}
        transition={
          createMutation.isPending
            ? { duration: 0.6, repeat: Infinity }
            : { duration: 0.2 }
        }
      >
        {createMutation.isPending ? "⚡ ADD..." : "✓ ADD"}
      </motion.button>
    </motion.form>
  );
}

export default ExpenseForm;
