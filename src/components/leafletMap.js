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
  const [mapStyle, setMapStyle] = useState(false);

  const isFullScreen = props.fullScreen ? "goFullScreen" : "map";

  return (
    <div className={isFullScreen}>
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
        <button
          style={
            mapStyle
              ? { backgroundImage: "url(/streetMap.png)" }
              : { backgroundImage: "url(/topoMap.png)" }
          }
          className={props.fullScreen ? "fullScreenChangeMap" : "changeMap"}
          onClick={() => setMapStyle(!mapStyle)}
        ></button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            mapStyle
              ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
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
