const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const loginAndSaveSession = async (page, username, password) => {
  const response = await page.request.post('http://localhost:3003/api/login', {
    data: { username, password }
  })
  const body = await response.json()

  await page.evaluate((state) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(state))
  }, body)

  await page.reload()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  
  // Esperar a que el blog aparezca en la lista
  await expect(page.locator('.blog', { hasText: `${title} ${author}` })).toBeVisible()
}

module.exports = { loginWith, createBlog, loginAndSaveSession } 