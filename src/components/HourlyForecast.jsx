import React from "react";

const HourlyForecast = ({ data }) => {
  if (!data || !data.hourly) return null;

  const { time, temperature_2m } = data.hourly;
  const now = new Date();

  // Find first  hour >= current time
  const startIndex = time.findIndex((t) => new Date(t) >= now);
  const next24Hours = time.slice(startIndex, startIndex + 24);
  return (
    <div className="flex flex-col content-center gap-y-2 p-2 bg-[#25253f] text-white rounded-xl">
      {/* Header */}
      <div className="flex justify-between p-2">
        <h3>Hourly Forecast</h3>
        <div>Scroll</div>
      </div>

      {/* Scrollable list */}
      <div className="flex flex-col gap-y-2 ">
        {next24Hours.map((hour, index) => (
          <div
            key={hour}
            className="flex justify-between px-2 py-2 h-12 border rounded-md bg-[#2f2f49] text-white justify-items-center"
          >
            <div>
              <span className="px-2">img </span>
              <span>{new Date(hour).toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</span>
            </div>
            <span className="px-2">{temperature_2m[startIndex + index]}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
