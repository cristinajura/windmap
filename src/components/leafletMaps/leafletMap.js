import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CurrentLocation from "./currentLocation";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const LeafletMap = (props) => {
  const [mapStyle, setMapStyle] = useState(
    "{s}.tile-cyclosm.openstreetmap.fr/cyclosm"
  );

  const mtbMap = "tile.mtbmap.cz/mtbmap_tiles";
  const streetMap = "{s}.tile.openstreetmap.org";
  const cyclOsm = "{s}.tile-cyclosm.openstreetmap.fr/cyclosm";
  const topoMap = "{s}.tile.opentopomap.org";

  const isFullScreen = props.fullScreen ? "goFullScreen" : "map";

  return (
    <div className={isFullScreen}>
      <div style={{ marginLeft: "5px" }}>
        Switch Map:
        <button
          className={props.fullScreen ? "" : "changeMap"}
          style={
            mapStyle === cyclOsm
              ? {
                  backgroundImage: "url(/cyclo.png)",
                  boxShadow: "3px -2px darkblue",
                }
              : { backgroundImage: "url(/cyclo.png)" }
          }
          onClick={() => setMapStyle(cyclOsm)}
        ></button>
        <button
          className={props.fullScreen ? "" : "changeMap"}
          style={
            mapStyle === streetMap
              ? {
                  backgroundImage: "url(/streetMap.png)",
                  boxShadow: "3px -2px darkblue",
                }
              : { backgroundImage: "url(/streetMap.png)" }
          }
          onClick={() => setMapStyle(streetMap)}
        ></button>
        <button
          className={props.fullScreen ? "" : "changeMap"}
          style={
            mapStyle === mtbMap
              ? {
                  backgroundImage: "url(/mtb.png)",
                  boxShadow: "3px -2px darkblue",
                }
              : { backgroundImage: "url(/mtb.png)" }
          }
          onClick={() => setMapStyle(mtbMap)}
        ></button>
        <button
          className={props.fullScreen ? "" : "changeMap"}
          style={
            mapStyle === topoMap
              ? {
                  backgroundImage: "url(/topoMap.png)",
                  boxShadow: "3px -2px darkblue",
                }
              : { backgroundImage: "url(/topoMap.png)" }
          }
          onClick={() => setMapStyle(topoMap)}
        ></button>
      </div>
      <MapContainer
        center={props.marker}
        zoom={13}
        minZoom={2}
        maxZoom={18}
        scrollWheelZoom={true}
        style={{ height: "100%", zIndex: "10" }}
      >
        <ChangeView center={props.marker} zoom={13} />
        <Marker position={props.marker}>
          <Tooltip>{props.popup}</Tooltip>
        </Marker>
        <TileLayer
          attribution={
            mapStyle === mtbMap
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
              : mapStyle === streetMap
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              : mapStyle === cyclOsm
              ? '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              : 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          }
          url={`https://${mapStyle}/{z}/{x}/{y}.png`}
        />
        <CurrentLocation
          marker={props.marker}
          fullScreen={props.fullScreen}
          onClick={props.onClick}
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
