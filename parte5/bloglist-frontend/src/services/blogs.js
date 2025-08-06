import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'test' 
  ? 'http://localhost:3003/api/blogs'
  : '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log('Token set to:', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('Creating blog with token:', token)
  console.log('Blog data:', newObject)
  console.log('Using baseUrl:', baseUrl)
  
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    console.log('Blog created:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating blog:', error.response?.data || error.message)
    throw error
  }
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove, setToken }