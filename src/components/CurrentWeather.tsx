<<<<<<< HEAD:src/components/CurrentWeather.jsx
import bgTodayLarge from "../assets/images/bg-today-large.svg";

const CurrentWeather = ({ data, location }) => {
=======
type Location = {
  label: string;
  country?: string;
};

type CurrentWeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
  };
};

type CurrentWeatherProps = {
  data: CurrentWeatherData | null;
  location: Location | null;
};

const CurrentWeather = ({ data, location }: CurrentWeatherProps) => {
>>>>>>> 6cbe939 (convert to tsx):src/components/CurrentWeather.tsx
  if (!data) return <div>No Data</div>;

  const formattedTime = new Date(data.current.time).toLocaleString();

  return (
<<<<<<< HEAD:src/components/CurrentWeather.jsx
    <div className="flex flex-col " >
      <div className="mb-8 p-4 bg-cover bg-center bg-no-repeat text-white flex  justify-between rounded-lg"
        style={{ backgroundImage: `url(${bgTodayLarge})` }}>
        <div className="flex flex-col justify-center">
          <div className="text-3xl font-bold">
            {location ? `${location.label}${location.country ? `, ${location.country}` : ""}` : ""}
=======
    <div>
      <div className="flex justify-between border rounded-xl mb-6 p-4 items-center">
        <div>
          <div>
            {location
              ? `${location.label}${location.country ? `, ${location.country}` : ""}`
              : ""}
>>>>>>> 6cbe939 (convert to tsx):src/components/CurrentWeather.tsx
          </div>

          <div className="text-xl">{formattedTime}</div>
        </div>
<<<<<<< HEAD:src/components/CurrentWeather.jsx
        <div className="self-center text-8xl">{data.current.temperature_2m}°</div>
=======

        <div>{data.current.temperature_2m}°</div>
>>>>>>> 6cbe939 (convert to tsx):src/components/CurrentWeather.tsx
      </div>

      <div className="flex justify-between gap-x-4">
        <div className="flex-1 py-4 border rounded-xl shadow-sm text-center">
          <h4>Feels Like</h4>
          {data.current.apparent_temperature}°
        </div>

        <div className="flex-1 py-4 border rounded-xl shadow-sm text-center">
          <h4>Humidity</h4>
          {data.current.relative_humidity_2m}%
        </div>

        <div className="flex-1 py-4 border rounded-xl shadow-sm text-center">
          <h4>Wind</h4>
          {data.current.wind_speed_10m} km/h
        </div>

        <div className="flex-1 py-4 border rounded-xl shadow-sm text-center">
          <h4>Precipitation</h4>
          {data.current.precipitation} mm
        </div>
      </div>
    </div >
  );
};

export default CurrentWeather;