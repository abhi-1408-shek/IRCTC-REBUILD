import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, Search, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const SERVICES = [
  {
    title: "PNR Status",
    description: "Check your PNR status and get real-time updates",
    icon: Search,
    href: "/pnr"
  },
  {
    title: "Live Train Status",
    description: "Track your train's current location and expected arrival",
    icon: Train,
    href: "/track"
  },
  {
    title: "Train Routes",
    description: "View detailed train routes and stopping stations",
    icon: MapPin,
    href: "/trains"
  },
  {
    title: "Cancellations",
    description: "Easy ticket cancellation and quick refunds",
    icon: Calendar,
    href: "/bookings"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function ServiceCards() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-orange-500 to-primary text-transparent bg-clip-text"
        >
          Our Services
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map(service => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ scale: 1.05, translateY: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={service.href}>
                <Card className="cursor-pointer h-full dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="mb-4"
                    >
                      <service.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}