import "./App.css";
import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/weatherForecast/currentWeather";
import Forecast from "./components/weatherForecast/forecast";
import Search from "./components/searchLocations/searchGeolocation";
import SearchParagliding from "./components/searchLocations/searchParagliding";
import SearchOutdoor from "./components/searchLocations/searchOutdoor";
import LeafletMap from "./components/leafletMaps/leafletMap";
import WindyMap from "./components/windyMap";
import { WEATHER_API_URL, WEATHER_API_KEY, WEATHER_GEO_API_URL } from "./api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AddLocationText } from "./components/addLocText";
import { Alert } from "@mui/material";
import { ImLocation2 } from "react-icons/im";
import { useCookies } from "react-cookie";

function App() {
  const [iniCurrentWeather, setIniCurrentWeather] = useState(null);
  const [iniForecast, setIniForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [marker, setMarker] = useState([45.368676, 22.88771]);
  const [popup, setPopup] = useState("Retezat National Park, RO");
  const [fullScreen, setFullScreen] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const [userLat, setUserLat] = useState(45.368676);
  const [userLon, setUserLon] = useState(22.88771);
  const [userLoc, setUserLoc] = useState("Retezat National Park, RO");
  const [cookies, setCookie] = useCookies();

  const handleOnClose = () => {
    setCookie("deviceLoc", "1", { maxAge: 3600 * 24 * 120 });
    setOnClose(true);
  };
  const closeAlert = onClose ? "hide" : "";

  const handleDeviceLocation = () => {
    setCookie("deviceLoc", "2", { maxAge: 3600 * 24 * 120 });
    setOnClose(true);
  };
  const isCookie = cookies.deviceLoc;

  useEffect(() => {
    isCookie === "2"
      ? navigator.geolocation.getCurrentPosition((position) => {
          setUserLat(position.coords.latitude);
          setUserLon(position.coords.longitude);
        })
      : setUserLat(userLat);
    setUserLon(userLon);
    setMarker([userLat, userLon]);
  }, [isCookie, userLat, userLon]);

  useEffect(() => {
    isCookie === "2"
      ? fetch(
          `${WEATHER_GEO_API_URL}/reverse?lat=${userLat}&lon=${userLon}&appid=${WEATHER_API_KEY}`
        )
          .then(async (response) => {
            const data = await response.json();
            setUserLoc(data[0].name + ", " + data[0].country);
            setPopup(userLoc);
          })
          .catch((err) => console.log(err))
      : setUserLoc("Retezat National Park, RO");
  }, [isCookie, userLat, userLon, userLoc]);

  useEffect(() => {
    fetch(
      `${WEATHER_API_URL}/weather?lat=${userLat}&lon=${userLon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then(async (response) => {
        const data = await response.json();
        setIniCurrentWeather({
          city: isCookie ? userLoc : "Retezat National Park, RO",
          ...data,
        });
      })
      .catch((err) => console.log(err));
  }, [userLat, userLon, isCookie, userLoc]);

  useEffect(() => {
    fetch(
      `${WEATHER_API_URL}/forecast?lat=${userLat}&lon=${userLon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then(async (response) => {
        const data = await response.json();
        setIniForecast({
          ...data,
        });
      })
      .catch((err) => console.log(err));
  }, [userLat, userLon]);

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
        setOnClose(true);
      })
      .catch((err) => console.log(err));
  };

  const onClick = () => {
    setFullScreen(!fullScreen);
  };
  const fullMap = fullScreen ? "hide" : "";

  let isTabletOrPhone = useMediaQuery("(max-width:1300px)");

  return (
    <div className={fullScreen ? "" : "container"}>
      <div className={fullMap}>
        <div className={closeAlert}>
          {isCookie === undefined ? (
            <Alert
              onClose={() => setOnClose(true)}
              icon={false}
              className="alert"
              style={{
                background: "#fff",
                boxShadow: "1px 1px 8px 1px lightgray",
              }}
            >
              <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ fontSize: "17px", marginLeft: "10px" }}>
                  windmap.store
                </div>
                <img
                  src="/windmap.png"
                  alt="logo"
                  style={{ width: "28px", marginLeft: "8px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    marginRight: "2px",
                    marginLeft: "10px",
                  }}
                >
                  wants to know your device location
                </div>
                <ImLocation2 />
              </div>
              <div
                style={{
                  display: "flex",
                  marginLeft: "15px",
                }}
              >
                <button className="alertBtn" onClick={handleDeviceLocation}>
                  Allow
                </button>
                <button className="alertBtn" onClick={handleOnClose}>
                  Block
                </button>
              </div>
            </Alert>
          ) : null}
        </div>

        <div className="appTitle">
          <div className="title">windmap</div>
          <img src="/windmap.png" alt="logo" style={{ width: "45px" }} />
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
        <CurrentWeather
          data={currentWeather === null ? iniCurrentWeather : currentWeather}
        />
        <Forecast data={forecast === null ? iniForecast : forecast} />
      </div>
      <div>
        <LeafletMap
          marker={marker}
          popup={popup}
          fullScreen={fullScreen}
          onClick={onClick}
        />
      </div>
      <div className={fullMap}>
        <AddLocationText />
        <WindyMap />
        <div className="bottom">@2023 windmap</div>
      </div>
    </div>
  );
}

export default App;
