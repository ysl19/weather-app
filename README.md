# Weather Intelligence Dashboard

A full-stack weather intelligence dashboard built with React, TypeScript, Vite, Node.js, and Express. The application allows users to search for weather by city, use their current location, view hourly and daily forecasts, and receive an AI-style weather summary generated from real forecast data.

This project was built to demonstrate full-stack application architecture, typed API integration, reusable React components, backend API design, and intelligent weather recommendation logic.

---

## Features

- Search weather by city
- Use browser geolocation to load weather for the user's current location
- Default weather view for Dallas, Texas
- Current weather conditions
- Hourly forecast
- Daily forecast
- Weather condition icons based on Open-Meteo weather codes
- AI-style weather assistant summary
- Full-stack architecture with a dedicated backend API
- TypeScript across frontend and backend
- Loading and error state handling
- Responsive dashboard layout

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript
- CORS

### APIs

- Open-Meteo Forecast API
- Open-Meteo Geocoding API
- Browser Geolocation API

---

## Architecture

```txt
React / Vite Frontend
        |
        v
Frontend API Client
src/api/weather.ts
        |
        v
Express Backend API
server/src/routes/weather.ts
        |
        v
Open-Meteo APIs