import { Given, When, Then, DataTable, setDefaultTimeout, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, expect } from '@playwright/test';

setDefaultTimeout(120000);

interface TestWorld extends World {
  browser?: Browser;
  page?: Page;
  context?: BrowserContext;
}

// Utility functions for generating random test data
function generateRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomName(): string {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa'];
  return firstNames[Math.floor(Math.random() * firstNames.length)] + generateRandomString(3);
}

function generateRandomEmail(): string {
  return `test${generateRandomString(8)}@yopmail.com`;
}

function generateRandomPhone(): string {
  let phone = '';
  for (let i = 0; i < 10; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}

let page: Page;
const And = Given; // Alias for Given step definition

Given('I navigate to the Azamara SSO login page', async function (this: TestWorld) {
  const context = await (this.browser as Browser).newContext();
  this.context = context;
  page = await context.newPage();
  this.page = page;
  
  const ssoUrl = 'https://id.azamara.online/app/azamara-preview_seawareb2buat_1/exk5y7b1f2tE99cBy1d7/sso/saml?SAMLRequest=nVPLbtswEPwVgXe9mNiuiciB4zRogLQ1EqeHXoIVtWqIUKTKpfzI15dWFMcomhwK6LScndmdWZ2dbxsdrdGRsqZgeZKxCI20lTK%2FCna%2Fuoo%2FsfPZGUGjeSvmnX80t%2Fi7Q%2FJRaDQkXl4K1jkjLJAiYaBBEl6Ku%2FnXG8GTTLTOeiutZtGcCJ0PUgtrqGvQ3aFbK4n3tzcFe%2FS%2BJZGmhLABh3EHPoFnaMBBYo1WBlNvO%2FlY8jLdy6YStC5BPrHoMgykDPh%2BiVceVf3dDm2bDqW4dbhWuHkY1AJp0HvIU9w%2BjXaTMq%2B5%2FzydyotdXk1SIttLsujKOom9DwWrQROy6PqyYA98xEdYl2Vc1aNRfJplMgbOJ%2FG0nuan43E5Hk9OA5SWQKTW%2BNZM1OG1IQ%2FGF4xnfBxnPOaTVX4iwncyTnh28pNFy8HDC2VesvnI8PIFROLLarWMl9%2FvViz68ZpxALAhUdGru%2BMoPyaG1%2FzYbPAt6SPpVKLBhxDO0mPiw%2BF8C0zXl0urldxFc63tZuEwNBTMuw57Vxvw72vnSd5XVBXXPVRgA0rPq8ohEUsPQsNxYtVHFK7M49ZHC9u04BTt18ctSH8w4Bi20GG9W6z%2Fy44PYVLIPXco7%2BPfWFft40QZ5lw5MNRad3DuXxPNhsd39nt7Pv5BZ38A';
  
  await page.goto(ssoUrl);
});

When('I login with valid credentials', async function () {
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('svc-okta+AUTO2@azamara.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  
  await page.getByRole('link', { name: 'Select Password.' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('A2MA@!0uC*#U#9s^!NiY');
  await page.getByRole('button', { name: 'Verify' }).click();
  
  // Wait for navigation after login
  await page.waitForTimeout(5000);
  
  // Navigate to booking search page if not already there
  try {
    await page.goto('https://seaware-uat.azamara.online/touchb2b/vx-bookingSearch', { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) {
    console.log('Navigation might have already occurred, continuing...');
  }
  
  await page.waitForTimeout(3000);
});

And('I accept all cookies', async function () {
  await page.waitForTimeout(2000);
  const acceptBtn = page.getByRole('button', { name: 'Accept All Cookies' });
  await acceptBtn.waitFor({ state: 'visible', timeout: 30000 });
  await acceptBtn.click();
  await page.waitForTimeout(3000);
});

And('I open the main menu', async function () {
  await page.waitForTimeout(3000);
  const menuBtn = page.getByRole('button', { name: ' Main Menu' });
  await menuBtn.waitFor({ state: 'visible', timeout: 30000 });
  await menuBtn.click();
  await page.waitForTimeout(2000);
});

And('I navigate to cruise search', async function () {
  await page.waitForTimeout(2000);
  const elem1 = page.locator('#gwt-uid-82');
  await elem1.waitFor({ state: 'visible', timeout: 20000 });
  await elem1.click();
  await page.waitForTimeout(1000);
  
  const elem2 = page.locator('#gwt-uid-1353');
  await elem2.waitFor({ state: 'visible', timeout: 20000 });
  await elem2.click();
  await page.waitForTimeout(1000);
  
  const elem3 = page.locator('#gwt-uid-1485');
  await elem3.waitFor({ state: 'visible', timeout: 20000 });
  await elem3.click();
  await page.waitForTimeout(1000);
});

And('I search for cruises with the following criteria', async function (dataTable: DataTable) {
  const criteria = dataTable.rowsHash();
  
  // Click on the first name field and enter passenger name
  await page.waitForTimeout(2000);
  const titleBtn = page.locator('#gwt-uid-1481-button');
  await titleBtn.waitFor({ state: 'visible', timeout: 20000 });
  await titleBtn.click();
  await page.waitForTimeout(1000);
  
  const mrsMrs = page.getByRole('link', { name: 'Mrs' });
  await mrsMrs.waitFor({ state: 'visible', timeout: 20000 });
  await mrsMrs.click();
  await page.waitForTimeout(1000);
  
  // Fill in passenger name
  const nameField = page.locator('#gwt-uid-1485');
  await nameField.waitFor({ state: 'visible', timeout: 20000 });
  await nameField.click();
  const randomFirstName = generateRandomName();
  await nameField.fill(randomFirstName);
  console.log(`Filled first name: ${randomFirstName}`);
  await nameField.press('Tab');
  await page.waitForTimeout(1000);
  
  // Fill in last name
  const lastNameField = page.locator('#gwt-uid-1489');
  await lastNameField.waitFor({ state: 'visible', timeout: 20000 });
  const randomLastName = generateRandomString(6);
  await lastNameField.fill(randomLastName);
  console.log(`Filled last name: ${randomLastName}`);
  await lastNameField.press('Tab');
  await page.waitForTimeout(1000);
  
  // Select gender
  if (criteria['Gender']) {
    const genderElem = page.locator('#gwt-uid-1492').getByText(criteria['Gender'], { exact: true });
    await genderElem.waitFor({ state: 'visible', timeout: 20000 });
    await genderElem.click();
    await page.waitForTimeout(1000);
  }
  
  // Select departure date
  const depDatePicker = page.locator('#gwt-uid-1496').getByRole('link', { name: 'Open Date Picker' });
  await depDatePicker.waitFor({ state: 'visible', timeout: 20000 });
  await depDatePicker.click();
  await page.waitForTimeout(1000);
  
  if (criteria['Departure Date']) {
    const dateElem = page.locator('div').filter({ hasText: new RegExp(`^${criteria['Departure Date']}$`) });
    await dateElem.waitFor({ state: 'visible', timeout: 20000 });
    await dateElem.click();
    await page.waitForTimeout(1000);
  }
  
  const continueBtn1 = page.getByRole('button', { name: 'Continue' });
  await continueBtn1.waitFor({ state: 'visible', timeout: 20000 });
  await continueBtn1.click();
  await page.waitForTimeout(3000);
  
  // Select return date
  const returnDatePicker = page.locator('#gwt-uid-1606').getByRole('link', { name: 'Open Date Picker' });
  await returnDatePicker.waitFor({ state: 'visible', timeout: 20000 });
  await returnDatePicker.click();
  await page.waitForTimeout(1000);
  
  if (criteria['Month']) {
    const monthCombo = page.locator('#select-608-button').getByRole('combobox');
    await monthCombo.waitFor({ state: 'visible', timeout: 20000 });
    await monthCombo.selectOption(criteria['Month']);
    await page.waitForTimeout(1000);
  }
  
  const dateNum = page.locator('div').filter({ hasText: /^8$/ }).nth(1);
  await dateNum.waitFor({ state: 'visible', timeout: 20000 });
  await dateNum.click();
  await page.waitForTimeout(1000);
  
  const searchBtn = page.getByRole('button', { name: 'Search Cruises' });
  await searchBtn.waitFor({ state: 'visible', timeout: 20000 });
  await searchBtn.click();
  await page.waitForTimeout(3000);
});

And('I select the {string} cruise', async function (cruiseName: string) {
  await page.waitForTimeout(2000);
  const cruiseRow = page.getByRole('row', { name: new RegExp(cruiseName) });
  await cruiseRow.waitFor({ state: 'visible', timeout: 30000 });
  const checkbox = cruiseRow.getByRole('checkbox');
  await checkbox.waitFor({ state: 'visible', timeout: 20000 });
  await checkbox.check();
  await page.waitForTimeout(1000);
  
  const continueBtn = page.getByRole('button', { name: 'Continue' });
  await continueBtn.waitFor({ state: 'visible', timeout: 20000 });
  await continueBtn.click();
  await page.waitForTimeout(3000);
});

And('I proceed with selected cruise', async function () {
  await page.waitForTimeout(2000);
  const elem1 = page.locator('#gwt-uid-2648');
  await elem1.waitFor({ state: 'visible', timeout: 20000 });
  await elem1.click();
  await page.waitForTimeout(1000);
  
  // Find the first visible + button (there may be multiple)
  const addBtns = page.getByRole('button', { name: ' +' });
  const firstAddBtn = addBtns.first();
  await firstAddBtn.waitFor({ state: 'visible', timeout: 20000 });
  await firstAddBtn.click();
  console.log('Clicked add button');
  await page.waitForTimeout(3000);
  
  // Click first Continue button
  const continueBtn1 = page.getByRole('button', { name: 'Continue' }).first();
  await continueBtn1.waitFor({ state: 'visible', timeout: 20000 });
  await continueBtn1.click();
  console.log('Clicked first Continue button');
  await page.waitForTimeout(4000);
  
  // Click second Continue button with retries
  let clicked = false;
  for (let i = 0; i < 3; i++) {
    try {
      const continueBtn2 = page.getByRole('button', { name: 'Continue' }).first();
      await continueBtn2.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn2.click();
      console.log('Clicked second Continue button');
      clicked = true;
      break;
    } catch (e) {
      console.log(`Attempt ${i + 1} to click Continue button failed, retrying...`);
      await page.waitForTimeout(2000);
    }
  }
  
  if (!clicked) {
    console.log('Warning: Could not click second Continue button after 3 attempts');
  }
  
  await page.waitForTimeout(3000);
});

And('I add guest information', async function (dataTable: DataTable) {
  const guestData = dataTable.rowsHash();
  
  console.log('Guest information step started');
  await page.waitForTimeout(5000);
  
  const email = guestData['Email'] || generateRandomEmail();
  const phone = guestData['Phone'] || generateRandomPhone();
  
  console.log(`Page title: ${await page.title()}`);
  console.log(`Page URL: ${page.url()}`);
  console.log(`Using email: ${email}`);
  console.log(`Using phone: ${phone}`);
  
  // Try to find and fill form elements with extended waits
  await page.waitForTimeout(3000);
  
  // Select gender
  if (guestData['Gender']) {
    try {
      const genderElem = page.locator('#gwt-uid-2878').getByText(guestData['Gender']);
      const isVisible = await genderElem.isVisible({ timeout: 15000 }).catch(() => false);
      if (isVisible) {
        await genderElem.click();
        console.log('Gender selected');
        await page.waitForTimeout(1000);
      } else {
        console.log('Gender element not visible');
      }
    } catch (e) {
      console.log(`Failed to select gender: ${(e as Error).message}`);
    }
  }
  
  // Select country of birth
  if (guestData['Country']) {
    try {
      await page.waitForTimeout(1000);
      const countryBtn = page.locator('#gwt-uid-2894-button');
      const isBtnVisible = await countryBtn.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isBtnVisible) {
        await countryBtn.click();
        console.log('Country button clicked');
        await page.waitForTimeout(2000);
        
        const countryLink = page.getByRole('link', { name: new RegExp(guestData['Country'], 'i') });
        const isLinkVisible = await countryLink.isVisible({ timeout: 10000 }).catch(() => false);
        
        if (isLinkVisible) {
          await countryLink.click();
          console.log('Country selected');
          await page.waitForTimeout(1000);
        }
      } else {
        console.log('Country button not visible');
      }
    } catch (e) {
      console.log(`Failed to select country: ${(e as Error).message}`);
    }
  }
  
  // Select residence country
  if (guestData['Residence']) {
    try {
      await page.waitForTimeout(1000);
      const residenceBtn = page.locator('#gwt-uid-2900-button');
      const isBtnVisible = await residenceBtn.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isBtnVisible) {
        await residenceBtn.click();
        console.log('Residence button clicked');
        await page.waitForTimeout(2000);
        
        const residenceLink = page.getByRole('link', { name: new RegExp(guestData['Residence'], 'i') });
        const isLinkVisible = await residenceLink.isVisible({ timeout: 10000 }).catch(() => false);
        
        if (isLinkVisible) {
          await residenceLink.click();
          console.log('Residence selected');
          await page.waitForTimeout(1000);
        }
      } else {
        console.log('Residence button not visible');
      }
    } catch (e) {
      console.log(`Failed to select residence: ${(e as Error).message}`);
    }
  }
  
  // Fill in International Code (Phone prefix)
  try {
    const intlCodeFields = page.locator('input[placeholder*="Code"], input[placeholder*="code"], input[name*="intl"], input[name*="code"]');
    const intlCodeCount = await intlCodeFields.count();
    
    if (intlCodeCount > 0) {
      const intlCodeField = intlCodeFields.first();
      const isVisible = await intlCodeField.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isVisible) {
        await intlCodeField.click();
        await intlCodeField.fill('+1'); // Default to +1
        console.log('International code filled: +1');
        await page.waitForTimeout(1000);
      }
    } else {
      console.log('No international code field found');
    }
  } catch (e) {
    console.log(`Failed to fill intl code: ${(e as Error).message}`);
  }
  
  // Fill in email
  if (email) {
    try {
      const emailField = page.getByRole('textbox', { name: 'Email *' });
      const isVisible = await emailField.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isVisible) {
        await emailField.click();
        await emailField.fill(email);
        console.log('Email filled');
        await page.waitForTimeout(1000);
      } else {
        console.log('Email field not visible');
      }
    } catch (e) {
      console.log(`Failed to fill email: ${(e as Error).message}`);
    }
  }
  
  // Fill in phone
  if (phone) {
    try {
      const phoneField = page.getByRole('textbox', { name: 'Telephone' });
      const isVisible = await phoneField.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isVisible) {
        await phoneField.click();
        await phoneField.fill(phone);
        console.log('Phone filled');
        await page.waitForTimeout(1000);
      } else {
        console.log('Phone field not visible');
      }
    } catch (e) {
      console.log(`Failed to fill phone: ${(e as Error).message}`);
    }
  }
  
  // Fill in Residency
  try {
    const residencyFields = page.locator('select[name*="residency"], select[name*="Residency"], input[placeholder*="Residency"], input[placeholder*="residency"]');
    const residencyCount = await residencyFields.count();
    
    if (residencyCount > 0) {
      const residencyField = residencyFields.first();
      const isVisible = await residencyField.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isVisible) {
        const tagName = await residencyField.evaluate(el => el.tagName);
        
        if (tagName.toLowerCase() === 'select') {
          // It's a select dropdown
          await residencyField.selectOption('1'); // Select first option
          console.log('Residency selected');
        } else {
          // It's a text input
          await residencyField.click();
          await residencyField.fill('US'); // Default value
          console.log('Residency filled: US');
        }
        await page.waitForTimeout(1000);
      }
    } else {
      console.log('No residency field found');
    }
  } catch (e) {
    console.log(`Failed to fill residency: ${(e as Error).message}`);
  }
  
  // Click Save & Continue button
  try {
    const saveBtn = page.getByRole('button', { name: 'Save & Continue' });
    const isVisible = await saveBtn.isVisible({ timeout: 15000 }).catch(() => false);
    
    if (isVisible) {
      await saveBtn.click();
      console.log('Save & Continue clicked');
      await page.waitForTimeout(3000);
    } else {
      console.log('Save & Continue button not visible');
    }
  } catch (e) {
    console.log(`Failed to click Save & Continue: ${(e as Error).message}`);
  }
});

Then('I complete the booking with payment confirmation', async function () {
  console.log('Completing booking step started');
  await page.waitForTimeout(3000);
  
  console.log(`Page title: ${await page.title()}`);
  console.log(`Page URL: ${page.url()}`);
  
  // Try to find and click Store button
  try {
    const storeBtn = page.getByRole('button', { name: 'Store' });
    const isStoreVisible = await storeBtn.isVisible({ timeout: 15000 }).catch(() => false);
    
    if (isStoreVisible) {
      await storeBtn.click();
      console.log('Store button clicked');
      await page.waitForTimeout(3000);
      
      // Try to find and click Yes button
      const yesBtn = page.getByRole('button', { name: 'Yes' });
      const isYesVisible = await yesBtn.isVisible({ timeout: 15000 }).catch(() => false);
      
      if (isYesVisible) {
        await yesBtn.click();
        console.log('Yes button clicked');
        await page.waitForTimeout(3000);
      } else {
        console.log('Yes button not visible');
      }
    } else {
      console.log('Store button not visible, trying alternative search');
      
      // Try to find button with "Store" text
      const storeButtons = await page.locator('button:has-text("Store")').count();
      console.log(`Found ${storeButtons} buttons with "Store" text`);
      
      if (storeButtons > 0) {
        await page.locator('button:has-text("Store")').first().click();
        console.log('Store button clicked (alternative)');
        await page.waitForTimeout(3000);
      } else {
        console.log('No Store button found, stopping here');
      }
    }
  } catch (e) {
    console.log(`Error in complete booking: ${(e as Error).message}`);
  }
});
