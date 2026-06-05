import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#dc2626", "#fbbf24", "#3b82f6", "#8b5cf6", "#ec4899"];

function ExpensePieChart({ data }) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const categoryEmojis = {
    Food: "🍕",
    Transport: "🚗",
    Bills: "💳",
    Entertainment: "🎮",
    Other: "📦",
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/95 p-3 border-4 border-yellow-400">
          <p className="text-white font-black text-sm">
            {categoryEmojis[payload[0].name] || "📌"} {payload[0].name}
          </p>
          <p className="text-yellow-300 font-black">₹{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="bg-indigo-700 p-6 h-[400px] border-8 border-black shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-black text-white drop-shadow-md mb-4 tracking-wider">
        📊 BREAKDOWN
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            outerRadius={100}
            innerRadius={40}
            paddingAngle={2}
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.95)",
              border: "4px solid #fbbf24",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default ExpensePieChart;
