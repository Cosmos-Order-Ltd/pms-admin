import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test('should display users list', async ({ page }) => {
    await page.goto('/users');

    // Check page title and heading
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

    // Check user table exists
    await expect(page.locator('table')).toBeVisible();

    // Check table headers
    await expect(page.getByText('User')).toBeVisible();
    await expect(page.getByText('Role')).toBeVisible();
    await expect(page.getByText('Department')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
  });

  test('should filter users', async ({ page }) => {
    await page.goto('/users');

    // Test search functionality
    await page.fill('input[placeholder*="Search users"]', 'Andreas');

    // Should show filtered results
    await expect(page.getByText('Andreas Georgiou')).toBeVisible();

    // Clear search
    await page.fill('input[placeholder*="Search users"]', '');
  });

  test('should filter by user status', async ({ page }) => {
    await page.goto('/users');

    // Click on active users filter
    await page.selectOption('select', 'active');

    // Should show only active users
    const activeStatuses = page.locator('[data-testid="user-status"]');
    await expect(activeStatuses.first()).toContainText('Active');
  });

  test('should show add user button', async ({ page }) => {
    await page.goto('/users');

    // Check add user button exists
    await expect(page.getByRole('button', { name: 'Add User' })).toBeVisible();
  });

  test('should show user actions', async ({ page }) => {
    await page.goto('/users');

    // Should have edit/delete buttons for each user
    const editButtons = page.locator('button[title*="Edit"]');
    const deleteButtons = page.locator('button[title*="Delete"]');

    await expect(editButtons.first()).toBeVisible();
    await expect(deleteButtons.first()).toBeVisible();
  });
});

test.describe('User Interactions', () => {
  test('should handle user edit action', async ({ page }) => {
    await page.goto('/users');

    // Click edit button for first user
    await page.locator('button[title*="Edit"]').first().click();

    // Should show success message (mock behavior)
    await expect(page.locator('text=Editing')).toBeVisible();
  });

  test('should handle user delete with confirmation', async ({ page }) => {
    await page.goto('/users');

    // Set up dialog handler
    page.on('dialog', dialog => dialog.accept());

    // Click delete button
    await page.locator('button[title*="Delete"]').first().click();

    // Should show success message
    await expect(page.locator('text=has been deleted')).toBeVisible();
  });

  test('should handle add user action', async ({ page }) => {
    await page.goto('/users');

    // Click add user button
    await page.getByRole('button', { name: 'Add User' }).click();

    // Should show modal or form (mock behavior)
    await expect(page.locator('text=User creation form opened')).toBeVisible();
  });
});