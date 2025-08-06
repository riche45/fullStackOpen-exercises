const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  console.log('Resetting database...')
  
  const blogResult = await Blog.deleteMany({})
  console.log('Blogs deleted:', blogResult)
  
  const userResult = await User.deleteMany({})
  console.log('Users deleted:', userResult)

  response.status(204).end()
})

module.exports = testingRouter 