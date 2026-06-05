import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useUpdateExpense } from "../../hooks/useExpenses";

function EditExpenseModal({ expense, isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const updateMutation = useUpdateExpense();

  useEffect(() => {
    if (expense && isOpen) {
      setForm({
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        note: expense.note || "",
      });
      setErrors({});
    }
  }, [expense, isOpen]);

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
      await updateMutation.mutateAsync({
        id: expense.id,
        expense: {
          amount: parseFloat(form.amount),
          category: form.category,
          date: form.date,
          note: form.note || null,
        },
      });

      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-purple-600 to-blue-700 p-8 rounded-2xl border-4 border-black shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-black text-white drop-shadow-md mb-6">
                ✏️ Edit Expense
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-bold block mb-2">
                    Amount (₹)
                  </label>
                  <motion.input
                    type="number"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) => {
                      setForm({ ...form, amount: e.target.value });
                      if (errors.amount) setErrors({ ...errors, amount: "" });
                    }}
                    className={`w-full bg-white/90 p-3 rounded-lg font-semibold text-black border-2 focus:outline-none focus:ring-2 ${
                      errors.amount
                        ? "border-red-500 focus:ring-red-300"
                        : "border-black focus:ring-yellow-300"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.amount && (
                    <p className="text-red-200 text-sm mt-1 font-bold">
                      {errors.amount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">
                    Category
                  </label>
                  <motion.select
                    value={form.category}
                    onChange={(e) => {
                      setForm({ ...form, category: e.target.value });
                      if (errors.category)
                        setErrors({ ...errors, category: "" });
                    }}
                    className={`w-full bg-white/90 p-3 rounded-lg font-semibold text-black border-2 focus:outline-none focus:ring-2 ${
                      errors.category
                        ? "border-red-500 focus:ring-red-300"
                        : "border-black focus:ring-yellow-300"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select Category</option>
                    <option value="Food">🍕 Food</option>
                    <option value="Transport">🚗 Transport</option>
                    <option value="Bills">💳 Bills</option>
                    <option value="Entertainment">🎮 Entertainment</option>
                    <option value="Other">📦 Other</option>
                  </motion.select>
                  {errors.category && (
                    <p className="text-red-200 text-sm mt-1 font-bold">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">
                    Date
                  </label>
                  <motion.input
                    type="date"
                    value={form.date}
                    onChange={(e) => {
                      setForm({ ...form, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: "" });
                    }}
                    className={`w-full bg-white/90 p-3 rounded-lg font-semibold text-black border-2 focus:outline-none focus:ring-2 ${
                      errors.date
                        ? "border-red-500 focus:ring-red-300"
                        : "border-black focus:ring-yellow-300"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.date && (
                    <p className="text-red-200 text-sm mt-1 font-bold">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-white font-bold block mb-2">
                    Note (Optional)
                  </label>
                  <motion.textarea
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full bg-white/90 p-3 rounded-lg font-semibold text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    rows="3"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>

              {updateMutation.error && (
                <div className="mt-4 bg-red-500/80 p-3 rounded-lg text-white font-bold">
                  Error: {updateMutation.error.message}
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-black border-4 border-black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-70 text-black px-6 py-3 rounded-xl font-black border-4 border-black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {updateMutation.isPending ? "⚡ Saving..." : "💾 Save"}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EditExpenseModal;
