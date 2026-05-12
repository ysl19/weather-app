type CoordinatesResult = {
  label: string;
  country: string;
  latitude: number;
  longitude: number;
};

type ReverseGeocodeResult = {
  name: string;
  country: string;
};

export async function getCoordinates(
  city: string
): Promise<CoordinatesResult> {
  const GEOCODE_URL =
    `https://geocoding-api.open-meteo.com/v1/search?` +
    `name=${city}&count=10&language=en&format=json`;

  try {
    const response = await fetch(GEOCODE_URL);

    if (!response.ok) {
      throw new Error("Geocode failed");
    }

    const data = await response.json();

    if (!data.results?.length) {
      throw new Error("City not found");
    }

    const result = data.results[0];

    return {
      label: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getWeather(
  lat: number,
  lon: number
) {
  const params = {
    latitude: lat.toString(),
    longitude: lon.toString(),

    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "weather_code",
    ].join(","),

    hourly: [
      "temperature_2m",
      "wind_speed_10m",
      "weather_code",
    ].join(","),

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "apparent_temperature",
      "is_day",
      "wind_speed_10m",
    ].join(","),

    timezone: "auto",
    temperature_unit: "fahrenheit",
  };

  const queryString = new URLSearchParams(params).toString();

  const url =
    `https://api.open-meteo.com/v1/forecast?${queryString}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather fetch failed");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<ReverseGeocodeResult> {
  const GEOCODE_URL =
    `https://geocoding-api.open-meteo.com/v1/reverse?` +
    `latitude=${lat}&longitude=${lon}&language=en&format=json`;

  try {
    const response = await fetch(GEOCODE_URL);

    if (!response.ok) {
      throw new Error("Reverse Geocode failed");
    }

    const data = await response.json();

    if (!data.results?.length) {
      throw new Error("City not found");
    }

    const result = data.results[0];

    return {
      name: result.name,
      country: result.country,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}