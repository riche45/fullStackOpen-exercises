import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

interface Person {
  id: number
  name: string
  number: string
}

const getAll = async (): Promise<Person[]> => {
  const response = await axios.get<Person[]>(baseUrl)
  return response.data
}

const create = async (newPerson: Omit<Person, 'id'>): Promise<Person> => {
  const response = await axios.post<Person>(baseUrl, newPerson)
  return response.data
}

const update = async (id: number, updatedPerson: Omit<Person, 'id'>): Promise<Person> => {
  const response = await axios.put<Person>(`${baseUrl}/${id}`, updatedPerson)
  return response.data
}

const remove = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  remove
} 