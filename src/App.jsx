import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import HourlyForecast from './components/HourlyForecast'
import UnitToggle from './components/UnitToggle'

const dummyWeatherData = [
  {
    id: 1,
    city: "New York",
    country: "US",
    temperature: 72,
    feelsLike: 70,
    humidity: 50,
    windSpeed: 10,
    precipitation: 0,
  },
  {
    id: 2,
    city: "London",
    country: "UK",
    temperature: 65,
    feelsLike: 63,
    humidity: 60,
    windSpeed: 8,
    precipitation: 1,
  },
  {
    id: 3,
    city: "Tokyo",
    country: "JP",
    temperature: 80,
    feelsLike: 82,
    humidity: 70,
    windSpeed: 12,
    precipitation: 5,
  },
];

function App() {
  const [count, setCount] = useState(0)
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    alert('handleSearchSubmit search submitted');
    const results = dummyWeatherData.filter(item => item.city === searchInput);
    setSearchResults(results);

  }
  return (

    <div className='min-h-screen w-full p-8 bg-white'>
      <nav className='flex justify-between items-center w-full mb-12'>
        <div>
          Logo
        </div>
        <div>
          App Name
        </div>
        <div>
          <UnitToggle />
        </div>
      </nav>
      <h1>
        How's the sky looking today?
      </h1>
      <div className='py-4'>
        <SearchBar value={searchInput} onChange={handleInputChange} onSubmit={handleSearchSubmit} />
      </div>
      <div className='grid grid-cols-3 grid-rows-3 gap-2 h-1/2'>
        <div className='col-span-2 row-span-2 border-solid p-4'>
          <CurrentWeather data={searchResults} />
        </div>
        <div className='row-span-4 border-solid' >
          <HourlyForecast data={searchResults} />
        </div>
        <div className=''>
          <Forecast data={searchResults} />
        </div>

      </div>
    </div>
  )
}

export default App
