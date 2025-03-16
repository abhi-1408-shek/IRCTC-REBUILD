import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { Navbar } from "@/components/layout/Navbar";
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

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
    </div>
  );
}