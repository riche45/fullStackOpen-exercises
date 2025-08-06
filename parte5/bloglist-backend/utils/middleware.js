const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log('Authorization header:', authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    console.log('Token extracted:', request.token)
  } else {
    request.token = null
    console.log('No token found in request')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      console.log('Decoded token:', decodedToken)
      if (decodedToken.id) {
        request.user = await User.findById(decodedToken.id)
        console.log('User found:', request.user)
      }
    } catch (error) {
      console.error('Error verifying token:', error)
      return response.status(401).json({ error: 'token invalid' })
    }
  } else {
    console.log('No token to extract user from')
  }
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}
