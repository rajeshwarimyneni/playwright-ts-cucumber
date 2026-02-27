import { Given, When, Then, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { APIClient } from "../../src/api/apiClient";
import { TestDataBuilder, Post } from "../../src/utils/testData";

setDefaultTimeout(30000);

let apiClient: APIClient;
let lastResponseData: any;

Given("the API base URL is set to {string}", (baseURL: string) => {
  console.log(`🔗 Setting API base URL: ${baseURL}`);
  apiClient = new APIClient(baseURL);
});

When("I send a GET request to {string}", async (endpoint: string) => {
  console.log(`📤 Sending GET request to ${endpoint}`);
  const response = await apiClient.get(endpoint);
  lastResponseData = response.data;
  console.log(`📥 Response received`);
});

When("I send a POST request to {string} with the following data:", async (endpoint: string, dataTable: any) => {
  const rows = dataTable.hashes();
  const data = TestDataBuilder.parseTable(rows);
  console.log(`📤 Sending POST request to ${endpoint}`);
  console.log(`📋 Data:`, data);
  const response = await apiClient.post(endpoint, data);
  lastResponseData = response.data;
  console.log(`📥 Response received`);
});

When("I send a PUT request to {string} with the following data:", async (endpoint: string, dataTable: any) => {
  const rows = dataTable.hashes();
  const data = TestDataBuilder.parseTable(rows);
  console.log(`📤 Sending PUT request to ${endpoint}`);
  const response = await apiClient.put(endpoint, data);
  lastResponseData = response.data;
});

When("I send a DELETE request to {string}", async (endpoint: string) => {
  console.log(`📤 Sending DELETE request to ${endpoint}`);
  const response = await apiClient.delete(endpoint);
  lastResponseData = response.data;
});

Then("the response status code should be {int}", (statusCode: number) => {
  const responseStatus = apiClient.getLastResponseStatus();
  console.log(`✓ Verifying status code: ${responseStatus} === ${statusCode}`);
  expect(responseStatus).toBe(statusCode);
});

Then("the response should contain user data with id {int}", (userId: number) => {
  console.log(`✓ Verifying user data with id ${userId}`);
  expect(lastResponseData).toHaveProperty("id", userId);
  expect(lastResponseData).toHaveProperty("name");
  expect(lastResponseData).toHaveProperty("email");
});

Then("the response should contain id field", () => {
  console.log(`✓ Verifying id field exists in response`);
  expect(lastResponseData).toHaveProperty("id");
  expect(typeof lastResponseData.id).toBe("number");
});

Then("the response should contain {string} field", (fieldName: string) => {
  console.log(`✓ Verifying field "${fieldName}" exists`);
  expect(lastResponseData).toHaveProperty(fieldName);
});
