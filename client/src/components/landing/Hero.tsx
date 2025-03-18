import { motion } from "framer-motion";
import { BookingWidget } from "../booking/BookingWidget";

export function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF671F' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Book Train Tickets with Ease
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Experience seamless train booking across India with modern IRCTC
          </p>
        </motion.div>

        <motion.div 
          className="bg-card/50 backdrop-blur-md rounded-lg p-6 border shadow-lg dark:shadow-primary/5 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BookingWidget />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
}
