import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export interface Person {
  name: string
  number: string
  id: number
}

const getAll = () => {
  return axios.get<Person[]>(baseUrl).then(response => response.data)
}

const create = (newPerson: Omit<Person, 'id'>) => {
  return axios.post<Person>(baseUrl, newPerson).then(response => response.data)
}

const remove = (id: number) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id: number, newPerson: Omit<Person, 'id'>) => {
  return axios.put<Person>(`${baseUrl}/${id}`, newPerson).then(response => response.data)
}

export default { getAll, create, remove, update } 