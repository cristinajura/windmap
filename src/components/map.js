import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

const Maps = (props) => {
  return (
    <div className="map">
      <MapContainer
        center={props.marker}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", zIndex: "10" }}
      >
        <ChangeView center={props.marker} zoom={13} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={props.marker}>
          <Popup>{props.popup}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
