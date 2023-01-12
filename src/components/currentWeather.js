import "../App.css";
import SortDownIcon from "@rsuite/icons/SortDown";

const CurrentWeather = ({ data }) => {
  const wind =
    data?.wind?.speed * 3.6 >= 10
      ? (data?.wind?.speed * 3.6).toPrecision(3)
      : data?.wind?.speed * 3.6 < 1
      ? (data?.wind?.speed * 3.6).toPrecision(1)
      : (data?.wind?.speed * 3.6).toPrecision(2);

  const gust =
    data?.wind?.gust * 3.6 >= 10
      ? (data?.wind?.gust * 3.6).toPrecision(3)
      : data?.wind?.gust * 3.6 < 1
      ? (data?.wind?.gust * 3.6).toPrecision(1)
      : (data?.wind?.gust * 3.6).toPrecision(2);

  return (
    <div
      className="top"
      style={data ? { maxWidth: "1100px" } : { maxWidth: "600px" }}
    >
      <img src="/outdoor1.png" alt="paragliding flight" />
      <div className="weather">
        {data ? (
          <div>
            <div className="top-weather">
              <div
                style={{ marginTop: "5px", flex: "1 1", marginRight: "20px" }}
              >
                <p className="city">{data?.city}</p>
                <p className="description-top">
                  {data?.weather[0]?.description}
                </p>
              </div>
              <div>
                <img
                  className="weather-icon"
                  src={
                    data?.weather[0].description === "overcast clouds"
                      ? "icons/05.png"
                      : data?.weather[0].description === "snow"
                      ? "icons/14.png"
                      : data?.weather[0].description === "moderate rain"
                      ? "icons/06.png"
                      : `icons/${data?.weather[0].icon}.png`
                  }
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
              <div className="bottom-weather">
                <div className="datas1">
                  <div className="row">
                    <span>Wind direction</span>
                    <span>
                      <SortDownIcon
                        rotate={data?.wind?.deg}
                        className="wind-icon"
                      />
                      {data?.wind?.deg < 11
                        ? "N"
                        : data?.wind?.deg < 34
                        ? "NNE"
                        : data?.wind?.deg < 56
                        ? "NE"
                        : data?.wind?.deg < 79
                        ? "ENE"
                        : data?.wind?.deg < 101
                        ? "E"
                        : data?.wind?.deg < 124
                        ? "ESE"
                        : data?.wind?.deg < 146
                        ? "SE"
                        : data?.wind?.deg < 169
                        ? "SSE"
                        : data?.wind?.deg < 191
                        ? "S"
                        : data?.wind?.deg < 214
                        ? "SSW"
                        : data?.wind?.deg < 236
                        ? "SW"
                        : data?.wind?.deg < 259
                        ? "WSW"
                        : data?.wind?.deg < 281
                        ? "W"
                        : data?.wind?.deg < 304
                        ? "WNW"
                        : data?.wind?.deg < 326
                        ? "NW"
                        : data?.wind?.deg < 349
                        ? "NNW"
                        : "N"}
                    </span>
                  </div>
                  <div className="row">
                    <span>
                      Wind direction <small>(deg)</small>
                    </span>
                    <span>{data?.wind?.deg}°</span>
                  </div>
                  <div className="row">
                    <span>Wind speed</span>
                    <span>{wind} km/h</span>
                  </div>
                  <div className="row">
                    <span>Gust</span>
                    <span>{gust} km/h</span>
                  </div>
                  <div className="row">
                    <span>Pressure</span>
                    <span>{data?.main.pressure} hPa</span>
                  </div>
                </div>
                <div className="datas2">
                  <div className="row">
                    <span>Temperature</span>
                    <span>
                      {Math.floor(data?.main.temp)}
                      °C
                    </span>
                  </div>
                  <div className="row">
                    <span>Temperature felt</span>
                    <span>{Math.floor(data?.main.feels_like)}°C</span>
                  </div>
                  <div className="row">
                    <span>Clouds</span>
                    <span>{data?.clouds.all}%</span>
                  </div>
                  <div className="row">
                    <span>Relative humidity</span>
                    <span>{data?.main.humidity}%</span>
                  </div>
                  <div className="row">
                    <span>
                      Precipitation <small>(mm/1h)</small>
                    </span>
                    <span>
                      {data?.rain
                        ? data?.rain[`1h`]
                        : data?.snow
                        ? data?.snow[`1h`]
                        : "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
