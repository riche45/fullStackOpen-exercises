interface FilterProps {
  searchTerm: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Filter = ({ searchTerm, handleSearchChange }: FilterProps) => {
  return (
    <div>
      filter shown with: <input 
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default Filter 