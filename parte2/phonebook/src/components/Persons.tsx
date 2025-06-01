interface Person {
  id: number
  name: string
  number: string
}

interface PersonsProps {
  persons: Person[]
  deletePerson: (id: number) => void
}

const Persons = ({ persons, deletePerson }: PersonsProps) => {
  return (
    <div>
      {persons.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
          <button 
            onClick={() => deletePerson(person.id)}
            className="delete-button"
          >
            eliminar
          </button>
        </div>
      ))}
    </div>
  )
}

export default Persons 