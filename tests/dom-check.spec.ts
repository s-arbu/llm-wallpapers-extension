import { chromium, test as base, expect, type BrowserContext } from '@playwright/test';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const authStatePath = resolve('playwright/.auth/storageState.json');
const hasAuthState = existsSync(authStatePath);
const browserChannel = process.env.PLAYWRIGHT_CHANNEL === 'chrome' ? 'chrome' : undefined;

const test = base.extend<{ extensionContext: BrowserContext }>({
  extensionContext: async ({}, use) => {
    const userDataDir = await mkdtemp(resolve(tmpdir(), 'llm-wallpapers-'));
    const extensionPath = resolve('dist');
    const authState = hasAuthState
      ? JSON.parse(await readFile(authStatePath, 'utf8')) as {
          cookies?: Parameters<BrowserContext['addCookies']>[0];
          origins?: Array<{ origin: string; localStorage: Array<{ name: string; value: string }> }>;
        }
      : undefined;
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: browserChannel,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`
      ]
    });

    if (authState?.cookies) await context.addCookies(authState.cookies);
    if (authState?.origins) {
      await context.addInitScript(({ origins }) => {
        const storage = origins.find((entry) => entry.origin === window.location.origin)?.localStorage;
        if (!storage) return;
        for (const entry of storage) window.localStorage.setItem(entry.name, entry.value);
      }, { origins: authState.origins });
    }

    await use(context);
    await context.close();
    await rm(userDataDir, { recursive: true, force: true });
  }
});

test.describe.configure({ mode: 'serial' });

const TARGET_SITES = [
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com',
    authenticatedUrl: 'https://chatgpt.com',
    selector: 'main, [role="main"], #__next'
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    authenticatedUrl: 'https://claude.ai/new',
    selector: 'fieldset, [role="main"]'
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    authenticatedUrl: 'https://gemini.google.com/app',
    selector: 'chat-app, .conversation-container'
  }
];

for (const site of TARGET_SITES) {
  test(`Check DOM structural stability for ${site.name}`, async ({ page }) => {
    await page.goto(site.url, { waitUntil: 'domcontentloaded' });
    const targetElement = page.locator(site.selector).first();
    
    // Assert that key containers exist
    await expect(targetElement).toBeVisible({ timeout: 10000 });
  });

  test(`Loads wallpaper UI for ${site.name}`, async ({ extensionContext }) => {
    const page = await extensionContext.newPage();
    await page.goto(site.url, { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#llm-wallpaper-overlay')).toBeAttached({ timeout: 10000 });
    await expect(
      page.locator(`link[data-llm-wallpaper-provider="${site.name.toLowerCase()}"]`)
    ).toBeAttached({ timeout: 10000 });

    const overlay = page.locator('#llm-wallpaper-overlay');
    await expect(overlay).toHaveCSS('opacity', '0.15');
    await expect(overlay).toHaveCSS('filter', 'blur(0px)');
  });

  test(`Checks authenticated route for ${site.name}`, async ({ extensionContext }) => {
    test.skip(!hasAuthState, 'Provide playwright/.auth/storageState.json to run authenticated checks');

    const page = await extensionContext.newPage();
    await page.goto(site.authenticatedUrl, { waitUntil: 'domcontentloaded' });

    await expect(page).not.toHaveURL(/\/login|\/signin|\/auth\//, { timeout: 10000 });
    await expect(page.locator(site.selector).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#llm-wallpaper-overlay')).toBeAttached({ timeout: 10000 });
  });
}
