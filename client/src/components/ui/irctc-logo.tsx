import { motion } from "framer-motion";
import { Train } from "lucide-react";

export function IRCTCLogo() {
  return (
    <motion.div 
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Glowing background circles */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Train icon with glow */}
        <motion.div
          className="relative p-3 rounded-lg bg-gradient-to-br from-primary/80 to-primary/20 backdrop-blur-sm"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(var(--primary), 0)",
              "0 0 30px 5px rgba(var(--primary), 0.4)",
              "0 0 0 0 rgba(var(--primary), 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Train className="h-7 w-7 text-primary-foreground" />
        </motion.div>
      </div>

      {/* IRCTC text with gradient and glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span 
          className="text-2xl font-bold tracking-tight relative"
          animate={{
            textShadow: [
              "0 0 10px rgba(var(--primary), 0.3)",
              "0 0 20px rgba(var(--primary), 0.5)",
              "0 0 10px rgba(var(--primary), 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="bg-gradient-to-r from-primary via-primary-foreground to-primary bg-clip-text text-transparent">
            IRCTC
          </span>
        </motion.span>
        <motion.div 
          className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
