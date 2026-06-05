import { motion } from "framer-motion";

function Navbar() {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.nav
      className="bg-red-600 border-b-8 border-black px-4 py-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-5xl">🔴</span>
          <div>
            <h1 className="text-2xl font-black text-black drop-shadow-lg">
              POKEWALLET
            </h1>
            <p className="text-xs text-black font-bold drop-shadow-sm tracking-wider">
              CATCH ALL EXPENSES
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-4xl">⚡</span>
          <span className="text-black font-bold text-sm drop-shadow-lg tracking-wide hidden sm:inline">
            TRACKER
          </span>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
