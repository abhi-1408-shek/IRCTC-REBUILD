import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "wouter";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MOCK_STATIONS } from "@/lib/constants";
import { z } from "zod";

const bookingSchema = z.object({
  from: z.string().min(1, "Please select source station"),
  to: z.string().min(1, "Please select destination station"),
  date: z.date({
    required_error: "Please select date",
  }),
});

export function BookingWidget() {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof bookingSchema>>({
    defaultValues: {
      from: "",
      to: "",
      date: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof bookingSchema>) {
    const params = new URLSearchParams({
      from: data.from,
      to: data.to,
      date: format(data.date, "yyyy-MM-dd"),
    });
    navigate(`/trains?${params}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? MOCK_STATIONS.find((station) => station.code === field.value)?.name
                        : "Select station"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search station..." />
                    <CommandEmpty>No station found.</CommandEmpty>
                    <CommandGroup>
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <Popover open={openTo} onOpenChange={setOpenTo}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? MOCK_STATIONS.find((station) => station.code === field.value)?.name
                        : "Select station"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search station..." />
                    <CommandEmpty>No station found.</CommandEmpty>
                    <CommandGroup>
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 4))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-full mt-auto">
          Search Trains
        </Button>
      </form>
    </Form>
  );
}
