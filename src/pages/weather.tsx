import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";

export default function WeatherResult() {
  const API = "42feaff7e7f178aec2c9ec08ddc1de79";
  const router = useRouter();
  const { lat, lon, name: locationName } = router.query;
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const getWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
        const result = await axios.get(url);
        setWeather(result.data);
      } catch (err) {
        setError("Error fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [lat, lon]);

  const currentDate = new Date();
  const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const date = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleChangeLocation = () => {
    router.push("/");
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: 'url("/weather-bg.jpg")' }}
      ></div>
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="relative w-96 h-[450px] z-30">
          <img
            src="/report-bg.jpg"
            className="w-full h-full rounded-2xl shadow-lg object-cover"
            alt="Background"
          />
          <div>
            <div className="absolute inset-0 flex flex-col justify-between m-6 text-black text-xl font-medium">
              <div>
                <div className="text-3xl">{dayName}</div>
                <div>{date}</div>
                <div className="flex flex-row items-center text-sm">
                  <CiLocationOn />
                  {locationName || "Location"}
                </div>
              </div>
              {weather && (
                <div className="text-black font-bold flex-col align-bottom mb-3">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
                    alt="weather-icon"
                  />
                  <div>{weather.weather[0]?.description.toUpperCase()}</div>
                  <div>{weather.main.temp}°C</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#222831] bg-opacity-80 w-96 h-[400px] rounded-lg -ml-2 z-10 flex justify-center flex-col shadow-lg">
          <div className="flex flex-row justify-between text-lg font-semibold items-center mx-10 px-10 my-1">
            <div>RAIN</div>
            <div>{weather?.rain ? "YES" : "NO"}</div>
          </div>
          <div className="flex flex-row justify-between text-lg font-semibold items-center mx-10 px-10 my-1">
            <div>HUMIDITY</div>
            <div>{weather?.main.humidity || "N/A"}%</div>
          </div>
          <div className="flex flex-row justify-between text-lg font-semibold items-center mx-10 px-10 my-1">
            <div>WIND</div>
            <div>{weather?.wind.speed || "N/A"} km/h</div>
          </div>
          <button
            onClick={handleChangeLocation}
            className="flex items-center justify-center mt-10 text-black bg-[#EECEB9] px-4 py-1 rounded-lg hover:bg-[#D4B29C] m-14 mb-4 font-bold"
          >
            <CiLocationOn className="mr-2" />
            Change Location
          </button>
        </div>
      </div>
    </div>
  );
}
