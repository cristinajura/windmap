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

  return (
    <div className="map">
      <MapContainer
        center={props.marker}
        zoom={12}
        minZoom={2}
        maxZoom={18}
        scrollWheelZoom={false}
        style={{ height: "100%", zIndex: "10" }}
      >
        <ChangeView center={props.marker} zoom={12} />
        <Marker position={props.marker}>
          <Tooltip>{props.popup}</Tooltip>
        </Marker>
        <button
          style={
            mapStyle
              ? { backgroundImage: "url(/topoMap.jpg)" }
              : { backgroundImage: "url(/streetMap.jpg)" }
          }
          className="changeMap"
          onClick={() => setMapStyle(!mapStyle)}
        ></button>
        <TileLayer
          url={
            mapStyle
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          }
        />
        <CurrentLocation marker={props.marker} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
