import { expect, test } from '@playwright/test';

test('timer loads on startup', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#timer-widget')).toBeVisible();
});

test('timer widget should be in viewport', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#timer-widget')).toBeVisible();
    await expect(page.locator('#timer-widget')).toBeInViewport();
});


test('timer widget has expected buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#timer-widget #timer-start')).toBeVisible();
    await expect(page.locator('#timer-widget #timer-stop')).toBeVisible();
    await expect(page.locator('#timer-widget #timer-reset')).toBeVisible();
});

test('timer widget has expected start time', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#timer-widget #timer-minutes')).toHaveValue('10');
    await expect(page.locator('#timer-widget #timer-seconds')).toHaveValue('00');
});

test('timer widget start, stops, and resets', async ({ page }) => {
    await page.goto('/');

    // Start
    await expect(page.locator('#timer-widget #timer-start')).toBeEnabled();
    await expect(page.locator('#timer-widget #timer-stop')).toBeDisabled();
    await page.click('#timer-widget #timer-start');
    await expect(page.locator('#timer-widget #timer-start')).toBeDisabled();
    await page.waitForTimeout(1000);
    await expect(page.locator('#timer-widget #timer-minutes')).toHaveValue('09');
    await expect(page.locator('#timer-widget #timer-seconds')).toHaveValue('59');

    // Stop
    await expect(page.locator('#timer-widget #timer-stop')).toBeEnabled();
    await page.click('#timer-widget #timer-stop');
    await expect(page.locator('#timer-widget #timer-start')).toBeEnabled();
    await page.waitForTimeout(1000);
    await expect(page.locator('#timer-widget #timer-minutes')).toHaveValue('09');
    await expect(page.locator('#timer-widget #timer-seconds')).toHaveValue('59');

    // Reset
    await page.click('#timer-widget #timer-reset');
    await expect(page.locator('#timer-widget #timer-minutes')).toHaveValue('10');
    await expect(page.locator('#timer-widget #timer-seconds')).toHaveValue('00');
});

test('timer widget stops at 0', async ({ page }) => {
    await page.goto('/');
    await page.fill('#timer-widget #timer-minutes', '00');
    await page.fill('#timer-widget #timer-seconds', '01');
    await page.click('#timer-widget #timer-start');
    await page.waitForTimeout(2000);
    await expect(page.locator('#timer-widget #timer-minutes')).toHaveValue('00');
    await expect(page.locator('#timer-widget #timer-seconds')).toHaveValue('00');
    await expect(page.locator('#timer-widget #timer-start')).toBeEnabled();
    await expect(page.locator('#timer-widget #timer-stop')).toBeDisabled();
});

test('timer widget closes and opens', async ({ page }) => {
    await page.goto('/');
    await page.click('#timer-widget #timer-close');
    await expect(page.locator('#timer-widget')).not.toBeVisible();
    await page.click('#timer-nav-item');
    await expect(page.locator('#timer-widget')).toBeVisible();
});
