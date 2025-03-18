import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export function InteractiveCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border bg-card p-6 shadow-lg dark:shadow-primary/5 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", bounce: 0.4 }}
    >
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        initial={false}
        whileHover={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function GlowingButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg bg-primary px-4 py-2 text-primary-foreground shadow-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-white"
        style={{
          opacity: 0,
          filter: "blur(30px)",
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function FloatingElement({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function GlowingBorder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-lg p-[1px] ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-primary/50 to-primary"
        style={{ opacity: 0.3 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative rounded-lg bg-background p-4">{children}</div>
    </div>
  );
}
