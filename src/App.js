import "./App.css";
import { useState } from "react";
import CurrentWeather from "./components/currentWeather";
import Forecast from "./components/forecast";
import Search from "./components/search";
import SearchParagliding from "./components/searchParagliding";
import SearchOutdoor from "./components/searchOutdoor";
import LeafletMap from "./components/leafletMap";
import WindyMap from "./components/windyMap";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [marker, setMarker] = useState([45.368676, 22.88771]);
  const [popup, setPopup] = useState("Retezat National Park, RO");

  let isTabletOrPhone = useMediaQuery("(max-width:1300px)");

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
      <div className="appTitle">
        <div className="title">windmap</div>
        <img src="/windy.png" alt="logo" style={{ width: "45px" }} />
      </div>
      <div className="locations">
        <div className="search" style={{ zIndex: "40" }}>
          <SearchParagliding onSearchChange={handleSearchChange} />
        </div>
        <div className="sau">or</div>
        <div className="search" style={{ zIndex: "30" }}>
          <SearchOutdoor onSearchChange={handleSearchChange} />
        </div>
        {isTabletOrPhone ? <div className="sau">or</div> : null}
      </div>
      <div className="search">
        <Search onSearchChange={handleSearchChange} />
      </div>
      <CurrentWeather data={currentWeather} />
      {forecast && <Forecast data={forecast} />}
      <LeafletMap marker={marker} popup={popup} />
      <WindyMap />
    </div>
  );
}

export default App;
