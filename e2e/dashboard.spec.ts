import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test('should display dashboard with key metrics', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/PMS Admin/);

    // Check dashboard heading
    await expect(page.getByRole('heading', { name: 'Dashboard Overview' })).toBeVisible();

    // Check key metrics cards are present
    await expect(page.getByText('Total Properties')).toBeVisible();
    await expect(page.getByText('Active Reservations')).toBeVisible();
    await expect(page.getByText('Check-ins Today')).toBeVisible();
    await expect(page.getByText('Monthly Revenue')).toBeVisible();
  });

  test('should navigate to users page', async ({ page }) => {
    await page.goto('/');

    // Click on users navigation or card
    await page.click('text=Users');

    // Should navigate to users page
    await expect(page).toHaveURL(/.*\/users/);
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  });

  test('should show recent activities', async ({ page }) => {
    await page.goto('/');

    // Check recent activities section
    await expect(page.getByText('Recent Activities')).toBeVisible();

    // Should have some activity items (mock data)
    const activityItems = page.locator('[data-testid="activity-item"]');
    await expect(activityItems.first()).toBeVisible();
  });

  test('should display charts and analytics', async ({ page }) => {
    await page.goto('/');

    // Check analytics section
    await expect(page.getByText('Analytics')).toBeVisible();

    // Should have chart containers
    await expect(page.locator('[data-testid="revenue-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="occupancy-chart"]')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check mobile menu toggle exists
    await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();

    // Check dashboard content is still accessible
    await expect(page.getByRole('heading', { name: 'Dashboard Overview' })).toBeVisible();
  });

  test('should work on tablet devices', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Check layout adapts for tablet
    await expect(page.getByRole('heading', { name: 'Dashboard Overview' })).toBeVisible();

    // Metrics should be visible and properly laid out
    await expect(page.getByText('Total Properties')).toBeVisible();
  });
});