import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    actionTimeout: 0,
    trace: 'on-first-retry',
    video: 'off',
  },

  projects: [
    // Chrome
    {
      name: 'chromium',
      grep: /@desktop/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'chromium.mobile',
      grep: /@mobile/,
      use: {
        ...devices['Galaxy S8'],
      },
    },
    {
      name: 'chromium.tablet',
      grep: /@tablet/,
      use: {
        ...devices['iPad Mini'],
        defaultBrowserType: 'chromium',
      },
    },

    {
      name: 'firefox',
      // Firefox mobile is not supported yet
      grep: /@desktop/,
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
        // Firefox is strict with ssl
        ignoreHTTPSErrors: Boolean(process.env.IS_LOCAL),
      },
    },

    // // Webkit
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     ignoreHTTPSErrors: Boolean(process.env.IS_LOCAL),
    //   },
    // },
    // {
    //   name: 'webkit.mobile',
    //   use: {
    //     ...devices['iPhone 12'],
    //     ignoreHTTPSErrors: Boolean(process.env.IS_LOCAL),
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.IS_LOCAL
    ? [
        {
          command: 'pnpm start',
          port: 3000,
        },
      ]
    : undefined,
});
