import { test, expect } from '@playwright/test';

const TARGET_SITES = [
  { name: 'ChatGPT', url: 'https://chatgpt.com', selector: 'main, [role="main"], #__next' },
  { name: 'Claude', url: 'https://claude.ai', selector: 'fieldset, [role="main"]' },
  { name: 'Gemini', url: 'https://gemini.google.com', selector: 'chat-app, .conversation-container' }
];

for (const site of TARGET_SITES) {
  test(`Check DOM structural stability for ${site.name}`, async ({ page }) => {
    await page.goto(site.url, { waitUntil: 'domcontentloaded' });
    const targetElement = page.locator(site.selector).first();
    
    // Assert that key containers exist
    await expect(targetElement).toBeVisible({ timeout: 10000 });
  });
}
