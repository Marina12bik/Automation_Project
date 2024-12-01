import { expect, test } from "@playwright/test";

const login = async (page, username, password) => {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
  await page.locator(".title").waitFor({ state: "visible", timeout: 10000 });
};

const runLoginTests = async (page, testCases) => {
  for (const { username, password } of testCases) {
    await page.goto("https://www.saucedemo.com/");
    await login(page, username, password);

    const currentUrl = page.url();
    console.log("Current URL after login:", currentUrl);
    await expect(currentUrl).toBe("https://www.saucedemo.com/inventory.html");

    const inventoryContainer = page.locator(".title");
    await expect(inventoryContainer).toBeVisible();
    await expect(inventoryContainer).toContainText("Products");
  }
};

test.describe("Positive Tests, login with different usernames", () => {
  test("Correct credentials", async ({ page }) => {
    const testCases = [
      { username: "standard_user", password: "secret_sauce" },
      { username: "problem_user", password: "secret_sauce" },
      { username: "performance_glitch_user", password: "secret_sauce" },
      { username: "error_user", password: "secret_sauce" },
      { username: "visual_user", password: "secret_sauce" },
    ];

    await runLoginTests(page, testCases);
  });
});
