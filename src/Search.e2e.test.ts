import { test, expect } from '@playwright/test';

test('should navigate to the correct URL when search form is submitted', async ({ page }) => {
  // Navigate to your app (replace with your app's URL)
  await page.goto('http://localhost:3000');  // Change the URL as needed
  
  // Select the input field and submit button
  const input = await page.locator('input[placeholder="Search by title"]');
  const button = await page.locator('button.MuiButtonBase-root:nth-child(4)');
  
  // Type into the input field
  await input.fill('dermato');
  
  // Click the submit button
  await button.click();
  
  // Wait for the URL to change (after form submission)
  await page.waitForURL('/search?query=test+query');  // Adjust this to your expected URL
  
  // Assert the URL is updated correctly
  expect(page.url()).toBe('http://localhost:3000/search?query=test+query');
});
