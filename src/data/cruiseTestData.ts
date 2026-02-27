export interface Cruise {
  id?: string;
  name: string;
  ship: string;
  departurePort: string;
  destinationPort: string;
  departureDate: string;
  returnDate: string;
  duration: number;
  pricePerPerson: number;
  availableCabins: number;
  maxPassengers: number;
}

export interface CabinType {
  id?: string;
  type: "inside" | "oceanview" | "balcony" | "suite";
  priceMultiplier: number;
  maxOccupancy: number;
}

export interface Passenger {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
}

export interface Booking {
  id?: string;
  cruiseId: string;
  customerId: string;
  passengers: Passenger[];
  cabinType: "inside" | "oceanview" | "balcony" | "suite";
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  bookingDate: string;
}

export interface User {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export class CruiseTestDataBuilder {
  static createCruise(overrides?: Partial<Cruise>): Cruise {
    return {
      name: "Caribbean Dream",
      ship: "Dream Class",
      departurePort: "Miami",
      destinationPort: "Cozumel",
      departureDate: "2026-03-15",
      returnDate: "2026-03-22",
      duration: 7,
      pricePerPerson: 1200,
      availableCabins: 450,
      maxPassengers: 3000,
      ...overrides,
    };
  }

  static createPassenger(overrides?: Partial<Passenger>): Passenger {
    return {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      dateOfBirth: "1990-05-15",
      nationality: "USA",
      passportNumber: "P123456789",
      ...overrides,
    };
  }

  static createBooking(overrides?: Partial<Booking>): Booking {
    return {
      cruiseId: "CRUISE001",
      customerId: "USER001",
      passengers: [this.createPassenger()],
      cabinType: "oceanview",
      totalPrice: 2400,
      status: "pending",
      bookingDate: new Date().toISOString(),
      ...overrides,
    };
  }

  static createUser(overrides?: Partial<User>): User {
    return {
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      phone: "+1-555-0123",
      address: "123 Main St",
      city: "Miami",
      country: "USA",
      ...overrides,
    };
  }

  static createMultiplePassengers(count: number): Passenger[] {
    return Array.from({ length: count }, (_, i) =>
      this.createPassenger({
        firstName: `Passenger${i + 1}`,
        email: `passenger${i + 1}@example.com`,
      })
    );
  }

  static parseTableToObject(table: Array<{ [key: string]: string }>): Record<string, string> {
    const data: Record<string, string> = {};
    table.forEach((row) => {
      Object.assign(data, row);
    });
    return data;
  }

  static parseCruiseTable(table: Array<{ [key: string]: string }>): Partial<Cruise> {
    const data = this.parseTableToObject(table);
    return {
      name: data.name,
      ship: data.ship,
      departurePort: data.departurePort,
      destinationPort: data.destinationPort,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      duration: data.duration ? parseInt(data.duration) : undefined,
      pricePerPerson: data.pricePerPerson ? parseFloat(data.pricePerPerson) : undefined,
    } as Partial<Cruise>;
  }

  static parsePassengerTable(table: Array<{ [key: string]: string }>): Partial<Passenger> {
    const data = this.parseTableToObject(table);
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      passportNumber: data.passportNumber,
    } as Partial<Passenger>;
  }
}
