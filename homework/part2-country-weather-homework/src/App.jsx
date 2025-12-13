import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'


function App() {
  const [countryData, setCountryData] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(
    () => {
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
        setCountryData(response.data)
      })
    }, [])

  const handleCountryFilter = (event) => {
    setSelectedCountry(null)
    setCountryFilter(event.target.value)
  }
  const selectCountry = (country) => {
    setSelectedCountry(country)
  }

  const filterLower = countryFilter.toLowerCase();
  const filteredCountryList = countryData.filter((country) => country.name.common.toLowerCase().includes(filterLower))

  return (
    <>
      <Header />
      <CountryFilter countryFilter={countryFilter} onChange={handleCountryFilter} />
      <Content
        countries={filteredCountryList}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />
    </>
  )
}

const Header = () => <h1>Exercises 2.18 - 2.20 - Country Weather App</h1>

const Content = ({ countries, setSelectedCountry, selectedCountry }) => {
  if (selectedCountry) {
    return <CountryInfo country={selectedCountry} />
  }

  if (countries.length > 5) {
    return (
      <>
        Filter matched {countries.length} results, please specify!
      </>
    )
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

  if (countries.length > 0) {
    return <CountryList countries={countries} selectCountry={setSelectedCountry} />
  }

  return null
}

const CountryList = ({ countries, selectCountry }) => {
  return (
    <ul>
      {
        countries.map((country) =>
          <CountryLine
            key={country.name.common}
            country={country}
            selectCountry={selectCountry}
          />
        )}
    </ ul>
  )
}

const CountryLine = ({ country, selectCountry }) => {
  return (
    <li>
      {country.name.common} <button onClick={() => { selectCountry(country) }}>Show</button>
    </ li>
  )
}

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const weather_api_key = import.meta.env.VITE_WEATHER_KEY
    const weather_url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + weather_api_key;
    axios.get(weather_url).then((response) => {
      const rawData = response.data

      const cleanWeather = {
        temp: (rawData.main.temp - 273.15).toFixed(2),
        icon: rawData.weather[0].icon,
        windSpeed: rawData.wind.speed,
        description: rawData.weather[0].description
      }
      setWeather(cleanWeather)
    })
  }, [country])

  if (!weather) {
    return (
      <div>
        <h3>{country.name.common}</h3>
        <p>Loading weather data...</p>
      </div>
    )
  }
  const weatherImgUrl = 'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png'
  const weatherDisplayLocation = country.capital?.[0] || country.name.common

  return (
    <>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.join(', ')}</p>
      <p>Area: {country.area}</p>
      <h4>Languages</h4>
      <ul>
        {
          Object.entries(country.languages || {}).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))
        }
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
      <h3>Weather in {weatherDisplayLocation}</h3>
      <p>Temperature: {weather.temp}ºC</p>
      <img src={weatherImgUrl} alt={weather.description}></img>
      <p>Wind: {weather.windSpeed}m/s</p>
    </>
  )
}

const CountryFilter = ({ countryFilter, onChange }) =>
  <form>
    <p>
      find countries <input value={countryFilter} onChange={onChange}></input>
    </p>
  </form>


export default App
