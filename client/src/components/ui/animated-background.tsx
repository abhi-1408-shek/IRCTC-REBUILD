import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className={`absolute inset-0 ${
          isDark ? 'bg-grid-white/[0.05]' : 'bg-grid-black/[0.05]'
        }`}
      >
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDark 
            ? 'from-background via-background/80 to-background/0' 
            : 'from-background via-background/80 to-background/0'
        }`} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.5, 0.3],
            y: [0, -50, 0],
            x: [0, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-full h-full"
        >
          <div className={`w-full h-full rounded-[40%] ${
            isDark 
              ? 'bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30' 
              : 'bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20'
          } blur-3xl`} />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.3, 0.5, 0.3],
            y: [0, 50, 0],
            x: [0, -30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-full h-full"
        >
          <div className={`w-full h-full rounded-[40%] ${
            isDark 
              ? 'bg-gradient-to-r from-orange-500/30 via-red-500/30 to-orange-500/30' 
              : 'bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20'
          } blur-3xl`} />
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [null, Math.random() * 0.5 + 0.3]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-white/30' : 'bg-black/30'
            }`}
          />
        ))}
      </div>

      {/* Scanlines Effect */}
      <div 
        className={`absolute inset-0 pointer-events-none mix-blend-overlay ${
          isDark ? 'bg-scanlines-dark' : 'bg-scanlines-light'
        } opacity-[0.02]`}
      />

      {/* Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}
