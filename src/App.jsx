import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import UnitToggle from "./components/UnitToggle";
import { getCoordinates, getWeather } from "./api/weather";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lon } = position.coords;
      setLocation({ lat, lon, label: "Current Location", });
      loadWeather(lat, lon);
    });

  }, []);

  const loadWeather = async (lat, lon) => {
    const data = await getWeather(lat, lon);
    setWeather({
      ...data
    });
  }

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const data = await getCoordinates(searchInput);
    setLocation({ lat: data.latitude, lon: data.longitude, label: data.label, country: data.country });
    loadWeather(data.latitude, data.longitude);
    setSearchInput("");
  };

  return (
    <div className="h-screen flex flex-col p-4 bg-[#02012b] text-white">
      {/* Header */}
      <nav className="flex justify-between  p-4 mb-4 flex-none">
        <div className="flex space-x-4">
          <div>Logo</div>
          <div>App Name</div>
        </div>
        <div>
          <UnitToggle />
        </div>
      </nav>

      {/* Main content */}
        <main className="flex-1 grid grid-cols-12 p-4 overflow-hidden">
          <h1 className="text-2xl font-semibold text-center mb-4 col-span-12">
            How's the sky looking today?
          </h1>
          <div className="w-full max-w-xl mb-6 col-span-12 mx-auto">
            <SearchBar
              value={searchInput}
              onChange={handleInputChange}
              onSubmit={handleSearchSubmit}
            />
          </div>

          {/* Grid */}
          <div className="col-span-12 grid grid-cols-12 gap-4 h-full overflow-hidden">
            {/* Current Weather */}
            <div className="col-span-8">
            <CurrentWeather data={weather} location={location} />
            <DailyForecast data={weather} />
            </div>

            {/* Hourly Forecast */}
            <div className="col-span-4 h-full overflow-y-auto">
              <HourlyForecast data={weather} />
            </div>

          {/* Daily Forecast */}
          <div className="col-span-8">

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
