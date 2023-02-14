import L from "leaflet";
import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { BiCurrentLocation } from "react-icons/bi";
import { ActionIcon } from "@mantine/core";
import { BsWhatsapp } from "react-icons/bs";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";

const ControlClasses = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const LeafletControl = ({ position, children }) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  });

  return (
    <div ref={divRef} className={position && ControlClasses[position]}>
      <div className={"leaflet-control"}>{children}</div>
    </div>
  );
};

const CurrentLocation = (props) => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng);
      setLoading(false);
      setPosition(e.latlng);
    },
  });

  let url = `https://api.whatsapp.com/send?text=GPS: ${position?.lat}, ${position?.lng}`;

  return (
    <div>
      <LeafletControl position={"topright"}>
        <ActionIcon
          onClick={() => {
            setLoading(true);
            map.locate();
          }}
          loading={loading}
          variant={"transparent"}
        >
          <div>
            <BiCurrentLocation className="gpsIcon" />
          </div>
        </ActionIcon>
        {position === null ? null : (
          <Marker position={position}>
            <Popup>
              GPS: {position?.lat}, {position?.lng}
              <br />
              Share current location: {"  "}
              <a href={url} target="blank" style={{ color: "rgb(2, 145, 2)" }}>
                <BsWhatsapp />
              </a>
            </Popup>
          </Marker>
        )}
      </LeafletControl>
      <LeafletControl position={"bottomright"}>
        <div onClick={props.onClick}>
          {props.fullScreen ? (
            <BiExitFullscreen className="fullScreenIcon" />
          ) : (
            <BiFullscreen className="fullScreenIcon" />
          )}
        </div>
      </LeafletControl>
    </div>
  );
};

export default CurrentLocation;
