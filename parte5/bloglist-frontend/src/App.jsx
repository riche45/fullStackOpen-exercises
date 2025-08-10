import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch, notify } from './NotificationContext'
import { Container, Button, Typography } from '@mui/material'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const cached = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(['blogs'], cached.concat(newBlog))
      notify(dispatch, `a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
    },
    onError: () => notify(dispatch, 'Error creating blog', 'error'),
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: (updated) => {
      const cached = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(
        ['blogs'],
        cached.map((b) => (b.id !== updated.id ? b : updated))
      )
    },
    onError: () => notify(dispatch, 'Error updating blog', 'error'),
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, id) => {
      const cached = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(
        ['blogs'],
        cached.filter((b) => b.id !== id)
      )
      notify(dispatch, 'Blog removed successfully', 'success')
    },
    onError: () => notify(dispatch, 'Error removing blog', 'error'),
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(dispatch, `welcome ${user.name}`, 'success')
    } catch (exception) {
      notify(dispatch, 'Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    createBlogMutation.mutate(blogObject)
  }

  const updateBlog = async (id, blogObject) => {
    updateBlogMutation.mutate({ id, blog: blogObject })
  }

  const removeBlog = async (id) => {
    removeBlogMutation.mutate(id)
  }

  const loginForm = () => (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Log in to application
      </Typography>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>login</Button>
      </form>
    </Container>
  )

  if (user === null) {
    return loginForm()
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        blogs
      </Typography>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <Button onClick={handleLogout} size="small" variant="outlined">logout</Button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef} data-testid="create-blog-button">
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </Container>
  )
}

export default App