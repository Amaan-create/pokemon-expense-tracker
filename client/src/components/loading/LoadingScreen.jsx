import { motion } from "framer-motion";

function LoadingScreen() {
  const pokeBallVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  const textVariants = {
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-red-600 flex items-center justify-center overflow-hidden border-8 border-black">
      {/* Retro scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-repeat"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Pokéball */}
        <motion.div
          className="mb-8"
          variants={pokeBallVariants}
          initial="initial"
          animate="animate"
        >
          <div className="w-32 h-32 relative border-4 border-black">
            {/* Top half */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 border-b-4 border-black" />
            {/* Bottom half */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white border-t-4 border-black" />
            {/* Center circle */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-none border-4 border-white"
              variants={pulseVariants}
              animate="animate"
            />
            {/* Middle line */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-black transform -translate-y-1/2" />
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          variants={textVariants}
          animate="animate"
        >
          <h1 className="text-4xl font-black text-black drop-shadow-lg mb-2 tracking-wider">
            POKEWALLET
          </h1>
          <p className="text-lg text-black drop-shadow-md mb-4 font-bold tracking-wide">
            LOADING...
          </p>
          <div className="flex items-center justify-center gap-3">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-black text-3xl font-black"
            >
              ■
            </motion.span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
              className="text-black text-3xl font-black"
            >
              ■
            </motion.span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
              className="text-black text-3xl font-black"
            >
              ■
            </motion.span>
          </div>
        </motion.div>

        {/* Electric effect */}
        <motion.div
          className="absolute top-10 right-10 text-yellow-400 text-5xl font-black"
          animate={{
            opacity: [0, 1, 0],
            y: [-10, -20, -30],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ⚡
        </motion.div>
      </div>
    </div>
  );
}

export default LoadingScreen;
