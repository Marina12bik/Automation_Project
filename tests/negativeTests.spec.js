import {expect, test} from '@playwright/test'

const login = async (page, username, password) => {
    await page.locator('[data-test="username"]').fill(username)
    await page.locator('[data-test="password"]').fill(password)
    await page.locator('[data-test="login-button"]').click()
}

test.describe('Negative Tests, login with incorrect credentials', () => {
    test('Incorrect credentials', async ({page}) => {
        const testCases = [
            {
                username: 'locked_out_user',
                password: 'secret_sauce',
                expectedError:
                    'Epic sadface: Sorry, this user has been locked out.',
            },
            {
                username: 'standard_user',
                password: 'wrong_password',
                expectedError:
                    'Epic sadface: Username and password do not match any user in this service',
            },
            {
                username: 'wrong_user',
                password: 'secret_sauce',
                expectedError:
                    'Epic sadface: Username and password do not match any user in this service',
            },
            {
                username: 'user',
                password: 'wrong_pass',
                expectedError:
                    'Epic sadface: Username and password do not match any user in this service',
            },
            {
                username: '',
                password: 'secret_sauce',
                expectedError: 'Epic sadface: Username is required',
            },
            {
                username: 'standard_user',
                password: '',
                expectedError: 'Epic sadface: Password is required',
            },
            {
                username: '',
                password: '',
                expectedError: 'Epic sadface: Username is required',
            },
        ]

        for (const {username, password, expectedError} of testCases) {
            // you using the for of loop correctly but you need to put the loop outside of the test case. what i mean that the test need to be inside the loop. check the Test Parameterize of in the project assignment Bonus part for that.
            await page.goto('https://www.saucedemo.com/')
            await login(page, username, password)

            await expect(page).toHaveURL('https://www.saucedemo.com/')

            const errorMessage = page.locator('.error-message-container')
            await expect(errorMessage).toBeVisible()
            await expect(errorMessage).toContainText(expectedError)
        }
    })
})

// test
