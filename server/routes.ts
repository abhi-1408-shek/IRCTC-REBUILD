import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBookingSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Server is running!" });
  });

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Train routes
  app.get("/api/trains", async (req, res) => {
    try {
      const { from, to, date } = req.query;
      const trains = await storage.findTrains({
        from: String(from),
        to: String(to),
        date: new Date(String(date))
      });
      res.json(trains);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trains" });
    }
  });

  app.get("/api/trains/:id", async (req, res) => {
    try {
      const train = await storage.getTrain(parseInt(req.params.id));
      if (!train) {
        return res.status(404).json({ message: "Train not found" });
      }
      res.json(train);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch train details" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.json(booking);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  // Track train route
  app.get("/api/track/:number", async (req, res) => {
    try {
      const trainStatus = await storage.getTrainStatus(req.params.number);
      if (!trainStatus) {
        return res.status(404).json({ message: "Train not found" });
      }
      res.json(trainStatus);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch train status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}