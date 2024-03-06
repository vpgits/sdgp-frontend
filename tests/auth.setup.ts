import { test as setup, expect } from "@playwright/test";

// const authFile = "playwright/regular-auth.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "superuser@sdgp");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000/dashboard");
  await expect(page).toHaveTitle("Dashboard | Quizzifyme");
  // const cookies = await page.context().cookies();
  // const fs = require('fs');
  // fs.writeFileSync(authFile, JSON.stringify(cookies, null, 2));
  await page.context().storageState({ path: "playwright/regular-state.json" });
  // console.log("Authentication file created");
});
