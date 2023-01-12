import React from "react";
import "../App.css";

const WindyMap = () => {
  const [forecastModel, setForecastModel] = React.useState("ecmwf");

  return (
    <div className="windymap" style={{ marginBottom: "20px" }}>
      <div className="windyFonts">
        Forecast model:
        <button
          className="windyBtn"
          onClick={() => setForecastModel("ecmwf")}
          style={
            forecastModel === "ecmwf"
              ? { background: "rgb(228, 195, 134)" }
              : { background: "rgb(237, 237, 237)" }
          }
        >
          ECMWF
        </button>
        <button
          className="windyBtn"
          onClick={() => setForecastModel("gfs")}
          style={
            forecastModel === "gfs"
              ? { background: "rgb(228, 195, 134)" }
              : { background: "rgb(237, 237, 237)" }
          }
        >
          GFS
        </button>
        <button
          className="windyBtn"
          onClick={() => setForecastModel("iconEu")}
          style={
            forecastModel === "iconEu"
              ? { background: "rgb(228, 195, 134)" }
              : { background: "rgb(237, 237, 237)" }
          }
        >
          ICON-EU
        </button>
        <button
          className="windyBtn"
          onClick={() => setForecastModel("icon")}
          style={
            forecastModel === "icon"
              ? { background: "rgb(228, 195, 134)" }
              : { background: "rgb(237, 237, 237)" }
          }
        >
          ICON
        </button>
        <button
          className="windyBtn"
          onClick={() => setForecastModel("nems")}
          style={
            forecastModel === "nems"
              ? { background: "rgb(228, 195, 134)" }
              : { background: "rgb(237, 237, 237)" }
          }
        >
          NEMS
        </button>
      </div>
      <iframe
        width="100%"
        height="100%"
        title="windymap"
        src={`https://embed.windy.com/embed2.html?lat=45.368172&lon=22.885233&detailLat=45.049&detailLon=23.290&width=650&height=450&zoom=5&level=surface&overlay=wind&product=${forecastModel}&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
      ></iframe>
    </div>
  );
};

export default WindyMap;
