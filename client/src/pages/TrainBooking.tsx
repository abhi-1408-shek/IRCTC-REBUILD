import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CLASS_TYPES } from "@/lib/constants";

const passengerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return age >= 1 && age <= 120;
  }, "Age must be between 1 and 120"),
  gender: z.enum(["M", "F", "O"], {
    required_error: "Please select gender",
  }),
});

const bookingSchema = z.object({
  passengers: z.array(passengerSchema).min(1),
  classType: z.string().min(1, "Please select class"),
});

export default function TrainBooking() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: [{ name: "", age: "", gender: "M" }],
      classType: "",
    },
  });

  const onSubmit = async (_data: z.infer<typeof bookingSchema>) => {
    try {
      toast({
        title: "Success",
        description: "Booking confirmed successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to book tickets. Please try again.",
      });
    }
  };

  const addPassenger = () => {
    const passengers = form.getValues("passengers");
    if (passengers.length < 6) {
      form.setValue("passengers", [
        ...passengers,
        { name: "", age: "", gender: "M" },
      ]);
    }
  };

  const removePassenger = (index: number) => {
    const passengers = form.getValues("passengers");
    if (passengers.length > 1) {
      form.setValue(
        "passengers",
        passengers.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Passenger Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {form.watch("passengers").map((_, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1 space-y-4">
                        <FormField
                          control={form.control}
                          name={`passengers.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`passengers.${index}.age`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`passengers.${index}.gender`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="M">Male</SelectItem>
                                    <SelectItem value="F">Female</SelectItem>
                                    <SelectItem value="O">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removePassenger(index)}
                        className="mt-8"
                        disabled={form.watch("passengers").length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addPassenger}
                  disabled={form.watch("passengers").length >= 6}
                >
                  Add Passenger
                </Button>

                <FormField
                  control={form.control}
                  name="classType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Type</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CLASS_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Book Tickets
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
