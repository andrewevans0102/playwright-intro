import { test, expect } from '@playwright/test';
import { CreateActions, LoginActions } from './actions';

test('make sure the total is updated on page', async ({ page }) => {
    await LoginActions.fullLogin(page);

    await CreateActions.createCash(
        page,
        '100.00',
        'Luke Skywalker paid me for a used lightsaber'
    );

    await expect(page.locator('[data-testid="total"]')).toContainText('$135');
});
