interface FilterProps {
  filter: string
  setFilter: (value: string) => void
}

const Filter = ({ filter, setFilter }: FilterProps) => {
  return (
    <div>
      filtrar por nombre: <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  )
}

export default Filter 