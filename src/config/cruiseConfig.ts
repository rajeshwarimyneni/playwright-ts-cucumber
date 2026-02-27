export enum Environment {
  DEV = "dev",
  STAGING = "staging",
  PRODUCTION = "prod",
}

export interface CruiseAPIConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface CruiseUIConfig {
  baseURL: string;
  headless: boolean;
}

export const cruiseEnvironments: Record<Environment, { api: CruiseAPIConfig; ui: CruiseUIConfig }> = {
  [Environment.DEV]: {
    api: {
      baseURL: "http://localhost:8000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-Environment": "dev",
      },
    },
    ui: {
      baseURL: "http://localhost:3000",
      headless: false,
    },
  },
  [Environment.STAGING]: {
    api: {
      baseURL: "https://staging-api.cruise.local/api",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
        "X-Environment": "staging",
      },
    },
    ui: {
      baseURL: "https://staging.cruise.local",
      headless: false,
    },
  },
  [Environment.PRODUCTION]: {
    api: {
      baseURL: "https://api.cruise.com/api",
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
        "X-Environment": "prod",
      },
    },
    ui: {
      baseURL: "https://www.cruise.com",
      headless: true,
    },
  },
};

export function getConfig(env: Environment = Environment.DEV): {
  api: CruiseAPIConfig;
  ui: CruiseUIConfig;
} {
  return cruiseEnvironments[env];
}

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",

  // Cruises
  GET_CRUISES: "/cruises",
  GET_CRUISE_DETAILS: "/cruises/{cruiseId}",
  SEARCH_CRUISES: "/cruises/search",

  // Bookings
  CREATE_BOOKING: "/bookings",
  GET_BOOKING: "/bookings/{bookingId}",
  UPDATE_BOOKING: "/bookings/{bookingId}",
  CANCEL_BOOKING: "/bookings/{bookingId}/cancel",
  LIST_BOOKINGS: "/bookings/user/{userId}",

  // Passengers
  ADD_PASSENGER: "/bookings/{bookingId}/passengers",
  UPDATE_PASSENGER: "/passengers/{passengerId}",

  // Payments
  PROCESS_PAYMENT: "/payments",
  GET_PAYMENT_STATUS: "/payments/{paymentId}",

  // Cabins
  GET_AVAILABLE_CABINS: "/cruises/{cruiseId}/cabins/available",
  RESERVE_CABIN: "/cabins/{cabinId}/reserve",

  // Users
  GET_USER_PROFILE: "/users/{userId}",
  UPDATE_USER_PROFILE: "/users/{userId}",
};
