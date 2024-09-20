import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";

type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const weatherType = [
  { name: "Clear", image: "/clear-sky.avif" },
  { name: "Clouds", image: "/few-clouds.jpg" },
  { name: "Mist", image: "/mist.jpg" },
  { name: "Rain", image: "/rain.jpg" },
  { name: "Snow", image: "/snow.jpg" },
  { name: "Thunderstorm", image: "/thunderstorm.jpg" },
  { name: "Smoke", image: "/Smoke.jpg" },
  { name: "Haze", image: "/Haze.jpg" },
  { name: "Dust", image: "/Dust.jpg" },
  { name: "Fog", image: "/Fog.jpg" },
  { name: "Sand", image: "/Sand.jpg" },
  { name: "Ash", image: "/Ash.jpg" },
  { name: "Squall", image: "/Squall.jpg" },
  { name: "Tornado", image: "/Tornado.jpg" },
  { name: "Ash", image: "/Ash.jpg" },
];


export default function WeatherResult() {
  const API = "42feaff7e7f178aec2c9ec08ddc1de79";
  const router = useRouter();
  const { lat, lon, name: locationName } = router.query;
  const [weather, setWeather] = useState<WeatherResponse>();
  const [reportBackgroundImage, setReportBackgroundImage] =
    useState("/weather-bg.jpg");

  
  useEffect(() => {
    if (!lat || !lon) return;

    const getWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
        const result = await axios.get(url);
        setWeather(result.data);

        const currentWeather = result.data.weather[0]?.main;
        const matchedWeather = weatherType.find(
          (type) => type.name.toLowerCase() === currentWeather.toLowerCase()
        );

        if (matchedWeather) {
          setReportBackgroundImage(matchedWeather.image);
        } else {
          setReportBackgroundImage("/weather-bg.jpg");
        }
      } catch (err) {
        console.error("Error fetching weather data.");
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
    hour: "2-digit",
    minute: "2-digit",
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
            src={reportBackgroundImage}
            className="w-full h-full rounded-2xl shadow-lg object-cover"
            alt="Background"
          />
          <div>
            <div className="absolute inset-0 flex flex-col justify-between m-6 text-black text-lg font-sans">
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
                <div className="text-black font-bold flex-col align-bottom mb-3">
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
        </div>

        <div className="bg-[#222831] bg-opacity-50 w-96 h-[400px] rounded-lg -ml-2 z-10 flex justify-center flex-col shadow-lg">
          <div className="flex flex-row justify-between text-lg font-normal items-center mx-10 px-10 my-1 text-white">
            <div>FEELS LIKE</div>
            <div className="font-light">{weather?.main?.feels_like}°C</div>
          </div>
          <div className="flex flex-row justify-between text-lg font-normal items-center mx-10 px-10 my-1 text-white">
            <div>HUMIDITY</div>
            <div className="font-light">{weather?.main.humidity || "N/A"}%</div>
          </div>
          <div className="flex flex-row justify-between text-lg font-normal items-center mx-10 px-10 my-1 text-white">
            <div>WIND</div>
            <div className="font-light">
              {weather?.wind.speed || "N/A"} km/h
            </div>
          </div>
          <button
            onClick={handleChangeLocation}
            className="flex items-center justify-center mt-10 text-black bg-[#EECEB9] px-4 py-1 rounded-lg hover:bg-[#D4B29C] m-14 mb-4 font-semibold"
          >
            <CiLocationOn className="mr-2" />
            Change Location
          </button>
        </div>
      </div>
    </div>
  );
}
