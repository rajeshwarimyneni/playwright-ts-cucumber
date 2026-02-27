import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, type Browser, type Page } from "playwright";
import { PageHelper } from "../../src/ui/pageHelper";

setDefaultTimeout(30000);

let browser: Browser;
let page: Page;
let pageHelper: PageHelper;

Before(async function() {
  console.log("🚀 Launching browser...");
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  pageHelper = new PageHelper(page);
  console.log("✓ Browser launched successfully");
});

After(async function() {
  console.log("🛑 Closing browser...");
  await browser.close();
  console.log("✓ Browser closed");
});

Given("the browser is launched", async () => {
  console.log("✓ Browser is ready");
});

When("I navigate to {string}", async (url: string) => {
  await pageHelper.navigate(url);
});

Then("the page title should contain {string}", async (titlePart: string) => {
  const title = await pageHelper.getTitle();
  console.log(`✓ Verifying title contains: "${titlePart}"`);
  if (!title.includes(titlePart)) {
    throw new Error(`Title "${title}" does not contain "${titlePart}"`);
  }
});

Then("the page should be fully loaded", async () => {
  await page.waitForLoadState("networkidle");
  console.log("✓ Page fully loaded");
});

When("I wait for element {string} to appear", async (selector: string) => {
  await pageHelper.waitForElement(selector);
});

Then("I should see text {string} in the page", async (text: string) => {
  const hasText = await pageHelper.hasText(text);
  if (!hasText) {
    throw new Error(`Text "${text}" not found in page`);
  }
});

Given("I navigate to a test form page", async () => {
  // This is a placeholder - replace with your actual form page
  await pageHelper.navigate("https://example.com");
});

When("I fill the form with:", async (dataTable: any) => {
  const rows = dataTable.hashes();
  for (const row of rows) {
    // Assuming field name matches form input selector
    const selector = `[name="${row.Field}"]`;
    await pageHelper.fill(selector, row.Value);
  }
});

When("I submit the form", async () => {
  await pageHelper.click('button[type="submit"]');
  await page.waitForLoadState("networkidle");
});

Then("I should see success confirmation", async () => {
  const hasSuccess = await pageHelper.hasText("success");
  if (!hasSuccess) {
    throw new Error("Success confirmation not found");
  }
});

Then("the page URL should contain {string}", async (urlPart: string) => {
  const url = await pageHelper.getURL();
  console.log(`✓ Verifying URL contains: "${urlPart}"`);
  if (!url.includes(urlPart)) {
    throw new Error(`URL "${url}" does not contain "${urlPart}"`);
  }
});
