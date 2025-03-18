import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MOCK_STATIONS } from "@/lib/constants";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

const bookingSchema = z.object({
  from: z.string().min(1, "From station is required"),
  to: z.string().min(1, "To station is required"),
  date: z.date({
    required_error: "Please select a date",
  }),
});

export function BookingWidget() {
  const [, navigate] = useLocation();
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      from: "",
      to: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    navigate(
      `/trains?from=${data.from}&to=${data.to}&date=${format(data.date, "yyyy-MM-dd")}`
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover open={openFrom} onOpenChange={setOpenFrom}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? MOCK_STATIONS.find((station) => station.code === field.value)?.name
                          : "Search stations..."}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search stations..." />
                      <CommandEmpty>No stations found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {MOCK_STATIONS.map((station) => (
                          <CommandItem
                            key={station.code}
                            value={station.code}
                            onSelect={() => {
                              form.setValue("from", station.code);
                              setOpenFrom(false);
                            }}
                          >
                            {station.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <Popover open={openTo} onOpenChange={setOpenTo}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? MOCK_STATIONS.find((station) => station.code === field.value)?.name
                          : "Search stations..."}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search stations..." />
                      <CommandEmpty>No stations found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {MOCK_STATIONS.map((station) => (
                          <CommandItem
                            key={station.code}
                            value={station.code}
                            onSelect={() => {
                              form.setValue("to", station.code);
                              setOpenTo(false);
                            }}
                          >
                            {station.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-between font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Search Trains</Button>
      </form>
    </Form>
  );
}