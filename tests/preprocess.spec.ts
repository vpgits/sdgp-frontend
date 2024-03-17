import { test, expect } from "@playwright/test";

test("preprocess", async ({ page }) => {
  await page.goto("http://localhost:3000/documents");
  await page.click("table tr:nth-child(1) td button:nth-child(1)");
  await page.waitForFunction(
    () => {
      const textContent = document.querySelector("html")?.textContent;
      return textContent?.includes("Document processed successfully");
    },
    { timeout: 60000 }
  );
  const pageContent = await page.textContent("html");
  expect(pageContent).toContain("Document processed successfully");
  
});
