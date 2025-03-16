import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, Search, MapPin, Calendar } from "lucide-react";

const SERVICES = [
  {
    title: "PNR Status",
    description: "Check your PNR status and get real-time updates",
    icon: Search
  },
  {
    title: "Live Train Status",
    description: "Track your train's current location and expected arrival",
    icon: Train
  },
  {
    title: "Train Routes",
    description: "View detailed train routes and stopping stations",
    icon: MapPin
  },
  {
    title: "Cancellations",
    description: "Easy ticket cancellation and quick refunds",
    icon: Calendar
  }
];

export function ServiceCards() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(service => (
            <Card key={service.title} className="transition-transform hover:scale-105">
              <CardHeader>
                <service.icon className="h-8 w-8 text-primary mb-4" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
