import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CurrentLocation from "./currentLocation";
import { BsWhatsapp } from "react-icons/bs";

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

  let url = `https://api.whatsapp.com/send?text=${props.popup}, GPS: ${props.marker[0]}, ${props.marker[1]}`;

  return (
    <div className={isFullScreen}>
      <div style={{ marginLeft: "5px", color: "#555" }}>
        <strong>Switch Map:</strong>
        <button
          className="changeMap"
          style={
            mapStyle === cyclOsm
              ? {
                  backgroundImage: "url(/cyclo.png)",
                  boxShadow: "2px 2px #666",
                }
              : { backgroundImage: "url(/cyclo.png)" }
          }
          onClick={() => setMapStyle(cyclOsm)}
        ></button>
        <button
          className="changeMap"
          style={
            mapStyle === streetMap
              ? {
                  backgroundImage: "url(/streetMap.png)",
                  boxShadow: "2px 2px #666",
                }
              : { backgroundImage: "url(/streetMap.png)" }
          }
          onClick={() => setMapStyle(streetMap)}
        ></button>
        <button
          className="changeMap"
          style={
            mapStyle === mtbMap
              ? {
                  backgroundImage: "url(/mtb.png)",
                  boxShadow: "2px 2px #666",
                }
              : { backgroundImage: "url(/mtb.png)" }
          }
          onClick={() => setMapStyle(mtbMap)}
        ></button>
        <button
          className="changeMap"
          style={
            mapStyle === topoMap
              ? {
                  backgroundImage: "url(/topoMap.png)",
                  boxShadow: "2px 2px #666",
                }
              : { backgroundImage: "url(/topoMap.png)" }
          }
          onClick={() => setMapStyle(topoMap)}
        ></button>
      </div>
      <MapContainer
        center={props.marker}
        zoom={14}
        minZoom={2}
        maxZoom={18}
        scrollWheelZoom={false}
        style={{ height: "100%", zIndex: "10" }}
      >
        <ChangeView center={props.marker} zoom={14} />
        <Marker position={props.marker}>
          <Popup>
            GPS: {props.marker[0]}, {props.marker[1]}
            <br />
            {props.popup}
            <br />
            Share location: {"  "}
            <a href={url} target="blank" style={{ color: "rgb(2, 145, 2)" }}>
              <BsWhatsapp />
            </a>
          </Popup>
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
          fullScreen={props.fullScreen}
          onClick={props.onClick}
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
