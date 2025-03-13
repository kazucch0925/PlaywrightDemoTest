// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['html'], ['junit', { outputFile: 'playwright-report/junit.xml' }]],
  use: {
    baseURL: process.env.TARGET_URL || 'https://todolist-sample.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
