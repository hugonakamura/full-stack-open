const { test, describe, expect } = require('@playwright/test')

const URL = 'http://localhost:3001'

describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto(URL)

    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.goto(URL)

    await page.getByRole('button', { name: 'login' }).click()
    // using getByRole first and last
    // await page.getByRole('textbox').first().fill('mluukkai')
    // await page.getByRole('textbox').last().fill('salainen')

    // using .all()
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('mluukkai')
    // await textboxes[1].fill('salainen')

    // better: using getByLabel
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
})