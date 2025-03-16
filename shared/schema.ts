import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull()
});

export const trains = pgTable("trains", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  name: text("name").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  departureTime: timestamp("departure_time").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  duration: text("duration").notNull(),
  distance: integer("distance").notNull(),
  classes: json("classes").notNull().$type<{
    type: string;
    fare: number;
    available: number;
  }[]>(),
  intermediate: json("intermediate").notNull().$type<{
    station: string;
    arrival: string;
    departure: string;
  }[]>()
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  trainId: integer("train_id").references(() => trains.id),
  journeyDate: timestamp("journey_date").notNull(),
  passengers: json("passengers").notNull().$type<{
    name: string;
    age: number;
    gender: string;
  }[]>(),
  status: text("status").notNull(),
  class: text("class").notNull(),
  fare: integer("fare").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertTrainSchema = createInsertSchema(trains);
export const insertBookingSchema = createInsertSchema(bookings);

export type User = typeof users.$inferSelect;
export type Train = typeof trains.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTrain = z.infer<typeof insertTrainSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
