import { WeatherResponse } from "@/pages/weather";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

export const LocationDetails = ({
  weather,
  dayName,
  date,
  reportBackgroundImage,
  locationName,
}: {
  weather: WeatherResponse;
  dayName: string;
  date: string;
  reportBackgroundImage: string;
  locationName: string;
}) => {
  return (
    <div
      className="relative w-full max-w-96 h-[450px] z-30 overflow-hidden bg-cover rounded-lg"
      style={{ backgroundImage: `url(${reportBackgroundImage})` }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-gray-200 text-lg font-sans bg-black bg-opacity-35">
        <div>
          <div className="text-4xl font-bold">{dayName}</div>
          <div className="text-xl font-bold">{date}</div>
          <div className="flex flex-row items-center text-base">
            <CiLocationOn />
            {locationName || "Location"}
            <div className="ml-2">({weather?.name})</div>
          </div>
        </div>
        {weather && (
          <div className="text-gray-200 font-bold flex-col align-bottom mb-3">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
              alt="weather-icon"
            />
            <div className="text-xl">
              {weather.weather[0]?.description.toUpperCase()}
            </div>
            <div className="text-3xl">{weather.main.temp}°C</div>
          </div>
        )}
      </div>
    </div>
  );
};
