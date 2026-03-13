const CurrentWeather = ({ data, location }) => {
  if (!data) return <div>No Data</div>;
  const formattedTime = new Date(data.current.time).toLocaleString();
  return (
    <div>
      <div className="flex justify-between border rounded-xl mb-6 p-4 items-center">
        <div>
          <div>
            {location ? `${location.label}${location.country ? `, ${location.country}` : ""}` : ""}
          </div>
          <div>{formattedTime}</div>
        </div>
        <div className="">{data.current.temperature_2m}°</div>
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
    </div>
  );
};

export default CurrentWeather;
