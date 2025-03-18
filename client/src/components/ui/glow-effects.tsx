import { motion } from "framer-motion";

export function GlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal Lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{
            width: "100%",
            top: `${(i + 1) * 20}%`,
            opacity: 0.3,
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Glowing Orbs */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${(i + 1) * 25}%`,
            top: `${(i + 1) * 30}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Light Beams */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute w-1 h-40 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"
            style={{
              left: `${(i + 1) * 30}%`,
              transform: "rotate(15deg)",
            }}
            animate={{
              opacity: [0, 0.5, 0],
              height: ["100px", "300px", "100px"],
              y: [0, -200, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)/0.2) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)/0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>
    </div>
  );
}

export function NavbarGlow() {
  return (
    <div className="absolute -bottom-1 left-0 right-0 h-[2px] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
