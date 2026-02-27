# Cruise Domain Test Automation Framework

A comprehensive Playwright + Cucumber BDD framework for testing cruise booking systems with API + UI automation.

## 📁 Project Structure

### Configuration Files
- **`src/config/cruiseConfig.ts`** - Cruise API endpoints and environment configurations
- **`src/config/environment.ts`** - Environment variables and configuration management
- **`src/config/testContext.ts`** - Global test context for sharing data across steps

### Test Data & Models
- **`src/data/cruiseTestData.ts`** - Cruise domain entities and test data builders
- **`src/api/apiClient.ts`** - HTTP client for API testing
- **`src/ui/pageHelper.ts`** - Playwright helper for UI automation
- **`src/utils/testData.ts`** - General utilities

### Test Specifications
- **`tests/features/`** - Cucumber feature files (BDD scenarios)
- **`tests/stepdefinitions/`** - Step definitions and automation logic

## 🚀 Getting Started

### 1. Setup Environment

Copy the `.env.example` to `.env` and update with your cruise project details:

```bash
cp .env.example .env
```

Edit `.env`:
```
ENVIRONMENT=dev
API_BASE_URL=http://localhost:8000/api
UI_BASE_URL=http://localhost:3000
TEST_EMAIL=testuser@cruise.com
TEST_PASSWORD=TestPassword123!
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Generate HTML report
npm run test:report
```

## 📚 Key Cruises Domain Entities

### Cruise
- Ship name, departure/arrival ports
- Dates, duration, pricing
- Available cabins and capacity

### Passenger
- Personal info (name, email, DOB)
- Passport and nationality
- Booking reference

### Booking
- Multiple passengers
- Cabin type selection
- Payment status tracking

### Payment
- Card processing
- Invoice generation
- Refund handling

## 🔧 Using Test Data Builders

The `CruiseTestDataBuilder` class helps create test data:

```typescript
import { CruiseTestDataBuilder } from "../data/cruiseTestData";

// Create single cruise
const cruise = CruiseTestDataBuilder.createCruise({
  name: "Alaskan Adventure",
  pricePerPerson: 1500
});

// Create multiple passengers
const passengers = CruiseTestDataBuilder.createMultiplePassengers(3);

// Create booking
const booking = CruiseTestDataBuilder.createBooking({
  cruiseId: cruise.id,
  passengers: passengers
});
```

## 🎯 Using Test Context

Share data across multiple steps:

```typescript
import { testContext } from "../config/testContext";

// Set user
testContext.setUser(createdUser);

// Get user in next step
const user = testContext.getUser();

// Print current state
testContext.printContext();
```

## 📡 API Endpoints Reference

Configured in `cruiseConfig.ts`:

```
Authentication:
  POST   /auth/login
  POST   /auth/register
  
Cruises:
  GET    /cruises
  GET    /cruises/{cruiseId}
  GET    /cruises/search
  
Bookings:
  POST   /bookings
  GET    /bookings/{bookingId}
  GET    /bookings/user/{userId}
  
Passengers:
  POST   /bookings/{bookingId}/passengers
  
Payments:
  POST   /payments
  GET    /payments/{paymentId}
```

## 📝 Writing Feature Files

Example cruise booking scenario:

```gherkin
Feature: Cruise Booking

  Scenario: User can book a cruise
    Given the user is logged in
    And searches for cruises to "Cozumel"
    When they select a cruise departing "2026-03-15"
    And select "oceanview" cabin
    And add 2 passengers
    And proceed to payment
    Then the booking is created successfully
    And confirmation email is sent
```

## 🔐 Environment-Specific Configuration

Supports multiple environments:

```typescript
import { getConfig, Environment } from "./config/cruiseConfig";

const stagingConfig = getConfig(Environment.STAGING);
// Uses staging API and UI URLs
```

## 📊 MCP Server Integration

This framework is configured to work with GitHub Copilot via MCP:

- `.vscode/settings.json` - VS Code MCP configuration
- `mcp.config.json` - MCP server settings

Copilot can help you write test scenarios and step definitions!

## 🐛 Debugging

Enable verbose logging:

```bash
LOG_LEVEL=debug npm run test
```

Print test context state:

```typescript
testContext.printContext();
```

Screenshot capture on failures:

```typescript
await pageHelper.screenshot("failure-point");
```

## 📋 Directory Structure

```
src/
├── api/
│   └── apiClient.ts
├── config/
│   ├── cruiseConfig.ts
│   ├── environment.ts
│   └── testContext.ts
├── data/
│   └── cruiseTestData.ts
└── ui/
    └── pageHelper.ts

tests/
├── features/
│   ├── api.feature
│   ├── ui.feature
│   └── integration.feature
└── stepdefinitions/
    ├── apiSteps.ts
    ├── uiSteps.ts
    └── integrationSteps.ts
```

## 🤖 Using GitHub Copilot

With the MCP server configured, Copilot can:
- Generate new test scenarios
- Write step definitions
- Suggest test data
- Generate API calls

Ask Copilot: "Generate a Cucumber scenario for cruise search with cabin filter"

---

**Ready to automate cruise testing! 🚢**
