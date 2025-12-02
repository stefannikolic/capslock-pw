import { defineConfig, devices } from '@playwright/test';
require('dotenv').config()


export default defineConfig({
  timeout: 20000,
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'retain-on-failure', // on-first-retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});
