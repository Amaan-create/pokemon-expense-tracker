import { motion } from "framer-motion";

function ExpenseTable({ expenses, onDelete, onEdit }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const categoryEmojis = {
    Food: "🍕",
    Transport: "🚗",
    Bills: "💳",
    Entertainment: "🎮",
    Other: "📦",
  };

  return (
    <motion.div
      className="bg-purple-600 p-6 overflow-auto border-8 border-black shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-black text-white drop-shadow-md mb-6 tracking-wider">
        📋 EXPENSES
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-4 border-yellow-400 bg-purple-800">
              <th className="text-left p-4 text-white font-black border-r-4 border-yellow-400 tracking-wider">
                AMOUNT
              </th>
              <th className="text-left p-4 text-white font-black border-r-4 border-yellow-400 tracking-wider">
                CATEGORY
              </th>
              <th className="text-left p-4 text-white font-black border-r-4 border-yellow-400 tracking-wider">
                DATE
              </th>
              <th className="text-left p-4 text-white font-black border-r-4 border-yellow-400 tracking-wider">
                NOTE
              </th>
              <th className="text-left p-4 text-white font-black tracking-wider">
                ACT
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses?.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-white text-xl border-4 border-black"
                >
                  NO EXPENSES YET 🎯
                </td>
              </tr>
            ) : (
              expenses?.map((expense, index) => (
                <motion.tr
                  key={expense.id}
                  className="border-b-4 border-black hover:bg-purple-700 transition-colors"
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="p-4 text-white font-bold border-r-2 border-purple-800">
                    ₹{expense.amount}
                  </td>
                  <td className="p-4 text-white border-r-2 border-purple-800">
                    <span className="text-2xl">
                      {categoryEmojis[expense.category] || "📌"}
                    </span>{" "}
                    {expense.category}
                  </td>
                  <td className="p-4 text-white border-r-2 border-purple-800 font-mono">
                    {expense.date}
                  </td>
                  <td className="p-4 text-white text-sm max-w-xs truncate border-r-2 border-purple-800">
                    {expense.note || "-"}
                  </td>
                  <td className="p-4 flex gap-2">
                    <motion.button
                      onClick={() => onEdit(expense)}
                      className="bg-blue-600 text-white px-3 py-2 font-bold border-4 border-black text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Edit"
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      onClick={() => onDelete(expense.id)}
                      className="bg-red-600 text-white px-3 py-2 font-bold border-4 border-black text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Delete"
                    >
                      ✕
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ExpenseTable;
