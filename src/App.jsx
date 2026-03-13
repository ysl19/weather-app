import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import UnitToggle from "./components/UnitToggle";
import { getCoordinates, getWeather, reverseGeocode } from "./api/weather";

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
      setLocation({ lat, lon, label: "Current Location",   });
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
    setLocation({ lat: data.latitude, lon: data.longitude, label: data.label, country: data.country});
    loadWeather(data.latitude, data.longitude);
    setSearchInput("");
  };

  return (
    <div className="min-h-screen">
      <nav className="flex justify-between border-b p-4 mb-6">
        <div className="flex space-x-4">
          <div>Logo</div>
          <div>App Name</div>
        </div>

        <div>
          <UnitToggle />
        </div>
      </nav>

      <main className="flex flex-col items-center space-y-6">
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
            <CurrentWeather data={weather} location={location} />
          </div>
          <div className="border-solid row-span-3">
            <HourlyForecast data={weather} />
          </div>
          <div className="col-span-2">
            <DailyForecast data={weather} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
