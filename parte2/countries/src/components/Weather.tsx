import { useState, useEffect } from 'react'
import axios from 'axios'

interface WeatherProps {
  city: string
  api_key: string
}

interface WeatherData {
  main: {
    temp: number
    humidity: number
    feels_like: number
  }
  weather: Array<{
    description: string
    icon: string
    main: string
  }>
  wind: {
    speed: number
  }
}

const Weather = ({ city, api_key }: WeatherProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (city) {
      setIsLoading(true)
      setError(null)

      // Intentar con ambas API keys
      const apiKeys = [
        '9bd1e259d568fc9f6f96a6c795959733', // curso
        '8a033290ded27286453c98774d276e12'  // default
      ]

      // Codificar el nombre de la ciudad para la URL
      const encodedCity = encodeURIComponent(city)

      // Función para intentar con una API key específica
      const tryWithApiKey = async (key: string) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${key}&units=metric`
        console.log(`Intentando con API key: ${key}`)
        console.log('URL completa:', url)

        try {
          const response = await axios.get(url)
          console.log('¡Éxito! Respuesta:', response.data)
          setWeather(response.data)
          setError(null)
          return true
        } catch (error: any) {
          console.log(`Error con API key ${key}:`, error.response?.data)
          return false
        }
      }

      // Intentar con todas las API keys
      const tryAllKeys = async () => {
        for (const key of apiKeys) {
          const success = await tryWithApiKey(key)
          if (success) {
            setIsLoading(false)
            return
          }
        }
        
        setError('No se pudo obtener el clima con ninguna API key. Por favor genera una nueva API key en OpenWeather.')
        setIsLoading(false)
      }

      tryAllKeys()
    }
  }, [city])

  if (isLoading) {
    return (
      <div className="weather-container">
        <p>Cargando información del clima...</p>
        <p><small>Intentando conectar con OpenWeather API...</small></p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-container">
        <p style={{ color: 'red' }}>{error}</p>
        <p>Instrucciones para obtener una nueva API key:</p>
        <ol>
          <li>Ve a <a href="https://home.openweathermap.org/api_keys" target="_blank" rel="noopener noreferrer">OpenWeather API Keys</a></li>
          <li>Inicia sesión o crea una cuenta</li>
          <li>Haz clic en "Generate API Key"</li>
          <li>Espera aproximadamente 2 horas para que se active</li>
          <li>Agrega la nueva API key al archivo .env</li>
        </ol>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <div className="weather-container">
      <h3>Clima en {city}</h3>
      <div className="weather-info">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <div>
          <p><strong>Condición:</strong> {weather.weather[0].main}</p>
          <p><strong>Temperatura:</strong> {weather.main.temp.toFixed(1)}°C</p>
          <p><strong>Sensación térmica:</strong> {weather.main.feels_like.toFixed(1)}°C</p>
          <p><strong>Humedad:</strong> {weather.main.humidity}%</p>
          <p><strong>Viento:</strong> {weather.wind.speed.toFixed(1)} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default Weather 