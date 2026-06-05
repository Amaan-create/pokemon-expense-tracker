import { motion } from "framer-motion";

function SummaryCards({ summary }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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

  const cards = [
    {
      title: "TOTAL",
      value: `₹${summary?.totalSpentThisMonth || 0}`,
      emoji: "💰",
      bg: "bg-yellow-400",
      borderColor: "border-black",
    },
    {
      title: "MAX",
      value: `₹${summary?.highestExpense?.amount || 0}`,
      emoji: "🔥",
      bg: "bg-red-500",
      borderColor: "border-black",
    },
    {
      title: "CATS",
      value: `${summary?.categoryTotals?.length || 0}`,
      emoji: "📊",
      bg: "bg-blue-500",
      borderColor: "border-black",
    },
  ];

  return (
    <motion.div
      className="grid md:grid-cols-3 gap-0 mb-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`${card.bg} p-6 border-8 ${card.borderColor} shadow-lg transition-shadow`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-black font-black text-lg drop-shadow-md tracking-wider">
              {card.title}
            </h3>
            <span className="text-5xl">{card.emoji}</span>
          </div>

          <motion.p
            className="text-4xl font-black text-black drop-shadow-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {card.value}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default SummaryCards;
