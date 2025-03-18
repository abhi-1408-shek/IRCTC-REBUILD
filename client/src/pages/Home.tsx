import { Hero } from "@/components/landing/Hero";
import { ServiceCards } from "@/components/landing/ServiceCards";
import { GlowingBackground } from "@/components/ui/glowing-background";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen"
    >
      <GlowingBackground />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Hero />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ServiceCards />
      </motion.div>
    </motion.div>
  );
}
