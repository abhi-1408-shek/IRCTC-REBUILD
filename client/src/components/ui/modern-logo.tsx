import { motion } from "framer-motion";

export function ModernLogo() {
  return (
    <motion.div
      className="relative flex items-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute -inset-2 rounded-lg opacity-75 blur-lg"
        style={{
          background: "linear-gradient(45deg, #FF671F, #046A38, #FF671F)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="relative flex items-center gap-3 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg">
        {/* Modern Train Logo */}
        <div className="relative">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            {/* Indian Railways Logo Shape */}
            <motion.path
              d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4Z"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M14 28L12 36H36L34 28M14 28H34M14 28V16C14 13.7909 15.7909 12 18 12H30C32.2091 12 34 13.7909 34 16V28"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M18 20H30M18 24H30"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <motion.circle
              cx="17"
              cy="32"
              r="2"
              fill="url(#gradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 }}
            />
            <motion.circle
              cx="31"
              cy="32"
              r="2"
              fill="url(#gradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.7 }}
            />
            
            {/* Ashoka Chakra */}
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(24)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="24"
                  y1="18"
                  x2="24"
                  y2="20"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  transform={`rotate(${i * 15} 24 24)`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </motion.g>

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF671F">
                  <animate
                    attributeName="stop-color"
                    values="#FF671F; #046A38; #FF671F"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#046A38">
                  <animate
                    attributeName="stop-color"
                    values="#046A38; #FF671F; #046A38"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* IRCTC Text */}
        <div className="flex flex-col">
          <motion.div
            className="text-2xl font-bold tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="relative">
              <span className="bg-gradient-to-r from-[#FF671F] via-[#046A38] to-[#FF671F] bg-clip-text text-transparent">
                IRCTC
              </span>
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 w-full"
                style={{
                  background: "linear-gradient(90deg, #FF671F, #046A38, #FF671F)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </span>
          </motion.div>
          <motion.div
            className="text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            INDIAN RAILWAYS
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
