import { test, expect } from '@playwright/test';
import { LoginActions } from './actions';

test('make sure a cash value can be deleted', async ({ page }) => {
    await LoginActions.fullLogin(page);

    // Click text=PaymentDate: 4/2/2022 at 10:00:54 AM
    const deletedCash = page.locator(
        'text=PaymentDate: 4/2/2022 at 10:00:54 AM'
    );
    await deletedCash.click();

    // Click .MuiButton-root.MuiButton-text >> nth=0
    await page.locator('.MuiButton-root.MuiButton-text').first().click();

    // verify the deleted value is not there anymore
    await expect(deletedCash).not.toBeVisible();
});
