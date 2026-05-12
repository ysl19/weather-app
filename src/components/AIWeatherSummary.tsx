type WeatherSummaryDetails = {
  currentTemp: number;
  feelsLike: number;
  todayHigh: number;
  todayLow: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  todayPrecipitation: number;
};

type AIWeatherSummaryProps = {
  summary: string | null;
  details: WeatherSummaryDetails | null;
};

const AIWeatherSummary = ({
  summary,
  details,
}: AIWeatherSummaryProps) => {
  if (!summary || !details) {
    return (
      <div className="p-4 rounded-xl bg-[#25253f] text-white border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">AI Weather Assistant</h3>

          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">
            Waiting
          </span>
        </div>

        <p className="text-sm text-white/60">
          Search a city or use your location to generate a weather summary.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-[#25253f] text-white border border-white/10 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">AI Weather Assistant</h3>

        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-200">
          Smart Summary
        </span>
      </div>

      <p className="text-sm text-white/80 leading-relaxed mb-4">
        {summary}
      </p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-white/50">Current Temp</div>
          <div className="font-semibold">{details.currentTemp}°</div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-white/50">Feels Like</div>
          <div className="font-semibold">{details.feelsLike}°</div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-white/50">High / Low</div>
          <div className="font-semibold">
            {details.todayHigh}° / {details.todayLow}°
          </div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-white/50">Humidity</div>
          <div className="font-semibold">{details.humidity}%</div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-white/50">Wind</div>
          <div className="font-semibold">{details.windSpeed} mph</div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-white/50">Precipitation</div>
          <div className="font-semibold">
            {details.todayPrecipitation} in
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWeatherSummary;