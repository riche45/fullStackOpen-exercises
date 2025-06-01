interface Person {
  name: string
  number: string
}

interface PersonsProps {
  persons: Person[]
}

const Persons = ({ persons }: PersonsProps) => {
  return (
    <div>
      {persons.map(person => 
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

export default Persons 