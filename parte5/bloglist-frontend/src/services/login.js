import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'test' 
  ? 'http://localhost:3003/api/login'
  : '/api/login'

const login = async credentials => {
  console.log('Logging in with credentials:', credentials)
  console.log('Using baseUrl:', baseUrl)
  const response = await axios.post(baseUrl, credentials)
  console.log('Login response:', response.data)
  return response.data
}

export default { login } 