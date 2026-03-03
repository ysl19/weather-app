import React from "react";

const HourlyForecast = ({ data }) => {
  if (!data || !data.hourly) return null;

  const { time, temperature_2m } = data.hourly;
  const now = new Date();

  // Find first  hour >= current time
  const startIndex = time.findIndex((t) => new Date(t) >= now);
  const next24Hours = time.slice(startIndex, startIndex + 24);
  return (
    <div className="border rounded-xl p-4 h-full overflow-y-auto">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h3>Hourly Forecast</h3>
          <div>Scroll down bar</div>
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
              <div className="">
                <span>img </span>
                <span>{formattedHour}</span>
              </div>

              <span>{temperature_2m[actualIndex]}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
