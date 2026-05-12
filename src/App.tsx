import { useEffect, useState } from "react";
import type React from "react";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import UnitToggle from "./components/UnitToggle";
import AIWeatherSummary from "./components/AIWeatherSummary";

import {
  getCoordinates,
  getWeather,
  getWeatherSummary,
} from "./api/weather";

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
    weather_code: number[];
  };
};

type WeatherSummaryDetails = {
  currentTemp: number;
  feelsLike: number;
  todayHigh: number;
  todayLow: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  todayPrecipitation: number;
};

const DEFAULT_LOCATION: Location = {
  lat: 32.7767,
  lon: -96.797,
  label: "Dallas",
  country: "United States",
};

function App() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const [summary, setSummary] = useState<string | null>(null);
  const [summaryDetails, setSummaryDetails] =
    useState<WeatherSummaryDetails | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async (lat: number, lon: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const [weatherData, summaryData] = await Promise.all([
        getWeather(lat, lon),
        getWeatherSummary(lat, lon),
      ]);

      setWeather(weatherData);
      setSummary(summaryData.summary);
      setSummaryDetails(summaryData.details);
    } catch (error) {
      console.error("Failed to load weather:", error);
      setError("Unable to load weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const requestLocation = (): void => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;

        setLocation({
          lat,
          lon,
          label: "Current Location",
        });

        void loadWeather(lat, lon);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Location permission was denied or unavailable.");
      }
    );
  };

  useEffect(() => {
    setLocation(DEFAULT_LOCATION);
    void loadWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const trimmedInput = searchInput.trim();

    if (!trimmedInput) {
      setError("Please enter a city name.");
      return;
    }

    setError(null);

    try {
      const data = await getCoordinates(trimmedInput);

      setLocation({
        lat: data.latitude,
        lon: data.longitude,
        label: data.label,
        country: data.country,
      });

      await loadWeather(data.latitude, data.longitude);
      setSearchInput("");
    } catch (error) {
      console.error("Search failed:", error);
      setError("City not found. Please try another search.");
    }
  };

  return (
    <div className="min-h-screen bg-[#02012b] text-white">
      <nav className="flex justify-between items-center px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            W
          </div>

          <div className="text-lg font-semibold">
            Weather Intelligence
          </div>
        </div>

        <UnitToggle />
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">
            How&apos;s the sky looking today?
          </h1>

          <p className="text-white/60 mb-5">
            Search a city or use your current location.
          </p>

          <div className="flex justify-center mb-5">
            <button
              onClick={requestLocation}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium"
            >
              Use My Location
            </button>
          </div>

          <div className="w-full max-w-xl mx-auto">
            <SearchBar
              value={searchInput}
              onChange={handleInputChange}
              onSubmit={handleSearchSubmit}
            />
          </div>

          {isLoading && (
            <p className="mt-4 text-sm text-white/60">
              Loading weather data...
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-300">
              {error}
            </p>
          )}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentWeather data={weather} location={location} />

            <AIWeatherSummary
              summary={summary}
              details={summaryDetails}
            />

            <DailyForecast data={weather} />
          </div>

          <div className="lg:col-span-1">
            <HourlyForecast data={weather} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;