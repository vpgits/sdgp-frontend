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

test("create-quiz-normal", async ({ page }) => {
  await page.goto("http://localhost:3000/documents");
  await page.click("table tr:nth-child(1) td button:nth-child(2)");
  const regexPattern1 = /http:\/\/localhost:3000\/documents\/.*\/quiz/;
  const regexPattern2 = /http:\/\/localhost:3000\/quiz\/([0-9a-fA-F-]+)/;
  await page.waitForURL(regexPattern1);
  await expect(page).toHaveTitle("Create Quiz | Quizzifyme");
  await page.fill('input[name="numOfQuestions"]', "3");
  await page.fill("input[name=remarks]", "Test Quiz");
  await page.click('button[type="submit"]');
  await page.waitForFunction(
    () => {
      const textContent = document.querySelector("html")?.textContent;
      return textContent?.includes("Quiz generated successfully");
    },
    { timeout: 120000 }
  );
  const pageContent = await page.textContent("html");
  expect(pageContent).toContain("Quiz generated successfully");
  await page.waitForURL(regexPattern2);
  await expect(page).toHaveTitle("Quiz | Quizzifyme");
  await page.click("button[type=submit]");
  expect(await page.textContent("html")).toContain("Score: 0");
});

test("create-quiz-rapid", async ({ page }) => {
  await page.goto("http://localhost:3000/documents");
  await page.click("table tr:nth-child(1) td button:nth-child(2)");
  const regexPattern1 = /http:\/\/localhost:3000\/documents\/.*\/quiz/;
  const regexPattern2 = /http:\/\/localhost:3000\/quiz\/([0-9a-fA-F-]+)/;
  await page.waitForURL(regexPattern1);
  await expect(page).toHaveTitle("Create Quiz | Quizzifyme");
  await page.click("text=rapid");
  await page.click('button[type="submit"]');
  await page.waitForFunction(
    () => {
      const textContent = document.querySelector("html")?.textContent;
      return textContent?.includes("Quiz generated successfully");
    },
    { timeout: 120000 }
  );
  const pageContent = await page.textContent("html");
  expect(pageContent).toContain("Quiz generated successfully");
  await page.waitForURL(regexPattern2);
  await expect(page).toHaveTitle("Quiz | Quizzifyme");
  await page.click("button[type=submit]");
  expect(await page.textContent("html")).toContain("Score: 0");
});
