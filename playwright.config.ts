import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const authStatePath = 'playwright/.auth/storageState.json';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/dom-check.spec.ts',
  fullyParallel: true,
  timeout: 30_000,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: true,
    storageState: existsSync(authStatePath) ? authStatePath : undefined,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  }
});