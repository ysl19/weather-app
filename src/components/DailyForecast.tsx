import { getWeatherCodeInfo } from "../utils/weatherCode";

type DailyWeatherData = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};

type DailyForecastProps = {
  data: DailyWeatherData | null;
};

const DailyForecast = ({ data }: DailyForecastProps) => {
  if (!data || !data.daily) return null;

  const {
    time,
    temperature_2m_max,
    temperature_2m_min,
    weather_code,
  } = data.daily;

  return (
    <div className="grid grid-cols-7 gap-4 mt-24">
      {time.map((day, index) => {
        const date = new Date(day);

        const dayName = date.toLocaleDateString("en-US", {
          weekday: "short",
        });

        const weatherInfo = getWeatherCodeInfo(weather_code[index]);

        return (
          <div
            key={day}
            className="p-4 border rounded-xl shadow-sm text-center bg-[#25253f] text-white"
          >
            {/* Day */}
            <div className="font-semibold">{dayName}</div>

            {/* Weather Icon */}
            <div
              className="text-3xl my-2"
              title={weatherInfo.label}
            >
              {weatherInfo.icon}
            </div>

            {/* Weather Label */}
            <div className="text-xs text-white/70 min-h-8">
              {weatherInfo.label}
            </div>

            {/* High / Low */}
            <div className="flex justify-between text-sm mt-3">
              <span>{temperature_2m_max[index]}°</span>
              <span className="text-white/60">
                {temperature_2m_min[index]}°
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyForecast;