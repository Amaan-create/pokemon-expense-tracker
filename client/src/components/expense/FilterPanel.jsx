import { motion } from "framer-motion";
import { useState } from "react";

function FilterPanel({ onFilterChange, categories }) {
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const emptyFilters = {
      category: "",
      startDate: "",
      endDate: "",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="bg-blue-600 p-6 mb-0 border-8 border-black shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-black text-white drop-shadow-md mb-6 tracking-wider">
        🔍 FILTER
      </h2>

      <div className="grid md:grid-cols-4 gap-0">
        <motion.select
          value={filters.category}
          onChange={(e) =>
            handleFilterChange({
              ...filters,
              category: e.target.value,
            })
          }
          className="bg-white p-3 font-bold text-black border-4 border-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">ALL</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </motion.select>

        <motion.input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            handleFilterChange({
              ...filters,
              startDate: e.target.value,
            })
          }
          className="bg-white p-3 font-bold text-black border-4 border-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          whileFocus={{ scale: 1.02 }}
          placeholder="Start Date"
        />

        <motion.input
          type="date"
          value={filters.endDate}
          onChange={(e) =>
            handleFilterChange({
              ...filters,
              endDate: e.target.value,
            })
          }
          className="bg-white p-3 font-bold text-black border-4 border-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          whileFocus={{ scale: 1.02 }}
          placeholder="End Date"
        />

        <motion.button
          type="button"
          onClick={handleReset}
          className="bg-red-500 text-white px-6 py-3 font-black border-6 border-black shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 RESET
        </motion.button>
      </div>

      {(filters.category || filters.startDate || filters.endDate) && (
        <motion.div
          className="mt-4 bg-black/50 p-3 text-white font-bold border-4 border-yellow-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ACTIVE: {filters.category && `${filters.category}`}
          {filters.startDate && ` | ${filters.startDate}`}
          {filters.endDate && ` | ${filters.endDate}`}
        </motion.div>
      )}
    </motion.div>
  );
}

export default FilterPanel;
