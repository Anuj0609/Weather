import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type LocationData = {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export default function Home() {
  const API = "42feaff7e7f178aec2c9ec08ddc1de79";
  const [inputSearch, setInputSearch] = useState("");
  const [locationResult, setLocationResult] = useState<LocationData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (inputSearch.length < 3) {
      setLocationResult([]);
      return;
    }

    const timer = setTimeout(() => {
      getYourLocation(inputSearch);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch]);

  const getYourLocation = async (inputSearch: string) => {
    setError(null);
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=5&appid=${API}`;
      const result = await axios.get(url);

      setLocationResult(result.data);
    } catch (err) {
      setError("Error fetching location data.");
    }
  };

  const handleLocationClick = (location: LocationData) => {
    const { lat, lon, name, state, country } = location;
    const locationName = `${name} - ${state} - ${country}`;
    router.push({
      pathname: "/weather",
      query: { lat, lon, name: locationName },
    });
  };

  return (
    <div className="text-center text-white p-4 font-sans w-full">
      <h1 className="mb-2 md:mb-8 font-semibold text-4xl text-white">
        Weathercaster!
      </h1>

      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Location Search"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="py-2 px-5 text-gray-600 rounded-md text-lg max-w-96 w-full font-medium"
        />
      </div>
      {error && <div className="text-red-400 font-medium">{error}</div>}
      <div className="flex flex-col space-y-2">
        {locationResult.map((location) => (
          <button
            key={`${location.lat}-${location.lon}`}
            onClick={() => handleLocationClick(location)}
            className="p-2 bg-gray-400 hover:bg-gray-300 text-lg rounded-md font-medium text-black opacity-70"
          >
            {location.name} - {location.state} - {location.country}
          </button>
        ))}
      </div>
    </div>
  );
}
