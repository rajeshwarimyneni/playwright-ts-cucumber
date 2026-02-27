import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export class EnvironmentConfig {
  static getEnvironment(): string {
    return process.env.ENVIRONMENT || "dev";
  }

  static getAPIBaseURL(): string {
    return process.env.API_BASE_URL || "http://localhost:8000/api";
  }

  static getUIBaseURL(): string {
    return process.env.UI_BASE_URL || "http://localhost:3000";
  }

  static getAPITimeout(): number {
    return parseInt(process.env.API_TIMEOUT || "10000");
  }

  static isHeadless(): boolean {
    return process.env.HEADLESS === "true";
  }

  static getTestEmail(): string {
    return process.env.TEST_EMAIL || "testuser@cruise.com";
  }

  static getTestPassword(): string {
    return process.env.TEST_PASSWORD || "TestPassword123!";
  }

  static getTestUserFirstName(): string {
    return process.env.TEST_USER_FIRST_NAME || "Test";
  }

  static getTestUserLastName(): string {
    return process.env.TEST_USER_LAST_NAME || "User";
  }

  static getCruiseTestData() {
    return {
      name: process.env.TEST_CRUISE_NAME || "Caribbean Dream",
      departurePort: process.env.TEST_CRUISE_DEPARTURE_PORT || "Miami",
      destinationPort: process.env.TEST_CRUISE_DESTINATION_PORT || "Cozumel",
      departureDate: process.env.TEST_CRUISE_DEPARTURE_DATE || "2026-03-15",
      duration: parseInt(process.env.TEST_CRUISE_DURATION || "7"),
      cabinType: process.env.TEST_CABIN_TYPE || "oceanview",
      passengersCount: parseInt(process.env.TEST_PASSENGERS_COUNT || "1"),
    };
  }

  static getPaymentTestData() {
    return {
      cardNumber: process.env.TEST_CARD_NUMBER || "4532015112830366",
      cardExpiry: process.env.TEST_CARD_EXPIRY || "12/26",
      cardCVV: process.env.TEST_CARD_CVV || "123",
    };
  }

  static getLogLevel(): string {
    return process.env.LOG_LEVEL || "info";
  }

  static showScreenshots(): boolean {
    return process.env.SHOW_SCREENSHOTS !== "false";
  }

  static recordVideo(): boolean {
    return process.env.VIDEO_RECORDING === "true";
  }

  static getBrowser(): string {
    return process.env.BROWSER || "chromium";
  }

  static getBrowserTimeout(): number {
    return parseInt(process.env.BROWSER_TIMEOUT || "30000");
  }

  static getScreenshotDir(): string {
    return process.env.SCREENSHOT_DIR || "screenshots/";
  }

  static getReportDir(): string {
    return process.env.REPORT_DIR || "reports/";
  }

  static printConfig(): void {
    console.log("=== Test Configuration ===");
    console.log(`Environment: ${this.getEnvironment()}`);
    console.log(`API Base URL: ${this.getAPIBaseURL()}`);
    console.log(`UI Base URL: ${this.getUIBaseURL()}`);
    console.log(`Headless: ${this.isHeadless()}`);
    console.log(`Browser: ${this.getBrowser()}`);
    console.log("==========================");
  }
}
