import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'
import { useNotificationValue, useNotificationDispatch, notify } from './NotificationContext'

const Notification = () => {
  const message = useNotificationValue()
  if (!message) return null
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }
  return <div style={style}>{message}</div>
}

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes']) || []
      queryClient.setQueryData(['notes'], notes.concat(newNote))
      notify(dispatch, `note '${newNote.content}' created`)
    },
    onError: (err) => {
      notify(dispatch, err?.response?.data?.error || 'failed to create note')
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (updated) => {
      const notes = queryClient.getQueryData(['notes']) || []
      queryClient.setQueryData(
        ['notes'],
        notes.map(n => (n.id !== updated.id ? n : updated))
      )
      notify(dispatch, `note '${updated.content}' toggled`)
    },
    onError: () => notify(dispatch, 'failed to update note')
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value.trim()
    event.target.note.value = ''

    // Validación mínima (6.24)
    if (content.length < 5) {
      notify(dispatch, 'too short note, must have length 5 or more')
      return
    }

    newNoteMutation.mutate({ content, important: true })
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <Notification />
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  )
}

export default App
