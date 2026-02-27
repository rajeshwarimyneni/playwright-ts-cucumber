import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingPage extends BasePage {
  private acceptCookiesBtn = this.page.getByRole('button', { name: 'Accept All Cookies' });
  private mainMenuBtn = this.page.getByRole('button', { name: ' Main Menu' });
  private elem82 = this.page.locator('#gwt-uid-82');
  private elem1353 = this.page.locator('#gwt-uid-1353');
  private elem1485 = this.page.locator('#gwt-uid-1485');

  constructor(page: Page) {
    super(page);
  }

  async acceptCookies(): Promise<void> {
    console.log('Accepting cookies');
    await this.waitForTimeout(2000);
    if (await this.clickElement(this.acceptCookiesBtn, 3000)) {
      console.log('Cookies accepted');
    }
  }

  async openMainMenu(): Promise<void> {
    console.log('Opening main menu');
    await this.waitForTimeout(3000);
    await this.clickElement(this.mainMenuBtn, 2000);
  }

  async navigateToCruiseSearch(): Promise<void> {
    console.log('Navigating to cruise search');
    await this.waitForTimeout(2000);
    
    await this.clickElement(this.elem82, 1000);
    await this.clickElement(this.elem1353, 1000);
    await this.clickElement(this.elem1485, 1000);
  }
}
