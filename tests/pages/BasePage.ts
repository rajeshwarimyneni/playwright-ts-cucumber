import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common wait methods
  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async waitForElement(locator: Locator, timeout: number = 20000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch (e) {
      console.log(`Element not found within ${timeout}ms`);
      return false;
    }
  }

  async isElementVisible(locator: Locator, timeout: number = 10000): Promise<boolean> {
    try {
      return await locator.isVisible({ timeout });
    } catch (e) {
      return false;
    }
  }

  async clickElement(locator: Locator, waitMs: number = 1000): Promise<boolean> {
    try {
      if (await this.isElementVisible(locator)) {
        await locator.click();
        await this.waitForTimeout(waitMs);
        return true;
      }
      return false;
    } catch (e) {
      console.log(`Failed to click element: ${(e as Error).message}`);
      return false;
    }
  }

  async fillField(locator: Locator, value: string, waitMs: number = 1000): Promise<boolean> {
    try {
      if (await this.isElementVisible(locator)) {
        await locator.click();
        await locator.fill(value);
        await this.waitForTimeout(waitMs);
        return true;
      }
      return false;
    } catch (e) {
      console.log(`Failed to fill field: ${(e as Error).message}`);
      return false;
    }
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async takeScreenshot(filename: string): Promise<void> {
    try {
      await this.page.screenshot({ path: filename });
      console.log(`Screenshot saved: ${filename}`);
    } catch (e) {
      console.log(`Failed to save screenshot: ${(e as Error).message}`);
    }
  }
}
