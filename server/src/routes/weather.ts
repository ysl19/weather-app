import { Router } from "express";

const router = Router();

router.get("/coordinates", async (req, res) => {
  const city = req.query.city;

  if (!city || typeof city !== "string") {
    return res.status(400).json({
      error: "City is required",
    });
  }

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?` +
    `name=${encodeURIComponent(city)}&count=10&language=en&format=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({
        error: "Failed to fetch coordinates",
      });
    }

    const data = await response.json();

    if (!data.results?.length) {
      return res.status(404).json({
        error: "City not found",
      });
    }

    const result = data.results[0];

    return res.json({
      label: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/forecast", async (req, res) => {
  const { lat, lon } = req.query;

  if (
    !lat ||
    !lon ||
    typeof lat !== "string" ||
    typeof lon !== "string"
  ) {
    return res.status(400).json({
      error: "Latitude and longitude required",
    });
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,

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
  });

  const url =
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({
        error: "Failed to fetch weather",
      });
    }

    const data = await response.json();

    return res.json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/summary", async (req, res) => {
  const { lat, lon } = req.query;

  if (
    !lat ||
    !lon ||
    typeof lat !== "string" ||
    typeof lon !== "string"
  ) {
    return res.status(400).json({
      error: "Latitude and longitude required",
    });
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "apparent_temperature",
      "wind_speed_10m",
      "weather_code",
    ].join(","),

    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "weather_code",
    ].join(","),

    timezone: "auto",
    temperature_unit: "fahrenheit",
  });

  const url =
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({
        error: "Failed to fetch weather summary data",
      });
    }

    const data = await response.json();

    const currentTemp = data.current.temperature_2m;
    const feelsLike = data.current.apparent_temperature;
    const humidity = data.current.relative_humidity_2m;
    const windSpeed = data.current.wind_speed_10m;
    const precipitation = data.current.precipitation;

    const todayHigh = data.daily.temperature_2m_max[0];
    const todayLow = data.daily.temperature_2m_min[0];
    const todayPrecipitation = data.daily.precipitation_sum[0];

    const insights: string[] = [];

    if (currentTemp >= 90) {
      insights.push(
        "It is very hot today, so stay hydrated and avoid long outdoor activity during peak afternoon hours."
      );
    } else if (currentTemp >= 75) {
      insights.push(
        "Temperatures are warm and comfortable for most outdoor plans."
      );
    } else if (currentTemp <= 40) {
      insights.push("It is cold today, so dress warmly before heading out.");
    } else {
      insights.push(
        "Temperatures are mild today with generally comfortable conditions."
      );
    }

    if (todayPrecipitation > 0.1 || precipitation > 0) {
      insights.push(
        "Rain is possible, so carrying an umbrella or light rain jacket would be a good idea."
      );
    }

    if (windSpeed >= 20) {
      insights.push(
        "Winds are stronger than usual, so be cautious with outdoor activities."
      );
    }

    if (humidity >= 75) {
      insights.push(
        "Humidity is high, so it may feel warmer or more uncomfortable than the actual temperature."
      );
    }

    const summary = insights.join(" ");

    return res.json({
      summary,
      details: {
        currentTemp,
        feelsLike,
        todayHigh,
        todayLow,
        humidity,
        windSpeed,
        precipitation,
        todayPrecipitation,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;