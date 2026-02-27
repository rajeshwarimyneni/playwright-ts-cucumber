import { APIClient } from "../api/apiClient";
import { PageHelper } from "../ui/pageHelper";
import { Page } from "@playwright/test";

export interface TestContextData {
  currentUser?: any;
  currentCruise?: any;
  currentBooking?: any;
  currentPayment?: any;
  lastAPIResponse?: any;
  lastAPIError?: any;
  page?: Page;
  pageHelper?: PageHelper;
}

export class CruiseTestContext {
  private context: TestContextData = {};
  public apiClient?: APIClient;

  setUser(user: any): void {
    this.context.currentUser = user;
    console.log(`🧑 Current User: ${user?.email || "Unknown"}`);
  }

  getUser(): any {
    return this.context.currentUser;
  }

  setCruise(cruise: any): void {
    this.context.currentCruise = cruise;
    console.log(`🚢 Current Cruise: ${cruise?.name || "Unknown"}`);
  }

  getCruise(): any {
    return this.context.currentCruise;
  }

  setBooking(booking: any): void {
    this.context.currentBooking = booking;
    console.log(`📋 Current Booking: ${booking?.id || "Unknown"}`);
  }

  getBooking(): any {
    return this.context.currentBooking;
  }

  setPayment(payment: any): void {
    this.context.currentPayment = payment;
    console.log(`💳 Current Payment: ${payment?.id || "Unknown"}`);
  }

  getPayment(): any {
    return this.context.currentPayment;
  }

  setAPIResponse(response: any): void {
    this.context.lastAPIResponse = response;
  }

  getAPIResponse(): any {
    return this.context.lastAPIResponse;
  }

  setAPIError(error: any): void {
    this.context.lastAPIError = error;
    console.error(`❌ API Error: ${error?.message}`);
  }

  getAPIError(): any {
    return this.context.lastAPIError;
  }

  setPage(page: Page): void {
    this.context.page = page;
  }

  getPage(): Page | undefined {
    return this.context.page;
  }

  setPageHelper(pageHelper: PageHelper): void {
    this.context.pageHelper = pageHelper;
  }

  getPageHelper(): PageHelper | undefined {
    return this.context.pageHelper;
  }

  clear(): void {
    this.context = {};
    console.log("🧹 Test context cleared");
  }

  printContext(): void {
    console.log("📊 Current Test Context:", JSON.stringify(this.context, null, 2));
  }
}

// Global test context instance
export const testContext = new CruiseTestContext();
