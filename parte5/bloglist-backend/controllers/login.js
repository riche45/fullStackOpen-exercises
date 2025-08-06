const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log('Login attempt:', { username, password })

  const user = await User.findOne({ username })
  console.log('User found:', user)

  if (!user) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  console.log('Password correct:', passwordCorrect)

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  console.log('Token generated:', token)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
