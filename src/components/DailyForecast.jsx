const DailyForecast = ({ data }) => {
  if (!data || !data.daily) return null;

  const { time, temperature_2m_max, temperature_2m_min, weather_code } =
    data.daily;

  return (
    <div className="grid grid-cols-7 gap-4">
      {time.map((day, index) => {
        const date = new Date(day);
        const dayName = date.toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <div
            key={day}
            className="p-4 border rounded-xl shadow-sm text-center"
          >
            {/* Day */}
            <div className="font-semibold">{dayName}</div>

            {/* Weather Icon (placeholder for now) */}
            <div className="text-3xl my-2">
              {weather_code[index]}
            </div>

            {/* High / Low */}
            <div className="flex justify-between text-sm mt-2">
              <span>{temperature_2m_max[index]}°</span>
              <span>{temperature_2m_min[index]}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyForecast;
