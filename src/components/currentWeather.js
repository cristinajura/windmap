import "../App.css";
import SortDownIcon from "@rsuite/icons/SortDown";
import useMediaQuery from "@mui/material/useMediaQuery";

const CurrentWeather = ({ data }) => {
  const wind =
    data.wind.speed * 3.6 >= 10
      ? (data.wind.speed * 3.6).toPrecision(3)
      : (data.wind.speed * 3.6).toPrecision(2);

  const gust =
    data.wind.gust * 3.6 >= 10
      ? (data.wind.gust * 3.6).toPrecision(3)
      : (data.wind.gust * 3.6).toPrecision(2);

  let isTabletOrPhone = useMediaQuery("(max-width:1150px)");

  return (
    <div className="top">
      <img src="/paragliding.png" alt="paragliding flight" />
      <div className="weather">
        <div className="top-weather">
          <div style={{ marginTop: "5px", flex: "1 1", marginRight: "20px" }}>
            <p className="city">{data.city}</p>
            <p className="description-top">{data.weather[0].description}</p>
          </div>
          <div>
            <img
              className="weather-icon"
              src={`icons/${data.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "5px 10px",
          }}
        >
          <div>
            <div
              style={
                isTabletOrPhone
                  ? {
                      fontWeight: "600",
                      fontSize: "22px",
                    }
                  : {
                      fontWeight: "600",
                      fontSize: "24px",
                      textAlign: "left",
                      marginLeft: "10px",
                    }
              }
            >
              <SortDownIcon
                rotate={data.wind.deg}
                className="wind-icon"
                style={{ fontSize: "30px" }}
              />
              {data.wind.deg < 11
                ? "N"
                : data.wind.deg < 34
                ? "NNE"
                : data.wind.deg < 56
                ? "NE"
                : data.wind.deg < 79
                ? "ENE"
                : data.wind.deg < 101
                ? "E"
                : data.wind.deg < 124
                ? "ESE"
                : data.wind.deg < 146
                ? "SE"
                : data.wind.deg < 169
                ? "SSE"
                : data.wind.deg < 191
                ? "S"
                : data.wind.deg < 214
                ? "SSW"
                : data.wind.deg < 236
                ? "SW"
                : data.wind.deg < 259
                ? "WSW"
                : data.wind.deg < 281
                ? "W"
                : data.wind.deg < 304
                ? "WNW"
                : data.wind.deg < 326
                ? "NW"
                : data.wind.deg < 349
                ? "NNW"
                : "N"}
            </div>
            <div
              style={
                isTabletOrPhone
                  ? {
                      textAlign: "right",
                      marginTop: "-15px",
                    }
                  : {
                      textAlign: "left",
                      marginLeft: "55px",
                      marginTop: "-15px",
                    }
              }
            >
              {data.wind.deg}°
            </div>
          </div>
          <div className="bottom-weather">
            <div className="datas1">
              <div className="row">
                <span>Wind</span>
                <span>{wind} km/h</span>
              </div>
              <div className="row">
                <span>Gust</span>
                <span>{gust} km/h</span>
              </div>
              <div className="row">
                <span>Pressure</span>
                <span>{data.main.pressure} hPa</span>
              </div>
              <div className="row">
                <span>Clouds</span>
                <span>{data.clouds.all}%</span>
              </div>
            </div>
            <div className="datas2">
              <div className="row">
                <span>Temperature</span>
                <span>{Math.round(data.main.temp)}°C</span>
              </div>
              <div className="row">
                <span>Feels Like</span>
                <span>{Math.round(data.main.feels_like)}°C</span>
              </div>
              <div className="row">
                <span>Humidity</span>
                <span>{data.main.humidity}%</span>
              </div>
              <div className="row">
                <span>Visibility</span>
                <span>{data.visibility} m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
