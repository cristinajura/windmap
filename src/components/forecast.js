import React from "react";
import "../App.css";
import SortDownIcon from "@rsuite/icons/SortDown";
import useMediaQuery from "@mui/material/useMediaQuery";

const WEEK_DAY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HOURS = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
];

const Forecast = ({ data }) => {
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);

  const showOrHide = show ? "show" : "hide";
  const showOrHide1 = show1 ? "show1" : "hide";
  const showOrHide2 = show2 ? "show2" : "hide";
  const showOrHide3 = show3 ? "show3" : "hide";

  let isTabletOrPhone = useMediaQuery("(max-width:1150px)");

  const dayInWeek = new Date().getDay();
  const today = dayInWeek - 1;
  const forecastDays = WEEK_DAY.slice(today, WEEK_DAY.length).concat(
    WEEK_DAY.slice(0, today)
  );

  const hourInDay = new Date().getHours();
  const nextHour =
    hourInDay < 3
      ? HOURS.slice(1)
      : hourInDay < 6
      ? HOURS.slice(2)
      : hourInDay < 9
      ? HOURS.slice(3)
      : hourInDay < 12
      ? HOURS.slice(4)
      : hourInDay < 15
      ? HOURS.slice(5)
      : hourInDay < 18
      ? HOURS.slice(6)
      : hourInDay < 21
      ? HOURS.slice(7)
      : HOURS.slice(0);
  const nextHourLength = nextHour.length;

  return (
    <div>
      <div className="day-container">
        <div className="forecast" onClick={() => setShow(!show)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="day">
              {nextHour[0] !== "00:00" ? "Today" : "Tomorrow"}
            </div>
            {!isTabletOrPhone ? (
              <div className={showOrHide}>
                <TextDetails />
              </div>
            ) : (
              <></>
            )}
          </div>
          {data.list.slice(0, nextHourLength).map((item, idx) => (
            <div key={idx}>
              <div className="details">
                <div className="line"></div>
                <div className="hours">{nextHour[idx]}</div>
                <div className="icon-align">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    alt="icon"
                    className="icon-small"
                  />
                  <div className="description">
                    {item.weather[0].description}
                  </div>
                </div>
                <div className="wind-box">
                  <div
                    style={{
                      textAlign: "right",
                      fontWeight: "600",
                      fontSize: "17px",
                      marginTop: "-15px",
                    }}
                  >
                    <SortDownIcon
                      rotate={item.wind.deg}
                      className="wind-icon"
                    />
                    {item.wind.deg < 11
                      ? "N"
                      : item.wind.deg < 34
                      ? "NNE"
                      : item.wind.deg < 56
                      ? "NE"
                      : item.wind.deg < 79
                      ? "ENE"
                      : item.wind.deg < 101
                      ? "E"
                      : item.wind.deg < 124
                      ? "ESE"
                      : item.wind.deg < 146
                      ? "SE"
                      : item.wind.deg < 169
                      ? "SSE"
                      : item.wind.deg < 191
                      ? "S"
                      : item.wind.deg < 214
                      ? "SSW"
                      : item.wind.deg < 236
                      ? "SW"
                      : item.wind.deg < 259
                      ? "WSW"
                      : item.wind.deg < 281
                      ? "W"
                      : item.wind.deg < 304
                      ? "WNW"
                      : item.wind.deg < 326
                      ? "NW"
                      : item.wind.deg < 349
                      ? "NNW"
                      : "N"}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      marginTop: "-15px",
                      fontSize: "13px",
                    }}
                  >
                    {item.wind.deg}°
                  </div>
                  <div className="min-max">
                    <div>
                      {item.wind.speed * 3.6 >= 10
                        ? (item.wind.speed * 3.6).toPrecision(3)
                        : (item.wind.speed * 3.6).toPrecision(2)}
                    </div>
                    <div>
                      -{" "}
                      {item.wind.gust * 3.6 >= 10
                        ? (item.wind.gust * 3.6).toPrecision(3)
                        : (item.wind.gust * 3.6).toPrecision(2)}{" "}
                      km/h
                    </div>
                  </div>
                </div>
              </div>

              <div className={showOrHide}>
                <div className="forecast-bottom">
                  {isTabletOrPhone ? <TextDetails /> : <></>}

                  <div className="spacing" style={{ textAlign: "right" }}>
                    <div className="min-max">
                      <div>{Math.round(item.main.temp_max)}</div>
                      <div>- {Math.round(item.main.temp_min)}°C</div>
                    </div>
                    <div>{Math.round(item.main.feels_like)}°C</div>
                    <div>{item.main.pressure} hPa</div>
                    <div>{item.main.grnd_level} hPa</div>
                    <div>{item.main.humidity}%</div>
                    <div>{item.visibility} m</div>
                    <div>{item.clouds.all}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="day-container">
        <div className="forecast" onClick={() => setShow1(!show1)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="day">
              {nextHour[0] !== "00:00" ? "Tomorrow" : forecastDays[2]}
            </div>
            {!isTabletOrPhone ? (
              <div className={showOrHide1}>
                <TextDetails />
              </div>
            ) : (
              <></>
            )}
          </div>
          {data.list
            .slice(nextHourLength, nextHourLength + 8)
            .map((item, idx) => (
              <div key={idx}>
                <div className="details">
                  <div className="line"></div>
                  <div className="hours">{HOURS[idx]}</div>
                  <div className="icon-align">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="icon"
                      className="icon-small"
                    />
                    <div className="description">
                      {item.weather[0].description}
                    </div>
                  </div>
                  <div className="wind-box">
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "600",
                        fontSize: "17px",
                        marginTop: "-15px",
                      }}
                    >
                      <SortDownIcon
                        rotate={item.wind.deg}
                        className="wind-icon"
                      />
                      {item.wind.deg < 11
                        ? "N"
                        : item.wind.deg < 34
                        ? "NNE"
                        : item.wind.deg < 56
                        ? "NE"
                        : item.wind.deg < 79
                        ? "ENE"
                        : item.wind.deg < 101
                        ? "E"
                        : item.wind.deg < 124
                        ? "ESE"
                        : item.wind.deg < 146
                        ? "SE"
                        : item.wind.deg < 169
                        ? "SSE"
                        : item.wind.deg < 191
                        ? "S"
                        : item.wind.deg < 214
                        ? "SSW"
                        : item.wind.deg < 236
                        ? "SW"
                        : item.wind.deg < 259
                        ? "WSW"
                        : item.wind.deg < 281
                        ? "W"
                        : item.wind.deg < 304
                        ? "WNW"
                        : item.wind.deg < 326
                        ? "NW"
                        : item.wind.deg < 349
                        ? "NNW"
                        : "N"}
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        marginTop: "-15px",
                        fontSize: "13px",
                      }}
                    >
                      {item.wind.deg}°
                    </div>
                    <div className="min-max">
                      <div>
                        {item.wind.speed * 3.6 >= 10
                          ? (item.wind.speed * 3.6).toPrecision(3)
                          : (item.wind.speed * 3.6).toPrecision(2)}
                      </div>
                      <div>
                        -{" "}
                        {item.wind.gust * 3.6 >= 10
                          ? (item.wind.gust * 3.6).toPrecision(3)
                          : (item.wind.gust * 3.6).toPrecision(2)}{" "}
                        km/h
                      </div>
                    </div>
                  </div>
                </div>

                <div className={showOrHide1}>
                  <div className="forecast-bottom">
                    {isTabletOrPhone ? <TextDetails /> : <></>}

                    <div className="spacing" style={{ textAlign: "right" }}>
                      <div className="min-max">
                        <div>{Math.round(item.main.temp_max)}</div>
                        <div>- {Math.round(item.main.temp_min)}°C</div>
                      </div>
                      <div>{Math.round(item.main.feels_like)}°C</div>
                      <div>{item.main.pressure} hPa</div>
                      <div>{item.main.grnd_level} hPa</div>
                      <div>{item.main.humidity}%</div>
                      <div>{item.visibility} m</div>
                      <div>{item.clouds.all}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="day-container">
        <div className="forecast" onClick={() => setShow2(!show2)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="day">{forecastDays[2]}</div>
            {!isTabletOrPhone ? (
              <div className={showOrHide2}>
                <TextDetails />
              </div>
            ) : (
              <></>
            )}
          </div>
          {data.list
            .slice(nextHourLength + 8, nextHourLength + 16)
            .map((item, idx) => (
              <div key={idx}>
                <div className="details">
                  <div className="line"></div>
                  <div className="hours">{HOURS[idx]}</div>
                  <div className="icon-align">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="icon"
                      className="icon-small"
                    />
                    <div className="description">
                      {item.weather[0].description}
                    </div>
                  </div>
                  <div className="wind-box">
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "600",
                        fontSize: "17px",
                        marginTop: "-15px",
                      }}
                    >
                      <SortDownIcon
                        rotate={item.wind.deg}
                        className="wind-icon"
                      />
                      {item.wind.deg < 11
                        ? "N"
                        : item.wind.deg < 34
                        ? "NNE"
                        : item.wind.deg < 56
                        ? "NE"
                        : item.wind.deg < 79
                        ? "ENE"
                        : item.wind.deg < 101
                        ? "E"
                        : item.wind.deg < 124
                        ? "ESE"
                        : item.wind.deg < 146
                        ? "SE"
                        : item.wind.deg < 169
                        ? "SSE"
                        : item.wind.deg < 191
                        ? "S"
                        : item.wind.deg < 214
                        ? "SSW"
                        : item.wind.deg < 236
                        ? "SW"
                        : item.wind.deg < 259
                        ? "WSW"
                        : item.wind.deg < 281
                        ? "W"
                        : item.wind.deg < 304
                        ? "WNW"
                        : item.wind.deg < 326
                        ? "NW"
                        : item.wind.deg < 349
                        ? "NNW"
                        : "N"}
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        marginTop: "-15px",
                        fontSize: "13px",
                      }}
                    >
                      {item.wind.deg}°
                    </div>
                    <div className="min-max">
                      <div>
                        {item.wind.speed * 3.6 >= 10
                          ? (item.wind.speed * 3.6).toPrecision(3)
                          : (item.wind.speed * 3.6).toPrecision(2)}
                      </div>
                      <div>
                        -{" "}
                        {item.wind.gust * 3.6 >= 10
                          ? (item.wind.gust * 3.6).toPrecision(3)
                          : (item.wind.gust * 3.6).toPrecision(2)}{" "}
                        km/h
                      </div>
                    </div>
                  </div>
                </div>

                <div className={showOrHide2}>
                  <div className="forecast-bottom">
                    {isTabletOrPhone ? <TextDetails /> : <></>}

                    <div className="spacing" style={{ textAlign: "right" }}>
                      <div className="min-max">
                        <div>{Math.round(item.main.temp_max)}</div>
                        <div>- {Math.round(item.main.temp_min)}°C</div>
                      </div>
                      <div>{Math.round(item.main.feels_like)}°C</div>
                      <div>{item.main.pressure} hPa</div>
                      <div>{item.main.grnd_level} hPa</div>
                      <div>{item.main.humidity}%</div>
                      <div>{item.visibility} m</div>
                      <div>{item.clouds.all}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="day-container">
        <div className="forecast" onClick={() => setShow3(!show3)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="day">{forecastDays[3]}</div>
            {!isTabletOrPhone ? (
              <div className={showOrHide3}>
                <TextDetails />
              </div>
            ) : (
              <></>
            )}
          </div>
          {data.list
            .slice(nextHourLength + 16, nextHourLength + 24)
            .map((item, idx) => (
              <div key={idx}>
                <div className="details">
                  <div className="line"></div>
                  <div className="hours">{HOURS[idx]}</div>
                  <div className="icon-align">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="icon"
                      className="icon-small"
                    />
                    <div className="description">
                      {item.weather[0].description}
                    </div>
                  </div>
                  <div className="wind-box">
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "600",
                        fontSize: "17px",
                        marginTop: "-15px",
                      }}
                    >
                      <SortDownIcon
                        rotate={item.wind.deg}
                        className="wind-icon"
                      />
                      {item.wind.deg < 11
                        ? "N"
                        : item.wind.deg < 34
                        ? "NNE"
                        : item.wind.deg < 56
                        ? "NE"
                        : item.wind.deg < 79
                        ? "ENE"
                        : item.wind.deg < 101
                        ? "E"
                        : item.wind.deg < 124
                        ? "ESE"
                        : item.wind.deg < 146
                        ? "SE"
                        : item.wind.deg < 169
                        ? "SSE"
                        : item.wind.deg < 191
                        ? "S"
                        : item.wind.deg < 214
                        ? "SSW"
                        : item.wind.deg < 236
                        ? "SW"
                        : item.wind.deg < 259
                        ? "WSW"
                        : item.wind.deg < 281
                        ? "W"
                        : item.wind.deg < 304
                        ? "WNW"
                        : item.wind.deg < 326
                        ? "NW"
                        : item.wind.deg < 349
                        ? "NNW"
                        : "N"}
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        marginTop: "-15px",
                        fontSize: "13px",
                      }}
                    >
                      {item.wind.deg}°
                    </div>
                    <div className="min-max">
                      <div>
                        {item.wind.speed * 3.6 >= 10
                          ? (item.wind.speed * 3.6).toPrecision(3)
                          : (item.wind.speed * 3.6).toPrecision(2)}
                      </div>
                      <div>
                        -{" "}
                        {item.wind.gust * 3.6 >= 10
                          ? (item.wind.gust * 3.6).toPrecision(3)
                          : (item.wind.gust * 3.6).toPrecision(2)}{" "}
                        km/h
                      </div>
                    </div>
                  </div>
                </div>

                <div className={showOrHide3}>
                  <div className="forecast-bottom">
                    {isTabletOrPhone ? <TextDetails /> : <></>}

                    <div className="spacing" style={{ textAlign: "right" }}>
                      <div className="min-max">
                        <div>{Math.round(item.main.temp_max)}</div>
                        <div>- {Math.round(item.main.temp_min)}°C</div>
                      </div>
                      <div>{Math.round(item.main.feels_like)}°C</div>
                      <div>{item.main.pressure} hPa</div>
                      <div>{item.main.grnd_level} hPa</div>
                      <div x>{item.main.humidity}%</div>
                      <div>{item.visibility} m</div>
                      <div>{item.clouds.all}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const TextDetails = () => {
  let isTabletOrPhone = useMediaQuery("(max-width:1150px)");

  return (
    <div>
      <div>Temperature</div>
      {isTabletOrPhone ? (
        <div>
          Temperature <small>(feels - like)</small>
        </div>
      ) : (
        <div>
          <div>Feels Like</div>
        </div>
      )}
      <div>
        Pressure <small>(sea leve)</small>
      </div>
      <div>
        Pressure <small>(ground level)</small>
      </div>
      <div>Humidity</div>
      <div>Visibility</div>
      <div>Clouds</div>
    </div>
  );
};

export default Forecast;
