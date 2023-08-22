import { expect, test } from '@playwright/test';
test('time tracker loads on startup', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('#timeTracker-widget')).toBeVisible();
});

test('time tracker widgets should be in viewport', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('#timeTracker-widget')).toBeVisible();
	await expect(page.locator('#timeTracker-widget')).toBeInViewport();
});

test('time tracker widget has expected buttons', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('#timeTracker-widget #timeTracker-start')).toBeVisible();
	await expect(page.locator('#timeTracker-widget #timeTracker-stop')).toBeVisible();
	await expect(page.locator('#timeTracker-widget #timeTracker-reset')).toBeVisible();
});

test('time tracker widget has expected start time', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('#timeTracker-widget #timeTracker-time')).toHaveText('00:00:00');
});

test('time tracker widget start, stops, and resets', async ({ page }) => {
	await page.goto('/');

	// Start
	await expect(page.locator('#timeTracker-widget #timeTracker-start')).toBeEnabled();
	await expect(page.locator('#timeTracker-widget #timeTracker-stop')).toBeDisabled();
	await page.click('#timeTracker-widget #timeTracker-start');
	await expect(page.locator('#timeTracker-widget #timeTracker-start')).toBeDisabled();
	await page.waitForTimeout(1000);
	await expect(page.locator('#timeTracker-widget #timeTracker-time')).toHaveText('00:00:01');

	// Stop
	await expect(page.locator('#timeTracker-widget #timeTracker-stop')).toBeEnabled();
	await page.click('#timeTracker-widget #timeTracker-stop');
	await expect(page.locator('#timeTracker-widget #timeTracker-start')).toBeEnabled();
	await page.waitForTimeout(1000);
	await expect(page.locator('#timeTracker-widget #timeTracker-time')).toHaveText('00:00:01');

	// Reset
	await page.click('#timeTracker-widget #timeTracker-reset');
	await expect(page.locator('#timeTracker-widget #timeTracker-time')).toHaveText('00:00:00');
});

test('time tracker widget closes and opens', async ({ page }) => {
	await page.goto('/');
	await page.click('#timeTracker-widget #timeTracker-close');
	await expect(page.locator('#timeTracker-widget')).not.toBeVisible();
	await page.click('#timeTracker-nav-item');
	await expect(page.locator('#timeTracker-widget')).toBeVisible();
});
