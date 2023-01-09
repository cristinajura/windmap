import React from "react";
import {
  MapContainer,
  Marker,
  Tooltip,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BiCurrentLocation } from "react-icons/bi";

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

const LocationMarker = (props) => {
  const [position, setPosition] = React.useState(null);

  const btn = useMapEvents({
    click() {
      btn.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      btn.flyTo(e.latlng, btn.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Tooltip>
        GPS: {props.marker[0]}, {props.marker[1]}
      </Tooltip>
    </Marker>
  );
};

const LeafletMap = (props) => {
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
          <Tooltip>{props.popup}</Tooltip>
        </Marker>
        <button className="detectLocation">
          <BiCurrentLocation className="gpsIcon" />
          <LocationMarker marker={props.marker} />
        </button>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
