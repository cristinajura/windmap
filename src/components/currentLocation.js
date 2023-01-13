import L from "leaflet";
import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { BiCurrentLocation } from "react-icons/bi";
import { ActionIcon } from "@mantine/core";

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

  return (
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
            GPS: {props.marker[0]}, {props.marker[1]}
          </Popup>
        </Marker>
      )}
    </LeafletControl>
  );
};

export default CurrentLocation;
