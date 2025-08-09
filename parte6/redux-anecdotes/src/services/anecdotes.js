import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const createNew = async (content) => {
  const anecdote = { content, votes: 0 }
  const { data } = await axios.post(baseUrl, anecdote)
  return data
}

export const updateVotes = async (anecdote) => {
  const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1
  })
  return data
} 