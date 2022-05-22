// playwright.config.ts
import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, './local.env') });

const config: PlaywrightTestConfig = {
    webServer: {
        command: 'npm run start', // command to launch
        port: 3000, // port to await for
        timeout: 5 * 60 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    // choose html to create visible report
    reporter: 'html',
    forbidOnly: !!process.env.CI,
    retries: 2,
    timeout: 5 * 60 * 1000,
    globalTimeout: 5 * 60 * 1000,
    use: {
        trace: 'on',
        video: 'on',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
};
export default config;
