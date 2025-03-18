import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BookingWidget } from "../booking/BookingWidget";
import { AnimatedShapes } from "../ui/animated-shapes";
import { GlowingLines } from "../ui/glow-effects";
import { Train } from "lucide-react";

const backgroundImages = [
  "https://images.unsplash.com/photo-1601225998462-48f0e9c63a49?q=80&w=2070",
  "https://images.unsplash.com/photo-1601226014902-3a8e21d55f35?q=80&w=2070",
  "https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?q=80&w=2070",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image Carousel */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background/95 via-background/80 to-background/70" />

      {/* Animated Shapes */}
      <AnimatedShapes />

      {/* Glowing Lines */}
      <GlowingLines />
      
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="max-w-2xl mb-8"
          variants={itemVariants}
        >
          {/* IRCTC Logo */}
          <motion.div 
            className="mb-6 flex items-center gap-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <motion.div 
              className="p-3 bg-primary/10 rounded-lg relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Train className="h-8 w-8 text-primary relative z-10" />
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-lg"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(var(--primary), 0)",
                    "0 0 20px 2px rgba(var(--primary), 0.3)",
                    "0 0 0 0 rgba(var(--primary), 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <div>
              <motion.h2 
                className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Indian Railways
              </motion.h2>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Safety | Security | Punctuality
              </motion.p>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent relative group"
            variants={itemVariants}
          >
            Book Train Tickets with Ease
            <motion.span
              className="absolute -inset-x-6 -inset-y-2 z-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
              whileHover={{
                boxShadow: [
                  "0 0 0 0 rgba(var(--primary), 0)",
                  "0 0 30px 5px rgba(var(--primary), 0.2)",
                ],
              }}
            />
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground"
            variants={itemVariants}
          >
            Experience seamless train booking across India with modern IRCTC
          </motion.p>
        </motion.div>

        <motion.div 
          className="bg-card/80 backdrop-blur-md rounded-lg p-6 border shadow-lg dark:shadow-primary/5 max-w-3xl relative overflow-hidden"
          variants={itemVariants}
        >
          {/* Animated Border */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-20">
              <motion.div 
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div 
                className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent"
                animate={{
                  y: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.75,
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-primary to-transparent"
                animate={{
                  x: ["100%", "-100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5,
                }}
              />
              <motion.div 
                className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-t from-transparent via-primary to-transparent"
                animate={{
                  y: ["100%", "-100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2.25,
                }}
              />
            </div>
          </div>

          <BookingWidget />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          repeatType: "reverse",
          delay: 1 
        }}
      />

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute w-[1px] h-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"
            style={{
              left: `${20 + i * 30}%`,
              transform: "rotate(15deg)",
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
