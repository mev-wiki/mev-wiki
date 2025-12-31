import { test, expect } from '@playwright/test';

async function scrollAndScreenshot(page: any, stepPrefix: string) {
  let scrollCount = 0;
  let previousHeight = -1;

  // Take initial screenshot after click
  await page.screenshot({ path: `screenshots/${stepPrefix}-scroll-${scrollCount}.png` });

  while (true) {
    const currentHeight = await page.evaluate(() => window.pageYOffset);

    // If we haven't moved, we've reached the bottom
    if (currentHeight === previousHeight) {
      break;
    }

    previousHeight = currentHeight;
    scrollCount++;

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500); // Wait for scroll to complete

    // Take screenshot
    await page.screenshot({ path: `screenshots/${stepPrefix}-scroll-${scrollCount}.png` });

    // Check if we've reached the bottom
    const reachedBottom = await page.evaluate(() => {
      return (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight;
    });

    if (reachedBottom) {
      break;
    }
  }

  // Reset scroll to top for next navigation
  await page.evaluate(() => window.scrollTo(0, 0));
}

test('documentation template basic navigation', async ({ page }) => {
  // Test basic navigation through the template documentation
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/');

  await page.screenshot({ path: 'screenshots/step-01-home.png' });

  // Navigate to Getting Started
  await page.screenshot({ path: 'screenshots/step-02-before.png' });
  await page.getByRole('button', { name: 'Getting Started' }).click();
  await scrollAndScreenshot(page, 'step-02');

  // Navigate to Installation
  await page.screenshot({ path: 'screenshots/step-03-before.png' });
  await page.getByRole('link', { name: 'Installation' }).click();
  await scrollAndScreenshot(page, 'step-03');

  // Navigate to Configuration
  await page.screenshot({ path: 'screenshots/step-04-before.png' });
  await page.getByRole('link', { name: 'Configuration' }).click();
  await scrollAndScreenshot(page, 'step-04');

  // Navigate back to home
  await page.screenshot({ path: 'screenshots/step-05-before.png' });
  await page.getByRole('link', { name: 'Documentation' }).first().click();
  await scrollAndScreenshot(page, 'step-05');
});
