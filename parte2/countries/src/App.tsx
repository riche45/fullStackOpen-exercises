import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'
import './App.css'

interface Country {
  name: {
    common: string
    official: string
  }
  capital: string[]
  area: number
  languages: { [key: string]: string }
  flags: {
    png: string
    alt: string
  }
}

const App = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  // Log para verificar la API key
  console.log('API Key configurada:', api_key)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const countriesToShow = countries.filter(country => {
    const searchLower = searchTerm.toLowerCase()
    return (
      country.name.common.toLowerCase().includes(searchLower) ||
      country.name.official.toLowerCase().includes(searchLower)
    )
  })

  const renderCountryInfo = (country: Country) => (
    <div className="country-info">
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="200" />
      {country.capital && <Weather city={country.capital[0]} api_key={api_key || ''} />}
    </div>
  )

  return (
    <div>
      <div>
        find countries: <input 
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter a country name..."
        />
      </div>
      <div>
        {countriesToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countriesToShow.length === 1 ? (
          renderCountryInfo(countriesToShow[0])
        ) : (
          <ul>
            {countriesToShow.map(country => (
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => setSearchTerm(country.name.common)}>
                  show
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
