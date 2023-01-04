import "./App.css";
import { useState } from "react";
import CurrentWeather from "./components/currentWeather";
import Search from "./components/search";
import Forecast from "./components/forecast";
import SearchLocation from "./components/searchLocation";
import Maps from "./components/map";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [marker, setMarker] = useState([45.472264, 22.8113]);
  const [popup, setPopup] = useState("Clopotiva Take-off, HD");

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
        setMarker([Number(lat), Number(lon)]);
        setPopup(searchData.label);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="locations">
        <div className="search" style={{ zIndex: "30" }}>
          <SearchLocation onSearchChange={handleSearchChange} />
        </div>
        <div className="sau">or</div>
        <div className="search">
          <Search onSearchChange={handleSearchChange} />
        </div>
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <Maps marker={marker} popup={popup} />
    </div>
  );
}

export default App;
