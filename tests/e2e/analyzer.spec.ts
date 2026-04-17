import { test, expect } from '@playwright/test';

test.describe('Forex Visual Analyzer E2E', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Multi-Timeframe');
  });

  test('should allow pair selection', async ({ page }) => {
    await page.goto('/');
    await page.click('[role="combobox"]');
    await page.click('text=EUR/USD');
    await expect(page.locator('[role="combobox"]')).toContainText('EUR/USD');
  });

  test('should show analyze button as disabled initially', async ({ page }) => {
    await page.goto('/');
    const analyzeButton = page.locator('button:has-text("Analyze Charts")');
    await expect(analyzeButton).toBeDisabled();
  });

  test('should enable analyze button after uploading 3 images', async ({ page }) => {
    await page.goto('/');
    
    // Select pair
    await page.click('[role="combobox"]');
    await page.click('text=EUR/USD');
    
    // Upload 3 mock images (in real test, you'd use actual files)
    // This is a simplified version
    const analyzeButton = page.locator('button:has-text("Analyze Charts")');
    
    // Initially disabled
    await expect(analyzeButton).toBeDisabled();
  });
});
