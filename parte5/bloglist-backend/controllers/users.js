const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  console.log('Creating user:', { username, name })

  // Validaciones
  if (!username || !password) {
    return response.status(400).json({ 
      error: 'username and password are required' 
    })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ 
      error: 'username and password must be at least 3 characters long' 
    })
  }

  // Verificar si el username ya existe
  const existingUser = await User.findOne({ username })
  console.log('Existing user:', existingUser)
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  console.log('Password hash created:', passwordHash)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    console.log('User saved:', savedUser)
    response.status(201).json(savedUser)
  } catch (error) {
    console.error('Error saving user:', error)
    response.status(400).json({ error: error.message })
  }
})

module.exports = usersRouter
