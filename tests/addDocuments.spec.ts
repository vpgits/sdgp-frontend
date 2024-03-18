import { test, expect } from "@playwright/test";

test("addDocuments", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await page.click("text=My Documents");
  await page.waitForURL("http://localhost:3000/documents");
  await expect(page).toHaveTitle("Documents | QuizzifyMe");
  await page.click("text=Add Documents");
  await page.waitForURL("http://localhost:3000/documents/add");
  await expect(page).toHaveTitle("Add Document | QuizzifyMe");
  await page.setInputFiles('input[type="file"]', "tests/test.pdf");
  await page.fill('input[name="fileName"]', "Test Document");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000/documents");
  expect(await page.textContent("html")).toContain("Test Document");
});
