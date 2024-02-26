import { test, expect } from "@playwright/test";

test("login-default", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "superuser@sdgp");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000/dashboard");
  await expect(page).toHaveTitle("Dashboard | Quizzifyme");
});

// test("signup-default", async ({ page }) => {
//   await page.goto("http://localhost:3000/login");
//   await page.click('p:has-text("Sign up")');
//   await page.waitForURL("http://localhost:3000/login");
//   await expect(page).toHaveTitle("Login | Quizzifyme");
//   await page.fill('input[name="name"]', "playwright");
//   await page.fill('input[name="email"]', "playwright@sdgp");
//   await page.fill('input[name="password"]', "password");
//   await page.click('button[type="submit"]');
//   await page.waitForURL("http://localhost:3000/login");
//   await expect(page).toHaveTitle("Login | Quizzifyme");
// });

test("login-google", async ({ page }) => {
  
});
