import { test, expect, Page } from '@playwright/test';

/**
 * login flow with test user
 * @param page
 */
export const fullLogin = async (page: Page) => {
    const username = process.env.REACT_APP_PLAYWRIGHT_USERNAME;
    if (username === null || username === undefined) {
        throw 'Username is not defined in environment file';
    }

    const password = process.env.REACT_APP_PLAYWRIGHT_PASSWORD;
    if (password === null || password === undefined) {
        throw 'Password is not defined in environment file';
    }

    // Go to http://localhost:3000/
    await page.goto('http://localhost:3000/');

    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();

    // Fill [placeholder="Email"]
    await page.locator('[placeholder="Email"]').fill(username);

    // Press Tab
    await page.locator('[placeholder="Email"]').press('Tab');

    // Fill [placeholder="Password"]
    await page.locator('[placeholder="Password"]').fill(password);
    // Click #radix-2-content-0 button:has-text("Sign in")
    await page.locator('#radix-2-content-0 button:has-text("Sign in")').click();

    const title = page.locator('text=Cash Page');

    await title.waitFor();

    await expect(title).toHaveText('Cash Page');
};
