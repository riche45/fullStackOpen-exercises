import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  // Encontramos el índice de la anécdota con más votos
  // Math.max(...votes) encuentra el valor máximo en el array de votos
  // votes.indexOf(...) encuentra el primer índice de ese valor máximo
  const mostVotesIndex = votes.indexOf(Math.max(...votes))
  // Verificamos si hay algún voto para evitar mostrar la sección si todo está en 0
  const hasAnyVote = votes.some(voteCount => voteCount > 0)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>

      {/* Solo muestra esta sección si hay al menos un voto */}
      {hasAnyVote && (
        <div>
          <h2>Anecdote with most votes</h2>
          {anecdotes[mostVotesIndex]}
          <p>has {votes[mostVotesIndex]} votes</p>
        </div>
      )}
    </div>
  )
}

export default App
