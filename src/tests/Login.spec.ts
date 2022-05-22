import { test } from '@playwright/test';
import { LoginActions } from './actions';

test('make sure that a user is able to log in', async ({ page }) => {
    await LoginActions.fullLogin(page);

    await page.locator('text=Sign out').click();
});
