import { useState } from "react";
import { useLocation } from "wouter";
import { useSearch } from "@/hooks/use-search";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { MOCK_TRAINS, MOCK_STATIONS, CLASS_TYPES } from "@/lib/constants";

type SortOption = "departure" | "duration" | "price";

export default function TrainList() {
  const [sort, setSort] = useState<SortOption>("departure");
  const [selectedClass, setSelectedClass] = useState("2A");
  const [, navigate] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  const fromStation = MOCK_STATIONS.find((s) => s.code === from);
  const toStation = MOCK_STATIONS.find((s) => s.code === to);

  const sortedTrains = [...MOCK_TRAINS].sort((a, b) => {
    switch (sort) {
      case "departure":
        return a.departureTime.localeCompare(b.departureTime);
      case "duration":
        return a.duration.localeCompare(b.duration);
      case "price":
        const aPrice = a.classes.find((c) => c.type === selectedClass)?.fare || 0;
        const bPrice = b.classes.find((c) => c.type === selectedClass)?.fare || 0;
        return aPrice - bPrice;
      default:
        return 0;
    }
  });

  const handleBook = (trainId: number) => {
    navigate(`/booking?train=${trainId}&date=${date}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Journey Details</p>
                <h2 className="text-xl font-semibold">
                  {fromStation?.name} → {toStation?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {date && format(new Date(date), "dd MMM yyyy")}
                </p>
              </div>
              <div className="flex gap-4">
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
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {sortedTrains.map((train) => {
            const selectedClassInfo = train.classes.find(
              (c) => c.type === selectedClass
            );

            return (
              <Card key={train.id}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-6 justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{train.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {train.number}
                      </p>
                    </div>

                    <div className="flex gap-8">
                      <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="font-semibold">{train.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{train.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="font-semibold">{train.arrivalTime}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-semibold">
                        ₹{selectedClassInfo?.fare || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedClassInfo?.available || 0} seats available
                      </p>
                    </div>

                    <Button
                      onClick={() => handleBook(train.id)}
                      disabled={!selectedClassInfo?.available}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
