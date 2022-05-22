import { test, expect, Page } from '@playwright/test';

/**
 * create cash flow with test user
 * @param page
 */
export const createCash = async (page: Page, amount: string, note: string) => {
    // Click [data-testid="amount"]
    await page.locator('[data-testid="amount"]').click();
    // Fill [placeholder="Amount"]
    await page.locator('[data-testid="amount"]').fill(amount);
    // Click #mui-2
    await page.locator('[data-testid="note"]').click();
    // Fill #mui-2
    await page.locator('[data-testid="note"]').fill(note);

    // save a screenshot of the cash form with inputs
    await page.screenshot({ path: 'src/tests/results/CREATE_CASH_STEP_1.png' });

    // Click text=Create Value
    await page.locator('text=Create Value').click();

    await page.locator(`text=Note: ${note}`).waitFor();

    await page.locator(`text=Note: ${note}`).click();

    await expect(page.locator(`text=Note: ${note}`)).toContainText(note);

    // save a screenshot of the cash form with inputs
    await page.screenshot({ path: 'src/tests/results/CREATE_CASH_STEP_2.png' });
};
