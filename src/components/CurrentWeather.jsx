const CurrentWeather = ({ data }) => {
  if (!data) return <div>No Data</div>;
  const formattedTime = new Date(data.current.time).toLocaleString();
  return (
    <div>
      <div>
        <div>
          {data.city}, {data.country}
        </div>
        <div>{formattedTime}</div>
        <div>{data.current.temperature_2m}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex-1 p-6 border rounded-xl shadow-sm text-center">
          {data.current.apparent_temperature}
        </div>
        <div className="flex-1 p-6 border rounded-xl shadow-sm text-center">
          {data.current.relative_humidity_2m}
        </div>
        <div className="flex-1 p-6 border rounded-xl shadow-sm text-center">
          {data.current.wind_speed_10m}
        </div>
        <div className="flex-1 p-6 border rounded-xl shadow-sm text-center">
          {data.current.precipitation}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
