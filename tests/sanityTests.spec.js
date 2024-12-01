import { expect, test } from "@playwright/test";

test.describe("Sanity Tests", () => {
  test("buying flow with URL and Title validations", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();

    await page.locator('[data-test="shopping-cart-link"]').click();

    const cartItems = page.locator(".cart_item");
    await expect(cartItems).toHaveCount(2); // Check if there are exactly 2 items in the cart

    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    await expect(page).toHaveTitle("Swag Labs");

    await page.locator('[data-test="firstName"]').fill("Firstname");
    await page.locator('[data-test="lastName"]').fill("Lastname");
    await page.locator('[data-test="postalCode"]').fill("21203");
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    await expect(page).toHaveTitle("Swag Labs");

    await page.locator('[data-test="finish"]').click();

    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });
});

