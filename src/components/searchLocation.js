import React from "react";
import "../App.css";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

const options = [
  {
    value: "45.472264 22.811300",
    label: "Clopotiva Take-off, HD",
  },
  {
    value: "45.495828 22.806300",
    label: "Clopotiva school-slope, HD",
  },
  {
    value: "45.380549 22.850112",
    label: "Retezat Peak, HD",
  },
  {
    value: "45.554008 22.973854",
    label: "Ciopeia - hill, HD",
  },
  {
    value: "45.626761 23.036450",
    label: "Gantaga - hill, HD",
  },
  {
    value: "45.734482 23.037333",
    label: "Calan - hill, HD",
  },
  {
    value: "45.859838 23.042844",
    label: "Magura Uroiului, HD",
  },
  {
    value: "45.388145 23.491146",
    label: "Parangul Mic, HD",
  },
  {
    value: "45.226978 23.684955",
    label: "Ranca Take-off, GJ",
  },
  {
    value: "45.174227 23.077664",
    label: "Plesa Peak, GJ",
  },
  {
    value: "45.244790 23.016945",
    label: "Arcanu Peak, GJ",
  },
  {
    value: "45.988007 23.593869",
    label: "Rapa Rosie, AB",
  },
];

const SearchLocation = ({ onSearchChange }) => {
  const [searchLocation, setSearchLocation] = React.useState(null);

  const handleChange = (selectSpot) => {
    setSearchLocation(selectSpot);
    onSearchChange(selectSpot);
  };

  const loadOptions = (options) => {
    return {
      options: options.map((loc) => {
        return {
          value: `${loc.latitude} ${loc.longitude}`,
          label: `${loc.name}`,
        };
      }),
    };
  };

  return (
    <Select
      placeholder={
        <div>
          <div className="palceholderIcon">
            <FaSearch />
          </div>
          <div className="placeholderText">Location search...</div>
        </div>
      }
      options={options}
      loadOptions={loadOptions}
      onChange={handleChange}
      value={"Location search..."}
    />
  );
};

export default SearchLocation;
