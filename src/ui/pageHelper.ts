import { Page, expect } from "@playwright/test";

export class PageHelper {
  constructor(private page: Page) {}

  async navigate(url: string): Promise<void> {
    console.log(`📄 Navigating to ${url}`);
    await this.page.goto(url, { waitUntil: "networkidle" });
    console.log("✓ Navigation complete");
  }

  async getTitle(): Promise<string> {
    const title = await this.page.title();
    console.log(`📋 Page title: ${title}`);
    return title;
  }

  async getText(selector: string): Promise<string> {
    const text = await this.page.locator(selector).textContent();
    console.log(`📝 Text from ${selector}: ${text}`);
    return text ?? "";
  }

  async hasText(text: string): Promise<boolean> {
    const hasText = await this.page.getByText(text).isVisible().catch(() => false);
    console.log(`${hasText ? "✓" : "✗"} Text found: "${text}"`);
    return hasText;
  }

  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    console.log(`⏳ Waiting for element: ${selector}`);
    await this.page.locator(selector).waitFor({ timeout });
    console.log(`✓ Element appeared: ${selector}`);
  }

  async click(selector: string): Promise<void> {
    console.log(`🖱️ Clicking element: ${selector}`);
    await this.page.locator(selector).click();
    console.log(`✓ Clicked: ${selector}`);
  }

  async fill(selector: string, text: string): Promise<void> {
    console.log(`✍️ Filling ${selector} with: ${text}`);
    await this.page.locator(selector).fill(text);
    console.log(`✓ Filled: ${selector}`);
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async screenshot(name: string): Promise<void> {
    const timestamp = new Date().getTime();
    const filename = `${name}-${timestamp}.png`;
    await this.page.screenshot({ path: `screenshots/${filename}` });
    console.log(`📸 Screenshot saved: ${filename}`);
  }

  async waitForURL(urlPattern: string | RegExp, timeout: number = 5000): Promise<void> {
    console.log(`⏳ Waiting for URL matching: ${urlPattern}`);
    await this.page.waitForURL(urlPattern, { timeout });
    console.log(`✓ URL matched: ${urlPattern}`);
  }
}
