import { useState, useEffect } from "react";
import type React from "react";

import SearchBar from "./components/SearchBar"
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import UnitToggle from "./components/UnitToggle";
import { getCoordinates, getWeather } from "./api/weather";
<<<<<<< HEAD:src/App.jsx
=======

type Location = {
  lat: number;
  lon: number;
  label: string;
  country?: string;
};

type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
};
>>>>>>> 6cbe939 (convert to tsx):src/App.tsx

function App() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lon } = position.coords;
<<<<<<< HEAD:src/App.jsx
      setLocation({ lat, lon, label: "Current Location", });
      loadWeather(lat, lon);
    });
=======
>>>>>>> 6cbe939 (convert to tsx):src/App.tsx

      setLocation({
        lat,
        lon,
        label: "Current Location",
      });

      void loadWeather(lat, lon);
    });
  }, []);

  const loadWeather = async (lat: number, lon: number): Promise<void> => {
    const data = await getWeather(lat, lon);
    setWeather(data);
  };

  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>
): void => {
  setSearchInput(e.target.value);
};

const handleSearchSubmit = async (
  e: React.SyntheticEvent<HTMLFormElement>
): Promise<void> => {

    const data = await getCoordinates(searchInput);
<<<<<<< HEAD:src/App.jsx
    setLocation({ lat: data.latitude, lon: data.longitude, label: data.label, country: data.country });
    loadWeather(data.latitude, data.longitude);
=======

    setLocation({
      lat: data.latitude,
      lon: data.longitude,
      label: data.label,
      country: data.country,
    });

    await loadWeather(data.latitude, data.longitude);
>>>>>>> 6cbe939 (convert to tsx):src/App.tsx
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

<<<<<<< HEAD:src/App.jsx
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
=======
      <main className="flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          How&apos;s the sky looking today?
        </h1>

        <div className="py-4 w-full max-w-xl">
          <SearchBar
            value={searchInput}
            onChange={handleInputChange}
            onSubmit={handleSearchSubmit}
          />
        </div>

        <div className="w-full max-w-6xl grid grid-cols-3 gap-8 mt-6">
          <div className="col-span-2 border-solid p-4">
            <CurrentWeather data={weather} location={location} />
          </div>

          <div className="border-solid row-span-3">
            <HourlyForecast data={weather} />
          </div>

          <div className="col-span-2">
>>>>>>> 6cbe939 (convert to tsx):src/App.tsx
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