import "./App.css";
import { useState } from "react";
import CurrentWeather from "./components/currentWeather";
import Search from "./components/search";
import Forecast from "./components/forecast";
import SearchLocation from "./components/searchLocation";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({
          city: searchData.label,
          ...weatherResponse,
        });
        setForecast({
          city: searchData.label,
          ...forecastResponse,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleLocationChange = (options) => {
    const [lat, lon] = options.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({
          city: options.label,
          ...weatherResponse,
        });
        setForecast({
          city: options.label,
          ...forecastResponse,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="locations">
        <div className="search">
          <SearchLocation onSearchChange={handleLocationChange} />
        </div>
        <div className="sau">or</div>
        <div className="search">
          <Search onSearchChange={handleSearchChange} />
        </div>
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
