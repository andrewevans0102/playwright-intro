import { test } from '@playwright/test';
import { CreateActions, LoginActions } from './actions';

test('make sure that a cash value can be created', async ({ page }) => {
    await LoginActions.fullLogin(page);

    await CreateActions.createCash(
        page,
        '50.00',
        'Yoda paying for the hiking trip in Dagobah'
    );
});
