const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  console.log('Creating new blog:', request.body)
  console.log('User from token:', request.user)
  
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // Validar que title y url estén presentes
  if (!body.title || !body.url) {
    return response.status(400).json({ 
      error: 'title and url are required' 
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    console.log('Blog to save:', blog)
    const savedBlog = await blog.save()
    console.log('Blog saved:', savedBlog)
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
    console.log('Populated blog to return:', populatedBlog)
    response.status(201).json(populatedBlog)
  } catch (error) {
    console.error('Error saving blog:', error)
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const blog = await Blog.findById(request.params.id)
    
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    // Verificar que el usuario sea el creador del blog
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'permission denied' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .populate('user', { username: 1, name: 1 })
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = blogsRouter
