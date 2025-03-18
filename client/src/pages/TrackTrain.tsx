import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const searchSchema = z.object({
  trainNumber: z.string().min(1, "Train number is required"),
});

// Mock train route for demonstration
const mockRoute = [
  { lat: 28.6139, lng: 77.2090, station: "New Delhi", eta: "On time" },
  { lat: 25.3176, lng: 82.9739, station: "Varanasi", eta: "10 min delay" },
  { lat: 22.5726, lng: 88.3639, station: "Kolkata", eta: "Expected 18:30" },
];

const pathCoordinates = mockRoute.map(point => [point.lat, point.lng]);

const mockTrainStatus = {
  trainNumber: "12345",
  trainName: "Rajdhani Express",
  status: "Running",
  delay: "10 mins",
  nextStation: "Mumbai Central",
  eta: "15:30",
  lastStation: "Surat",
  lastDeparture: "13:45",
};

const stations = [
  { name: "Delhi", time: "10:00", status: "departed" },
  { name: "Mathura", time: "11:30", status: "departed" },
  { name: "Agra", time: "12:45", status: "departed" },
  { name: "Surat", time: "13:45", status: "departed" },
  { name: "Mumbai Central", time: "15:30", status: "upcoming" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TrackTrain() {
  const { toast } = useToast();
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [trainPosition, setTrainPosition] = useState(0);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      trainNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof searchSchema>) => {
    try {
      toast({
        title: "Train Found",
        description: "Tracking train " + data.trainNumber,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find train. Please check the number and try again.",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainPosition((prev) => (prev >= pathCoordinates.length - 1 ? 0 : prev + 0.01));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const interpolatePosition = (pos: number) => {
    const index = Math.floor(pos);
    const next = Math.min(index + 1, pathCoordinates.length - 1);
    const fraction = pos - index;

    const lat = pathCoordinates[index][0] + (pathCoordinates[next][0] - pathCoordinates[index][0]) * fraction;
    const lng = pathCoordinates[index][1] + (pathCoordinates[next][1] - pathCoordinates[index][1]) * fraction;

    return [lat, lng];
  };

  const trainIcon = L.divIcon({
    className: 'train-icon',
    html: `<div style="color: #FF671F; font-size: 24px;">🚂</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  // Fix for default marker icons in Leaflet
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background p-6 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Train Status Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-lg bg-card p-6 shadow-lg dark:bg-slate-800"
        >
          <h2 className="mb-4 text-2xl font-bold text-foreground">Live Train Status</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Train Number</p>
              <p className="font-semibold text-foreground">{mockTrainStatus.trainNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Train Name</p>
              <p className="font-semibold text-foreground">{mockTrainStatus.trainName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="font-semibold text-green-600 dark:text-green-400">{mockTrainStatus.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delay</p>
              <p className="font-semibold text-yellow-600 dark:text-yellow-400">{mockTrainStatus.delay}</p>
            </div>
          </div>
        </motion.div>

        {/* Journey Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg bg-card p-6 shadow-lg dark:bg-slate-800"
        >
          <h3 className="mb-6 text-xl font-bold text-foreground">Journey Timeline</h3>
          <div className="relative space-y-8">
            {/* Progress Line */}
            <div className="absolute left-[22px] top-1 h-full w-0.5 bg-muted dark:bg-slate-600" />
            {/* Active Progress Line */}
            <motion.div
              className="absolute left-[22px] top-1 h-4/5 w-0.5 bg-primary"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {stations.map((station) => (
              <div key={station.name} className="flex items-center gap-4">
                {/* Station Marker */}
                <motion.div
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                    station.status === "departed"
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
                      : "border-muted bg-card dark:border-slate-600 dark:bg-slate-800"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className={`h-3 w-3 rounded-full ${
                      station.status === "departed"
                        ? "bg-primary"
                        : "bg-muted dark:bg-slate-600"
                    }`}
                  />
                </motion.div>

                {/* Station Info */}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{station.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{station.time}</p>
                    {station.status === "departed" && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary dark:bg-primary/20">
                        Departed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Map */}
        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="mb-6 dark:bg-slate-800/50 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Track Your Train</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="trainNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Train Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter train number" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-auto">Track</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 dark:bg-slate-800/50 dark:border-slate-700">
              <CardContent className="p-0">
                <MapContainer
                  center={[23.5937, 78.9629]}
                  zoom={5}
                  style={{ height: "500px", width: "100%", zIndex: 1 }}
                  className="rounded-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Polyline 
                    positions={pathCoordinates as L.LatLngExpression[]}
                    color="#FF671F"
                    weight={3}
                  />
                  {mockRoute.map((station, idx) => (
                    <Marker
                      key={idx}
                      position={[station.lat, station.lng]}
                      eventHandlers={{
                        click: () => setSelectedStation(idx),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{station.station}</h3>
                          <p className="text-sm">{station.eta}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  <Marker 
                    position={interpolatePosition(trainPosition) as L.LatLngExpression}
                    icon={trainIcon}
                  />
                </MapContainer>
              </CardContent>
            </Card>

            <Card className="dark:bg-slate-800/50 dark:border-slate-700">
              <CardHeader>
                <CardTitle>Station Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {mockRoute.map((station, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-4 rounded-lg border mb-2 transition-colors ${
                        selectedStation === idx ? "bg-primary/10 border-primary dark:bg-primary/20" : "dark:border-slate-600"
                      }`}
                    >
                      <h3 className="font-semibold">{station.station}</h3>
                      <p className="text-sm text-muted-foreground">{station.eta}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}