import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Train } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_TRAINS, CLASS_TYPES } from "@/lib/constants";
import { PageTransition, InteractiveCard, GlowingButton, FloatingElement, GlowingBorder } from "@/components/ui/page-transition";
import { GlowingLines } from "@/components/ui/glow-effects";

type SortOption = "departure" | "duration" | "price";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TrainList() {
  const [sort, setSort] = useState<SortOption>("departure");
  const [selectedClass, setSelectedClass] = useState("2A");

  const sortedTrains = [...MOCK_TRAINS].sort((a, b) => {
    switch (sort) {
      case "departure":
        return a.departureTime.localeCompare(b.departureTime);
      case "duration":
        return a.duration.localeCompare(b.duration);
      case "price": {
        const aPrice = a.classes.find((c) => c.type === selectedClass)?.fare || 0;
        const bPrice = b.classes.find((c) => c.type === selectedClass)?.fare || 0;
        return aPrice - bPrice;
      }
      default:
        return 0;
    }
  });

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-background">
        {/* Background Effects */}
        <GlowingLines />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <GlowingBorder className="mb-6 inline-block">
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Available Trains
              </motion.h1>
            </GlowingBorder>

            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              Select your preferred train from the options below
            </motion.p>
          </motion.div>

          {/* Train List */}
          <motion.div
            className="grid gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedTrains.map((train) => {
              const selectedClassInfo = train.classes.find(
                (c) => c.type === selectedClass
              );

              return (
                <motion.div
                  key={train.id}
                  variants={itemVariants}
                >
                  <InteractiveCard>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <FloatingElement>
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Train className="h-6 w-6 text-primary" />
                            </div>
                          </FloatingElement>
                          <div>
                            <h3 className="font-semibold text-lg">{train.name}</h3>
                            <p className="text-sm text-muted-foreground">Train #{train.number}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Departure</p>
                            <p className="font-semibold">{train.departureTime}</p>
                            <p className="text-sm text-muted-foreground">{train.from}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Arrival</p>
                            <p className="font-semibold">{train.arrivalTime}</p>
                            <p className="text-sm text-muted-foreground">{train.to}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-semibold">{train.duration}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="font-semibold">₹{selectedClassInfo?.fare || "N/A"}</p>
                            <p className="text-sm text-primary">{selectedClassInfo?.available || 0} seats left</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={`/booking?train=${train.id}`}>
                          <GlowingButton>
                            Book Now
                          </GlowingButton>
                        </Link>
                        <GlowingButton
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                          onClick={() => window.open(`/track/${train.id}`, "_blank")}
                        >
                          Track Train
                        </GlowingButton>
                      </div>
                    </div>
                  </InteractiveCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Sort and Class Selectors */}
          <motion.div 
            className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="container mx-auto">
              <motion.div 
                className="flex gap-4 justify-end"
                variants={itemVariants}
              >
                <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="departure">Departure Time</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASS_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
