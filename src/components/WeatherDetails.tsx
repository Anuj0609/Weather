import React from "react";

export const WeatherDetails = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex flex-row justify-between text-lg font-normal items-center md:px-10 px-4 my-1 text-gray-200">
      <div className="font-semibold">{title}</div>
      <div className="font-light">{value}</div>
    </div>
  );
};
