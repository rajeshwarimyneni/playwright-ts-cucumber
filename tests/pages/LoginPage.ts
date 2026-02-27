import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameField = this.page.getByRole('textbox', { name: 'Username' });
  private nextButton = this.page.getByRole('button', { name: 'Next' });
  private selectPasswordLink = this.page.getByRole('link', { name: 'Select Password.' });
  private passwordField = this.page.getByRole('textbox', { name: 'Password' });
  private verifyButton = this.page.getByRole('button', { name: 'Verify' });

  constructor(page: Page) {
    super(page);
  }

  async navigateToSSO(ssoUrl: string): Promise<void> {
    console.log('Navigating to SSO login page');
    await this.page.goto(ssoUrl);
    await this.waitForTimeout(2000);
  }

  async enterUsername(username: string): Promise<boolean> {
    console.log(`Entering username: ${username}`);
    return await this.fillField(this.usernameField, username);
  }

  async clickNext(): Promise<boolean> {
    console.log('Clicking Next button');
    return await this.clickElement(this.nextButton, 2000);
  }

  async selectPassword(): Promise<boolean> {
    console.log('Clicking Select Password link');
    return await this.clickElement(this.selectPasswordLink, 1000);
  }

  async enterPassword(password: string): Promise<boolean> {
    console.log('Entering password');
    return await this.fillField(this.passwordField, password);
  }

  async clickVerify(): Promise<boolean> {
    console.log('Clicking Verify button');
    return await this.clickElement(this.verifyButton, 3000);
  }

  async navigateToBooking(bookingUrl: string): Promise<void> {
    console.log('Navigating to booking search page');
    try {
      await this.page.goto(bookingUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await this.waitForTimeout(3000);
    } catch (e) {
      console.log('Navigation completed or already on page');
    }
  }

  async login(username: string, password: string, bookingUrl: string): Promise<void> {
    await this.enterUsername(username);
    await this.clickNext();
    await this.waitForTimeout(2000);
    
    await this.selectPassword();
    await this.waitForTimeout(1000);
    await this.enterPassword(password);
    await this.clickVerify();
    await this.waitForTimeout(5000);
    
    await this.navigateToBooking(bookingUrl);
  }
}
