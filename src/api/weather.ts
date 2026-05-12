const API_BASE_URL = "http://localhost:3001/api/weather";

type CoordinatesResult = {
  label: string;
  country: string;
  latitude: number;
  longitude: number;
};

type WeatherSummaryResult = {
  summary: string;
  details: {
    currentTemp: number;
    feelsLike: number;
    todayHigh: number;
    todayLow: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    todayPrecipitation: number;
  };
};

export async function getCoordinates(
  city: string
): Promise<CoordinatesResult> {
  const response = await fetch(
    `${API_BASE_URL}/coordinates?city=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }

  return response.json();
}

export async function getWeather(
  lat: number,
  lon: number
) {
  const response = await fetch(
    `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}

export async function getWeatherSummary(
  lat: number,
  lon: number
): Promise<WeatherSummaryResult> {
  const response = await fetch(
    `${API_BASE_URL}/summary?lat=${lat}&lon=${lon}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather summary");
  }

  return response.json();
}