import { users, trains, bookings, type User, type InsertUser, type Train, type InsertTrain, type Booking, type InsertBooking } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Train methods
  getTrain(id: number): Promise<Train | undefined>;
  findTrains(params: { from: string; to: string; date: Date }): Promise<Train[]>;
  getTrainStatus(number: string): Promise<any>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trains: Map<number, Train>;
  private bookings: Map<number, Booking>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.trains = new Map();
    this.bookings = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTrain(id: number): Promise<Train | undefined> {
    return this.trains.get(id);
  }

  async findTrains(params: { from: string; to: string; date: Date }): Promise<Train[]> {
    return Array.from(this.trains.values()).filter(train => 
      train.from === params.from && 
      train.to === params.to
    );
  }

  async getTrainStatus(number: string): Promise<any> {
    const train = Array.from(this.trains.values()).find(t => t.number === number);
    if (!train) return undefined;

    // Mock status data
    return {
      trainNumber: number,
      currentStation: "Station X",
      delay: 0,
      nextStation: "Station Y",
      eta: new Date().toISOString()
    };
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = { ...insertBooking, id };
    this.bookings.set(id, booking);
    return booking;
  }
}

export const storage = new MemStorage();