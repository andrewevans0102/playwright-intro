import { test, expect } from '@playwright/test';

// Hello World test copied from playwright page https://playwright.dev/docs/intro#first-test
// remove the word "skip" if you want to run this test
test.skip('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');
});
