import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const API = "42feaff7e7f178aec2c9ec08ddc1de79";
  const [inputSearch, setInputSearch] = useState("");
  const [locationResult, setLocationResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [debouncedSearch, setDeboucedSearch] = useState(inputSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboucedSearch(inputSearch);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch]);

  useEffect(() => {
    if (!inputSearch) {
      return;
    }
    getYourLocation(inputSearch);
  }, [inputSearch]);
  const getYourLocation = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=5&appid=${API}`;
      const result = await axios.get(url);

      setLocationResult(result.data.slice(0, 5));
    } catch (err) {
      setError("Error fetching location data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debouncedSearch.length>2) {
      getYourLocation(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleLocationClick = (location: any) => {
    const { lat, lon, name, state, country } = location;
    const locationName = `${name} - ${state} - ${country}`;
    router.push({
      pathname: "/weather",
      query: { lat, lon, name: locationName },
    });
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: 'url("/weather-bg.jpg")' }}
      ></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white p-4 font-sans">
          <div className="mb-8 font-bold text-2xl text-black">
            Weather Report
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Location Search"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              className="py-2 px-5 text-gray-700 rounded-md text-lg w-96 font-medium"
            />
            {/* <button
              onClick={() => {}}
              disabled={loading}
              className="p-2 ml-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg font-semibold"
            >
              {loading ? "Searching..." : "Search"}
            </button> */}
          </div>
          {error && <div className="text-red-400 font-medium">{error}</div>}
          <div className="flex flex-col space-y-2">
            {locationResult.map((location) => (
              <button
                key={`${location.lat}-${location.lon}`}
                onClick={() => handleLocationClick(location)}
                className="p-2 bg-gray-400 hover:bg-gray-300 text-lg rounded-md font-medium text-black opacity-50"
              >
                {location.name} - {location.state} - {location.country}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
