import { test, expect } from "@playwright/test";

test("preprocess", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/quiz/43f46c83-9a5a-4e68-ae53-4fecffb4f826"
  );
  await page.click("text=scoreCard");
  await page.waitForURL(
    "http://localhost:3000/quiz/43f46c83-9a5a-4e68-ae53-4fecffb4f826/scoreCard"
  );
  await expect(page).toHaveTitle("Quiz Leaderboard | Quizzifyme");
});
