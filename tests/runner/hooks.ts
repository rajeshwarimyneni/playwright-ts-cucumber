import { Before, After, setDefaultTimeout, World } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';

setDefaultTimeout(120000);

interface TestWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
}

Before(async function (this: TestWorld) {
  this.browser = await chromium.launch({ headless: false });
});

After(async function (this: TestWorld) {
  if (this.browser) {
    await this.browser.close();
  }
});
