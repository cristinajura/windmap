import "./App.css";
import { useState } from "react";
import CurrentWeather from "./components/currentWeather";
import Forecast from "./components/forecast";
import Search from "./components/search";
import SearchParagliding from "./components/searchParagliding";
import SearchOutdoor from "./components/searchOutdoor";
import LeafletMap from "./components/leafletMap";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [marker, setMarker] = useState([45.368172, 22.885233]);
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
      <div className="windyContainer">
        <div className="windymap" style={{ marginBottom: "20px" }}>
          <div style={{ float: "right" }}>
            Forecast model: <strong>ECMF</strong>
          </div>
          <iframe
            width="100%"
            height="100%"
            src="https://embed.windy.com/embed2.html?lat=45.368172&lon=22.885233&detailLat=45.049&detailLon=23.290&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"
            frameborder="0"
          ></iframe>
        </div>
        <div className="windymap">
          <div style={{ float: "right" }}>
            Forecast model: <strong>GFS</strong>
          </div>
          <iframe
            width="100%"
            height="100%"
            src="https://embed.windy.com/embed2.html?lat=45.049&lon=23.290&detailLat=45.049&detailLon=23.290&width=650&height=450&zoom=5&level=surface&overlay=wind&product=gfs&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
