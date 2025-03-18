import { motion } from "framer-motion";

export function AnimatedShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M0,50 Q25,0 50,50 T100,50"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          fill="none"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
