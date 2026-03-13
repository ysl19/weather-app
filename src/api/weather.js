export async function getCoordinates(city) {
  const GEOCODE_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  
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

export async function getWeather(lat, lon) {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    hourly: ["temperature_2m", "wind_speed_10m", "weather_code"],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "apparent_temperature",
      "is_day",
      "wind_speed_10m",
    ],
    timezone: "auto",
    temperature_unit: "fahrenheit",
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `https://api.open-meteo.com/v1/forecast?${queryString}`;
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

export async function reverseGeocode(lat, lon){
  const GEOCODE_URL = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=en&format=json`

  try {
    const response = await fetch(GEOCODE_URL);

    if (!response.ok) {
      throw new Error("Reverse Geocode failed");
    }

    const data = await response.json();
    console.log(data);
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