type HourlyWeatherData = {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
};

type HourlyForecastProps = {
  data: HourlyWeatherData | null;
};

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  if (!data || !data.hourly) return null;

  const { time, temperature_2m } = data.hourly;

  const now = new Date();

  // Find first hour >= current time
  const startIndex = time.findIndex(
    (t) => new Date(t).getTime() >= now.getTime()
  );

  const next24Hours = time.slice(startIndex, startIndex + 24);

  return (
    <div className="flex flex-col content-center gap-y-2 p-2 bg-[#25253f] text-white rounded-xl">
      {/* Header */}
      <div className="flex justify-between p-2">
        <h3>Hourly Forecast</h3>
        <div>Scroll</div>
      </div>

      {next24Hours.map((hour, index) => {
        const actualIndex = startIndex + index;

        const formattedHour = new Date(hour).toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        });

        return (
          <div
            key={hour}
            className="flex justify-between p-3 border rounded-lg"
          >
            <div>
              <span>img </span>
              <span>{formattedHour}</span>
            </div>

            <span>{temperature_2m[actualIndex]}°</span>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecast;