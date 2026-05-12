import { getWeatherCodeInfo } from "../utils/weatherCode";

type HourlyWeatherData = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
};

type HourlyForecastProps = {
  data: HourlyWeatherData | null;
};

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  if (!data || !data.hourly) return null;

  const { time, temperature_2m, weather_code } = data.hourly;

  const now = new Date();

  const startIndex = time.findIndex(
    (t) => new Date(t).getTime() >= now.getTime()
  );

  const safeStartIndex = startIndex === -1 ? 0 : startIndex;

  const next24Hours = time.slice(safeStartIndex, safeStartIndex + 24);

  return (
    <div className="flex flex-col content-center gap-y-2 p-2 bg-[#25253f] text-white rounded-xl">
      <div className="flex justify-between p-2">
        <h3>Hourly Forecast</h3>
        <div>Scroll</div>
      </div>

      {next24Hours.map((hour, index) => {
        const actualIndex = safeStartIndex + index;
        const weatherInfo = getWeatherCodeInfo(weather_code[actualIndex]);

        const formattedHour = new Date(hour).toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        });

        return (
          <div
            key={hour}
            className="flex justify-between items-center p-3 border rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span title={weatherInfo.label} className="text-xl">
                {weatherInfo.icon}
              </span>

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