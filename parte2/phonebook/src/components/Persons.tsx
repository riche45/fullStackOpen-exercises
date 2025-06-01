import type { Person } from '../services/persons'

interface PersonsProps {
  persons: Person[]
  onDelete: (person: Person) => void
}

const Persons = ({ persons, onDelete }: PersonsProps) => {
  return (
    <div>
      {persons.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons 