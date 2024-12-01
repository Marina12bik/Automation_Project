import {expect, test} from '@playwright/test'

const login = async (page, username, password) => {
    await page.locator('[data-test="username"]').fill(username)
    await page.locator('[data-test="password"]').fill(password)
    await page.locator('[data-test="login-button"]').click()

    await page.locator('.title').waitFor({state: 'visible', timeout: 10000}) // what is this waiting needed for? why do you need this? please explain
}

test.describe('Positive Tests, login with different usernames', () => {
    test('Correct credentials', async ({page}) => {
        const testCases = [
            {username: 'standard_user', password: 'secret_sauce'},
            {username: 'problem_user', password: 'secret_sauce'},
            {username: 'performance_glitch_user', password: 'secret_sauce'},
            {username: 'error_user', password: 'secret_sauce'},
            {username: 'visual_user', password: 'secret_sauce'},
        ]

        for (const {username, password} of testCases) {
            // you using the for of loop correctly but you need to put the loop outside of the test case. what i mean that the test need to be inside the loop. check the Test Parameterize of in the project assignment Bonus part for that.
            await page.goto('https://www.saucedemo.com/')

            await login(page, username, password)

            const currentUrl = page.url()
            console.log('Current URL after login:', currentUrl)
            await expect(currentUrl).toBe(
                'https://www.saucedemo.com/inventory.html',
            )

            const inventoryContainer = page.locator('.title')
            await expect(inventoryContainer).toBeVisible()
            await expect(inventoryContainer).toContainText('Products')
        }
    })
})
