import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import UnitToggle from "./components/UnitToggle";
import { getCoordinates, getWeather } from "./api/weather";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const location = await getCoordinates(searchInput);

    if (!location) throw new Error("City not found");
    const weather = await getWeather(location.latitude, location.longitude);
    console.log(weather);
    setWeatherData({
      city: location.name,
      country: location.country,
      ...weather,
    });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b p-4">
        <div>Logo</div>
        <div>App Name</div>
        <div>
          <UnitToggle />
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          How's the sky looking today?
        </h1>
        <div className="py-4 w-full max-w-xl">
          <SearchBar
            value={searchInput}
            onChange={handleInputChange}
            onSubmit={handleSearchSubmit}
          />
        </div>
        <div className="w-full max-w-6xl grid grid-cols-3 gap-8 mt-6 ">
          <div className="col-span-2 border-solid p-4">
            <CurrentWeather data={weatherData} />
          </div>
          <div className="border-solid row-span-3">
            <HourlyForecast data={weatherData} />
          </div>
          <div className="col-span-2">
            <DailyForecast data={weatherData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
