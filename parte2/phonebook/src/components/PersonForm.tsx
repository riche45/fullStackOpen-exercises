interface PersonFormProps {
  addPerson: (event: React.FormEvent) => void
  newName: string
  setNewName: (value: string) => void
  newNumber: string
  setNewNumber: (value: string) => void
}

const PersonForm = ({
  addPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber
}: PersonFormProps) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        nombre: <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        número: <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">agregar</button>
      </div>
    </form>
  )
}

export default PersonForm