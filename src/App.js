import "./App.css";
import CurrentWeather from "./components/currentWeather";
import Search from "./components/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

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

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setforecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log("currentWeather", currentWeather);
  console.log("forecast", forecast);

  return (
    <div className="container">
      <div className="search">
        <Search onSearchChange={handleSearchChange} />
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
